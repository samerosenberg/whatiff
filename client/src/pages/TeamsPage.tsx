import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { ITeam, Team } from "../helpers/team";
import Dropdown from "../components/dropdown";
import Layout from "../components/Layout";
import TeamTable, { SkeletonTeam } from "../components/TeamTable";
import { FantasyFootballContext } from "../components/FantasyFootballContext";
import { IBoxScore } from "../helpers/matchup";

export default function TeamsPage(teamProps: ITeamProps) {
    const [activeTeam, setActiveTeam] = useState<Team>();
    const [week, setWeek] = useState(0);
    const [loading, setLoading] = useState(true);
    const [boxScore, setBoxScore] = useState<IBoxScore>();

    const { headers, config, teamCache, setTeamCache, matchupCache, setMatchupCache, initCache } =
        useContext(FantasyFootballContext);

    useEffect(() => {
        if (!teamCache || !teamCache[week]) {
            setLoading(true);
            initCache(week).then((doneLoading) => {
                setLoading(!doneLoading);
            });
        }
        if (matchupCache) {
            var boxscore = matchupCache[week]?.find(
                (matchup) => matchup.home.teamId === activeTeam?.id
            )?.home;
            if (!boxscore) {
                boxscore = matchupCache[week]?.find(
                    (matchup) => matchup.away.teamId === activeTeam?.id
                )?.away;
            }
            setBoxScore(boxscore);
        }
    }, [activeTeam, week, loading]);

    return (
        <Layout>
            <div className="flex flex-row">
                <Dropdown
                    list={teamCache ? teamCache[week]?.map((team) => team.abbrev) : []}
                    title={"Teams"}
                    activeVar={activeTeam?.abbrev}
                    setVar={(abbrev: string) =>
                        teamCache
                            ? setActiveTeam(teamCache[week]?.find((team) => team.abbrev === abbrev))
                            : setActiveTeam(undefined)
                    }
                ></Dropdown>
                {activeTeam ? (
                    <Dropdown
                        list={Array.from(
                            { length: teamProps.maxWeek! },
                            (value, index) => index + 1
                        )}
                        title={"Week"}
                        activeVar={week}
                        setVar={setWeek}
                    ></Dropdown>
                ) : (
                    <></>
                )}
            </div>
            {loading ? (
                <SkeletonTeam />
            ) : activeTeam ? (
                <TeamTable
                    team={
                        teamCache
                            ? teamCache[week]?.find((team) => team.id === activeTeam.id)
                            : undefined
                    }
                    boxScore={boxScore}
                />
            ) : (
                <div></div>
            )}
        </Layout>
    );
}

interface ITeamProps {
    maxWeek: number | undefined;
}
