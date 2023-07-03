import { useContext, useEffect, useState } from "react";
import Dropdown from "../components/dropdown";
import { FantasyFootballContext } from "../components/FantasyFootballContext";
import Layout from "../components/Layout";
import ScheduleChangeTable from "../components/ScheduleChangeTable";
import ScheduleTable from "../components/ScheduleTable";
import { IBoxScore, Matchup } from "../helpers/matchup";
import { Team } from "../helpers/team";

export default function ScheduleChangePage() {
    const [week, setWeek] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeTeam, setActiveTeam] = useState<Team>();
    const [teamSchedule, setTeamSchedule] = useState<Team>();
    const [teamMatchups, setTeamMatchups] = useState<Matchup[]>([]);
    const [newWins, setNewWins] = useState(0);
    const [newLosses, setNewLosses] = useState(0);
    const [pointsAgainst, setPointsAgainst] = useState(0);

    const { headers, config, teamCache, setTeamCache, matchupCache, setMatchupCache, initCache } =
        useContext(FantasyFootballContext);

    useEffect(() => {
        function processMatchup(newMatchup: Matchup) {
            if (newMatchup.playoffTierType === "NONE") {
                if (newMatchup.home.totalPoints >= newMatchup.away.totalPoints) {
                    setNewWins((previousWins) => previousWins + 1);
                } else {
                    setNewLosses((previousLosses) => previousLosses + 1);
                }
                const newPointsAgainst = newMatchup.away.totalPoints;
                setPointsAgainst((prevPointsAgainst) => prevPointsAgainst + newPointsAgainst);
            }
        }

        //Run initial load for matchups and teams
        const maxWeek = 17;
        for (var week = 0; week <= maxWeek; week++) {
            setLoading(true);
            initCache(week).then((doneLoading) => {
                setLoading(!doneLoading);
            });
        }

        const teamMatchupsTemp: Matchup[] = [];
        setNewLosses(0);
        setNewWins(0);
        setPointsAgainst(0);
        if (matchupCache) {
            const maxWeek = Math.max(...Object.keys(matchupCache!).map(Number));
            for (var matchupWeek = 1; matchupWeek <= maxWeek; matchupWeek++) {
                setLoading(true);
                //Load each subsequent weeks teams
                initCache(matchupWeek).then((doneLoading) => {
                    setLoading(!doneLoading);
                });
                const newMatchup = {
                    away: {},
                    home: {},
                    id: 1,
                    matchupPeriodId: matchupWeek,
                    playoffTierType: "",
                    winner: "",
                };
                matchupCache[matchupWeek]?.map((matchup) => {
                    newMatchup.id = matchup.id;
                    newMatchup.playoffTierType = matchup.playoffTierType;
                    if (matchup.away.teamId === activeTeam?.id) {
                        newMatchup.home = matchup.away;
                    } else if (matchup.home.teamId === activeTeam?.id) {
                        newMatchup.home = matchup.home;
                    }

                    if (matchup.away.teamId === teamSchedule?.id) {
                        newMatchup.away = matchup.home;
                    } else if (matchup.home.teamId === teamSchedule?.id) {
                        newMatchup.away = matchup.away;
                    }
                });
                processMatchup(newMatchup as Matchup);
                teamMatchupsTemp.push(newMatchup as Matchup);
            }
        }
        setTeamMatchups(teamMatchupsTemp);
    }, [loading, activeTeam, teamSchedule]);

    return (
        <>
            <h1 className="ml-5 mt-5 font-bold text-4xl text-center">WhatIFF: Schedule Change</h1>
            <Layout>
                <div className="flex">
                    <Dropdown
                        list={teamCache ? teamCache[week]?.map((team) => team.abbrev) : []}
                        title={"Active Team"}
                        activeVar={activeTeam?.abbrev}
                        setVar={(abbrev: string) =>
                            teamCache
                                ? setActiveTeam(
                                      teamCache[week]?.find((team) => team.abbrev === abbrev)
                                  )
                                : setActiveTeam(undefined)
                        }
                    ></Dropdown>
                    <p className="mt-5"> with </p>
                    <Dropdown
                        list={teamCache ? teamCache[week]?.map((team) => team.abbrev) : []}
                        title={"Teams"}
                        activeVar={teamSchedule?.abbrev}
                        setVar={(abbrev: string) =>
                            teamCache
                                ? setTeamSchedule(
                                      teamCache[week]?.find((team) => team.abbrev === abbrev)
                                  )
                                : setTeamSchedule(undefined)
                        }
                    ></Dropdown>
                    <p className="mt-5"> schedule </p>
                </div>

                <ScheduleChangeTable
                    pointsAgainst={pointsAgainst}
                    record={newWins + " - " + newLosses}
                    activeTeam={activeTeam}
                    matchups={teamMatchups}
                    teams={teamCache ? teamCache : {}}
                />
            </Layout>
        </>
    );
}
