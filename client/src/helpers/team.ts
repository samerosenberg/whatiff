import { TeamRecord, ITeamRecord } from "./record";
import { Player, IESPNPlayer } from "./player";
import { Roster } from "./roster";
import { lineupSlots, posToID } from "./constants";

export class Team {
    /**
     * Team Abbreviation
     *
     * @type {string}
     * @memberof Team
     */
    public abbrev: string;

    /**
     * Current ESPN projected rank
     *
     * @type {number}
     * @memberof Team
     */
    public currentProjectedRank: number;

    /**
     * Divison id
     *
     * @type {number}
     * @memberof Team
     */
    public divisionId: number;

    /**
     * ESPN Projection from draft day
     *
     * @type {7}
     * @memberof Team
     */
    public draftDayProjectedRank: 7;

    /**
     * Team ID
     *
     * @type {number}
     * @memberof Team
     */
    public id: number;

    /**
     * Team Name
     *
     * @type {string}
     * @memberof Team
     */
    public name: string;

    /**
     * Owners list
     *
     * @type {string[]}
     * @memberof Team
     */
    public owners: string[];

    /**
     * Playoff Seed
     *
     * @type {number}
     * @memberof Team
     */
    public playoffSeed: number;

    /**
     * Total points scored
     *
     * @type {number}
     * @memberof Team
     */
    public points: number;

    /**
     * Primary Owner
     *
     * @type {string}
     * @memberof Team
     */
    public primaryOwner: string;

    /**
     * Current ranking
     *
     * @type {number}
     * @memberof Team
     */
    public rankCalculatedFinal: number;

    /**
     * Record
     *
     * @type {TeamRecord}
     * @memberof Team
     */
    public record: TeamRecord;

    /**
     * Team Roster
     *
     * @type {Roster}
     * @memberof Team
     */
    public roster: Roster;

    /**
     * Team Transactions
     *
     * @type {ITransactionCounter}
     * @memberof Team
     */
    public transactionCounter: ITransactionCounter;

    /**
     * Current waiver rank
     *
     * @type {number}
     * @memberof Team
     */
    public waiverRank: number;

    constructor(team: ITeam, week: number) {
        this.abbrev = team.abbrev;
        this.currentProjectedRank = team.currentProjectedRank;
        this.divisionId = team.divisionId;
        this.draftDayProjectedRank = team.draftDayProjectedRank;
        this.id = team.id;
        this.name = team.name;
        this.owners = team.owners;
        this.playoffSeed = team.playoffSeed;
        this.points = team.points;
        this.primaryOwner = team.primaryOwner;
        this.rankCalculatedFinal = team.rankCalculatedFinal;
        this.record = new TeamRecord(team.record);
        this.roster = new Roster(
            team.roster.entries.map((poolEntry: IPlayerPoolEntry) => {
                const player = poolEntry.playerPoolEntry;
                const newPlayer = new Player(player.player, week);
                newPlayer.onTeamId = player.onTeamId;
                newPlayer.lineupSlotId = poolEntry.lineupSlotId;
                return newPlayer;
            })
        );
        this.transactionCounter = team.transactionCounter;
        this.waiverRank = team.waiverRank;
    }

    /**
     * Get max points and Roster for a team for a given week
     *
     * @return {*}  {{ roster: Roster; points: number }}
     * @memberof Team
     */
    public getMaxPointsForWeek(): { roster: Roster; points: number } {
        const maxRoster = Object.assign([], this.roster);
        var maxPoints = 0;

        for (const pos of lineupSlots) {
            for (const starter of maxRoster[pos]) {
                var maxPlayer: Player | undefined = undefined;
                for (const player of maxRoster["BE"]) {
                    if (player.eligibleSlots.includes(starter.lineupSlotId)) {
                        if (!maxPlayer) {
                            maxPlayer = player;
                        } else if ((maxPlayer.weekStats?.appliedTotal ?? 0) < (player.weekStats?.appliedTotal ?? 0)) {
                            maxPlayer = player;
                        }
                    }
                }
                if (maxPlayer) {
                    if ((starter.weekStats?.appliedTotal ?? 0) < (maxPlayer.weekStats?.appliedTotal ?? 0)) {
                        maxRoster[pos] = maxRoster[pos].filter((removePlayer) => {
                            return removePlayer.id !== starter.id;
                        });
                        maxRoster[pos].push(maxPlayer);
                        maxRoster["BE"] = maxRoster["BE"].filter((removePlayer: Player) => {
                            return removePlayer.id !== maxPlayer?.id;
                        });
                        maxRoster["BE"].push(starter);
                        maxPoints += maxPlayer.weekStats?.appliedTotal ?? 0;
                    } else {
                        maxPoints += starter.weekStats?.appliedTotal ?? 0;
                    }
                } else {
                    maxPoints += starter.weekStats?.appliedTotal ?? 0;
                }
            }
        }

        return { roster: maxRoster, points: maxPoints };
    }
}

export interface ITeam {
    abbrev: string;
    currentProjectedRank: number;
    divisionId: number;
    draftDayProjectedRank: 7;
    id: number;
    name: string;
    owners: string[];
    playoffSeed: number;
    points: number;
    primaryOwner: string;
    rankCalculatedFinal: number;
    record: ITeamRecord;
    roster: { entries: IPlayerPoolEntry[] };
    transactionCounter: ITransactionCounter;
    waiverRank: number;
}

interface IPlayerPoolEntry {
    /**
     * Lineup position id
     *
     * @type {number}
     * @memberof IPlayerPoolEntry
     */
    lineupSlotId: number;

    /**
     * ESPN player entry
     *
     * @type {IESPNPlayer}
     * @memberof IPlayerPoolEntry
     */
    playerPoolEntry: IESPNPlayer;
}

interface ITransactionCounter {
    /**
     * Total team acquisitions
     *
     * @type {number}
     * @memberof ITransactionCounter
     */
    acquisitions: number;

    /**
     * Total team drops
     *
     * @type {number}
     * @memberof ITransactionCounter
     */
    drops: number;

    /**
     * Total team trades
     *
     * @type {number}
     * @memberof ITransactionCounter
     */
    trades: number;
}
