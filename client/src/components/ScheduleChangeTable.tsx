import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Matchup } from "../helpers/matchup";
import { Team } from "../helpers/team";
import BoxScorePage from "../pages/BoxScorePage";

export default function ScheduleChangeTable(tableProps: IScheduleChangeTableProps) {
    const [openMatchups, setOpenMatchups] = useState<number[]>([]);
    const [record, setRecord] = useState("");

    useEffect(() => {
        const team = tableProps.teams[0]?.find(
            (team: Team) => team.id === tableProps.activeTeam?.id
        );
        const recordString = team?.record.overall.wins + " - " + team?.record.overall.losses;
        setRecord(recordString);
    }, [tableProps.activeTeam]);

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
                <table className="table mx-96 text-center table-fixed">
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
                                    {record} -{">"} {tableProps.record}{" "}
                                </td>
                            ) : (
                                <td className="w-1/3">0-0</td>
                            )}

                            <td className="w-1/3">
                                {tableProps.teams[0]
                                    ? tableProps.teams[0]
                                          .find(
                                              (team: Team) => team.id === tableProps.activeTeam?.id
                                          )
                                          ?.record.overall.pointsFor.toFixed(2)
                                    : 0}
                            </td>
                            <td>
                                {tableProps.teams[0] ? (
                                    <td>
                                        {" "}
                                        {tableProps.teams[0]
                                            .find(
                                                (team: Team) =>
                                                    team.id === tableProps.activeTeam?.id
                                            )
                                            ?.record.overall.pointsAgainst.toFixed(2)}{" "}
                                        -{">"} {tableProps.pointsAgainst.toFixed(2)}
                                    </td>
                                ) : (
                                    <td>0</td>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {tableProps.matchups?.map((matchup: Matchup) => {
                return (
                    <>
                        <h1 className="m-10 ml-80 font-bold text-xl">
                            Week {matchup.matchupPeriodId}{" "}
                        </h1>
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

interface IScheduleChangeTableProps {
    pointsAgainst: number;
    record: string;
    activeTeam: Team | undefined;
    matchups: Matchup[] | undefined;
    teams: { [week: number]: Team[] | undefined };
}
