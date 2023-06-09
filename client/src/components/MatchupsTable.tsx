import { useState } from "react";
import { Matchup } from "../helpers/matchup";
import { Team } from "../helpers/team";

export default function MatchupsTable(tableProps: IMatchupTableProps) {
    const [openMatchups, setOpenMatchups] = useState<number[]>([]);

    if (!tableProps.matchups || !tableProps.teams) {
        return <div></div>;
    }

    return (
        <>
            {tableProps.matchups?.map((matchup: Matchup) => {
                return (
                    <div tabIndex={0} className="collapse collapse-arrow join-item border border-base-300 m-10">
                        <input
                            type="checkbox"
                            checked={openMatchups.includes(matchup.id)}
                            onChange={() =>
                                openMatchups.includes(matchup.id) ? setOpenMatchups(openMatchups.filter((matchupId) => matchupId !== matchup.id)) : setOpenMatchups([...openMatchups, matchup.id])
                            }
                        />
                        <div className="collapse-title text-xl font-medium flex flex-row flex-wrap">
                            <p className="text-left w-1/3">{tableProps.teams?.find((team) => team.id === matchup.home.teamId)?.name}</p>
                            <p className="text-center w-1/3">vs</p>
                            <p className="text-right w-1/3">{tableProps.teams?.find((team) => team.id === matchup.away.teamId)?.name}</p>
                        </div>
                        <div className="collapse-content">
                            <div className="flex">
                                <p className="text-left w-1/2 font-bold text-2xl">{matchup.home.totalPoints}</p>
                                <p className="text-right w-1/2 font-bold text-2xl">{matchup.away.totalPoints}</p>
                            </div>
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
                                                    {index + 1}. {player.fullName ?? "None"} - {player.weekStats?.appliedTotal.toFixed(1)}
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
                                                    {index + 1}. {player.fullName ?? "None"} - {player.weekStats?.appliedTotal.toFixed(1)}
                                                </li>
                                            );
                                        })}
                                </ul>
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
