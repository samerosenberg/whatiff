import { useContext, useEffect, useState } from "react";
import Dropdown from "../components/dropdown";
import { FantasyFootballContext } from "../components/FantasyFootballContext";
import Layout from "../components/Layout";
import MaxPointsTable from "../components/MaxPointsTable";
import { IBoxScore, Matchup } from "../helpers/matchup";
import { Team } from "../helpers/team";

export default function MaxPointsPage() {
    const [loading, setLoading] = useState(true);
    const [activeTeam, setActiveTeam] = useState<Team>();
    const [teamMatchups, setTeamMatchups] = useState<Matchup[]>([]);
    const [maxPoints, setMaxPoints] = useState(0);
    const [newWins, setNewWins] = useState(0);
    const [newLosses, setNewLosses] = useState(0);

    const { headers, config, teamCache, setTeamCache, matchupCache, setMatchupCache, initCache } =
        useContext(FantasyFootballContext);

    useEffect(() => {
        function processBoxScore(
            boxScore: IBoxScore,
            isRegularSeason: boolean,
            oppScore: number
        ): IBoxScore {
            const matchupWeeks = Object.keys(boxScore.pointsByScoringPeriod).map((key) =>
                parseInt(key)
            );
            if (
                teamCache &&
                matchupWeeks.every((matchupWeek) =>
                    Object.keys(teamCache)
                        .map((key) => parseInt(key))
                        .includes(matchupWeek)
                )
            ) {
                var totalPoints = 0;
                for (var weekInMatchup of matchupWeeks) {
                    totalPoints += teamCache[weekInMatchup]![boxScore.teamId - 1]
                        ? teamCache[weekInMatchup]![boxScore.teamId - 1].getMaxPointsForWeek()
                              .points
                        : boxScore.pointsByScoringPeriod[weekInMatchup];
                }
                boxScore.totalPoints = totalPoints;
            }
            if (isRegularSeason) {
                if (boxScore.totalPoints > oppScore) {
                    setNewWins((previousWins) => previousWins + 1);
                } else {
                    setNewLosses((previousLosses) => previousLosses + 1);
                }
                setMaxPoints((previousMax) => previousMax + boxScore.totalPoints);
            }
            return boxScore;
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
        setMaxPoints(0);
        //Don't count weeks 15-17
        setNewWins(0);
        setNewLosses(0);
        if (matchupCache && teamCache && activeTeam) {
            const maxWeek = Math.max(...Object.keys(matchupCache!).map(Number));
            for (var matchupWeek = 1; matchupWeek <= maxWeek; matchupWeek++) {
                matchupCache[matchupWeek]?.map((matchup) => {
                    const isRegularSeason = matchup.playoffTierType === "NONE";
                    if (matchup.away.teamId === activeTeam?.id) {
                        matchup.away = processBoxScore(
                            matchup.away,
                            isRegularSeason,
                            matchup.home.totalPoints
                        );
                        teamMatchupsTemp.push(matchup);
                    }
                    if (matchup.home.teamId === activeTeam?.id) {
                        matchup.home = processBoxScore(
                            matchup.home,
                            isRegularSeason,
                            matchup.away.totalPoints
                        );
                        teamMatchupsTemp.push(matchup);
                    }
                });
            }
        }
        setTeamMatchups(teamMatchupsTemp);
    }, [loading, activeTeam]);

    return (
        <>
            <Layout>
                <Dropdown
                    list={teamCache ? teamCache[0]?.map((team) => team.abbrev) : []}
                    title={"Teams"}
                    activeVar={activeTeam?.abbrev}
                    setVar={(abbrev: string) =>
                        teamCache
                            ? setActiveTeam(teamCache[0]?.find((team) => team.abbrev === abbrev))
                            : setActiveTeam(undefined)
                    }
                ></Dropdown>

                <MaxPointsTable
                    record={newWins + " - " + newLosses}
                    maxPoints={maxPoints}
                    activeTeam={activeTeam}
                    matchups={teamMatchups}
                    teams={teamCache ? teamCache : {}}
                />
            </Layout>
        </>
    );
}
