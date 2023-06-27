import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Matchup } from "../helpers/matchup";
import { Team } from "../helpers/team";
import BoxScorePage from "../pages/BoxScorePage";

export default function ScheduleTable(tableProps: IMatchupTableProps) {
    const [openMatchups, setOpenMatchups] = useState<number[]>([]);

    if (
        !tableProps.matchups ||
        !tableProps.teams ||
        tableProps.matchups.length === 0 ||
        !tableProps.activeTeam
    ) {
        return <div></div>;
    }

    return (
        <>
            <div className="flex pl-4 pr-12">
                <table className="table mx-[20vw] min-w-[400px] text-center table-fixed">
                    <thead className="text-lg text-black">
                        <tr>
                            <th>Record</th>
                            <th>Points For</th>
                            <th>Points Against</th>
                        </tr>
                    </thead>
                    <tbody className="text-base">
                        <tr>
                            {tableProps.teams[0] ? (
                                <td className="w-1/3">
                                    {" "}
                                    {
                                        tableProps.teams[0].find(
                                            (team: Team) => team.id === tableProps.activeTeam?.id
                                        )?.record.overall.wins
                                    }{" "}
                                    -{" "}
                                    {
                                        tableProps.teams[0].find(
                                            (team: Team) => team.id === tableProps.activeTeam?.id
                                        )?.record.overall.losses
                                    }{" "}
                                </td>
                            ) : (
                                <td className="w-1/3">0-0</td>
                            )}

                            <td>
                                {tableProps.teams[0]
                                    ? tableProps.teams[0]
                                          .find(
                                              (team: Team) => team.id === tableProps.activeTeam?.id
                                          )
                                          ?.record.overall.pointsFor.toFixed(2)
                                    : 0}
                            </td>
                            <td className="w-1/3">
                                {tableProps.teams[0]
                                    ? tableProps.teams[0]
                                          .find(
                                              (team: Team) => team.id === tableProps.activeTeam?.id
                                          )
                                          ?.record.overall.pointsAgainst.toFixed(2)
                                    : 0}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {tableProps.matchups?.map((matchup: Matchup) => {
                return (
                    <>
                        <h1 className="m-5 ml-[18vw] font-bold text-xl">
                            Week {matchup.matchupPeriodId}{" "}
                        </h1>
                        <div
                            tabIndex={0}
                            className="collapse collapse-arrow join-item border border-base-300 my-10 mx-[20vw] w-auto min-w-[400px]"
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
                            <div className="collapse-title font-medium flex flex-row flex-wrap items-center">
                                <div className="text-left w-1/3">
                                    <p className="text-2xl">{tableProps.activeTeam?.name}</p>
                                    <p>
                                        {matchup.home.teamId === tableProps.activeTeam?.id
                                            ? matchup.home.totalPoints
                                            : matchup.away.totalPoints}
                                    </p>
                                </div>
                                <p className="text-center w-1/3">vs</p>
                                <div className="text-right w-1/3">
                                    <p className="text-2xl">
                                        {matchup.home.teamId === tableProps.activeTeam?.id
                                            ? tableProps.teams[matchup.matchupPeriodId]?.find(
                                                  (team) => team.id === matchup.away.teamId
                                              )?.name
                                            : tableProps.teams[matchup.matchupPeriodId]?.find(
                                                  (team) => team.id === matchup.home.teamId
                                              )?.name}
                                    </p>
                                    <p>
                                        {matchup.home.teamId === tableProps.activeTeam?.id
                                            ? matchup.away.totalPoints
                                            : matchup.home.totalPoints}
                                    </p>
                                </div>
                            </div>
                            <div className="collapse-content">
                                <div className="flex">
                                    <p className="text-left w-1/2 font-bold mt-2">Top Scorers</p>
                                    <p className="text-right w-1/2 font-bold mt-2">Top Scorers</p>
                                </div>
                                <div className="flex">
                                    <ul className="text-left w-1/2">
                                        {tableProps.teams[matchup.matchupPeriodId]
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
                                        {tableProps.teams[matchup.matchupPeriodId]
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
                                        to={
                                            "/boxscore/" +
                                            matchup.matchupPeriodId +
                                            "/" +
                                            matchup.id
                                        }
                                    >
                                        See full box score
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                );
            })}
        </>
    );
}

interface IMatchupTableProps {
    activeTeam: Team | undefined;
    matchups: Matchup[] | undefined;
    teams: { [week: number]: Team[] | undefined };
}
