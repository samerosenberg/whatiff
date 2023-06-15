import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Matchup } from "../helpers/matchup";
import { Team } from "../helpers/team";
import BoxScorePage from "../pages/BoxScorePage";

export default function MatchupsTable(tableProps: IMatchupTableProps) {
    const [openMatchups, setOpenMatchups] = useState<number[]>([]);

    if (!tableProps.matchups || !tableProps.teams) {
        return <div></div>;
    }

    return (
        <>
            {tableProps.matchups?.map((matchup: Matchup) => {
                return (
                    <div
                        tabIndex={0}
                        className="collapse collapse-arrow join-item border border-base-300 my-10 mx-96 w-auto"
                    >
                        <input
                            type="checkbox"
                            checked={openMatchups.includes(matchup.id)}
                            onChange={() =>
                                openMatchups.includes(matchup.id)
                                    ? setOpenMatchups(
                                          openMatchups.filter(
                                              (matchupId) => matchupId !== matchup.id
                                          )
                                      )
                                    : setOpenMatchups([...openMatchups, matchup.id])
                            }
                        />
                        <div className="collapse-title font-medium flex flex-row flex-wrap">
                            <div className="text-left w-1/3">
                                <p className="text-2xl">
                                    {
                                        tableProps.teams?.find(
                                            (team) => team.id === matchup.home.teamId
                                        )?.name
                                    }
                                </p>
                                <p>{matchup.home.totalPoints}</p>
                            </div>
                            <p className="text-center w-1/3">vs</p>
                            <div className="text-right w-1/3">
                                <p className="text-2xl">
                                    {
                                        tableProps.teams?.find(
                                            (team) => team.id === matchup.away.teamId
                                        )?.name
                                    }
                                </p>
                                <p>{matchup.away.totalPoints}</p>
                            </div>
                        </div>
                        <div className="collapse-content">
                            <div className="flex">
                                <p className="text-left w-1/2 font-bold mt-2">Top Scorers</p>
                                <p className="text-right w-1/2 font-bold mt-2">Top Scorers</p>
                            </div>
                            <div className="flex">
                                <ul className="text-left w-1/2">
                                    {tableProps.teams
                                        ?.find((team) => team.id === matchup.home.teamId)
                                        ?.getTopThreeScorers()
                                        .map((player, index) => {
                                            return (
                                                <li>
                                                    {index + 1}. {player.fullName ?? "None"} -{" "}
                                                    {player.weekStats?.appliedTotal.toFixed(1)}
                                                </li>
                                            );
                                        })}
                                </ul>
                                <ul className="text-right w-1/2">
                                    {tableProps.teams
                                        ?.find((team) => team.id === matchup.away.teamId)
                                        ?.getTopThreeScorers()
                                        .map((player, index) => {
                                            return (
                                                <li>
                                                    {index + 1}. {player.fullName ?? "None"} -{" "}
                                                    {player.weekStats?.appliedTotal.toFixed(1)}
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                            <div className="mt-5">
                                <Link
                                    className="link link-info"
                                    to={"/boxscore/" + matchup.matchupPeriodId + "/" + matchup.id}
                                >
                                    See full box score
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

interface IMatchupTableProps {
    matchups: Matchup[] | undefined;
    teams: Team[] | undefined;
}
