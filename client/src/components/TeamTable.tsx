import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { lineupSlotId, proTeamId } from "../helpers/constants";
import { Player } from "../helpers/player";
import { Team } from "../helpers/team";
import "react-loading-skeleton/dist/skeleton.css";

export default function TeamTable(tableProps: ITeamTableProps) {
    if (!tableProps.team?.roster) {
        return <></>;
    }

    var startingTeam: Player[] = [];
    for (const prop in tableProps.team.roster) {
        if (tableProps.team.roster.hasOwnProperty(prop) && prop !== "BE") {
            startingTeam = startingTeam.concat(tableProps.team.roster[prop]);
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Position</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Starting Roster */}
                    {startingTeam.map((player: Player) => {
                        return (
                            <tr>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={player.getHeadshot()} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{player.fullName}</div>
                                            <div className="text-sm opacity-50">{proTeamId[player.proTeamId]}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{lineupSlotId[player.lineupSlotId]}</td>
                                <td>{player.weekStats?.appliedTotal.toFixed(1)}</td>
                            </tr>
                        );
                    })}
                </tbody>
                <td colSpan={3}>
                    <div className="divider"></div>
                </td>
                <tbody>
                    {/* Bench Players */}
                    {tableProps.team.roster.BE.map((player: Player) => {
                        return (
                            <tr>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={player.getHeadshot()} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{player.fullName}</div>
                                            <div className="text-sm opacity-50">{proTeamId[player.proTeamId]}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{lineupSlotId[player.lineupSlotId]}</td>
                                <td>{player.weekStats?.appliedTotal.toFixed(1)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export function SkeletonTable() {
    return (
        <>
            <SkeletonTheme baseColor="#d3d3d3" highlightColor="#444">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Position</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Starting Roster */}
                            {Array(9)
                                .fill(0)
                                .map(() => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <Skeleton width={200} height={200} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Skeleton width={"10rem"} height={20} />
                                                        <Skeleton width={"5rem"} height={20} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Skeleton width={"3rem"} height={50} />
                                            </td>
                                            <td>
                                                <Skeleton width={"3rem"} height={50} />
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                        <td colSpan={3}>
                            <div className="divider"></div>
                        </td>
                        <tbody>
                            {/* Bench Players */}
                            {Array(9)
                                .fill(0)
                                .map(() => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <Skeleton width={200} height={200} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Skeleton width={"10rem"} height={20} />
                                                        <Skeleton width={"5rem"} height={20} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Skeleton width={"3rem"} height={50} />
                                            </td>
                                            <td>
                                                <Skeleton width={"3rem"} height={50} />
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </SkeletonTheme>
        </>
    );
}

interface ITeamTableProps {
    team: Team | undefined;
}
