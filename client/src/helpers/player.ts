import { stat } from "fs";
import { ScoringIdMap, proTeamAbbrev } from "./constants";

export class Player {
    /**
     * Player Id
     *
     * @type {number}
     * @memberof Player
     */
    public id: number;

    /**
     * League Team Id
     *
     * @type {number}
     * @memberof Player
     */
    public onTeamId: number;

    /**
     * Active status
     *
     * @type {boolean}
     * @memberof Player
     */
    public active: boolean;

    /**
     * Default Position Id
     *
     * @type {number}
     * @memberof Player
     */
    public defaultPositionId: number;

    /**
     * Lineup slot Id
     *
     * @type {number}
     * @memberof Player
     */
    public lineupSlotId: number;

    /**
     * Droppable status
     *
     * @type {boolean}
     * @memberof Player
     */
    public droppable: boolean;

    /**
     * Array of eligible slots
     *
     * @type {number[]}
     * @memberof Player
     */
    public eligibleSlots: number[];

    /**
     * Player First Name
     *
     * @type {string}
     * @memberof Player
     */
    public firstName: string;

    /**
     * Player Full Name
     *
     * @type {string}
     * @memberof Player
     */
    public fullName: string;

    /**
     * Injured flag
     *
     * @type {boolean}
     * @memberof Player
     */
    public injured: boolean;

    /**
     * Injruy Status
     *
     * @type {string}
     * @memberof Player
     */
    public injuryStatus: string;

    /**
     * Jersey Number
     *
     * @type {number}
     * @memberof Player
     */
    public jersey: number;

    /**
     * Player Last Name
     *
     * @type {string}
     * @memberof Player
     */
    public lastName: string;

    /**
     * NFL Team Id
     *
     * @type {number}
     * @memberof Player
     */
    public proTeamId: number;

    /**
     * Season outlook
     *
     * @type {string}
     * @memberof Player
     */
    public seasonOutlook: string;

    /**
     * IStats of players total yearly stats
     *
     * @type {(IStats | undefined)}
     * @memberof Player
     */
    public totalStats: IStats | undefined;

    /**
     * IStats of players stats for scoring period
     *
     * @type {(IStats | undefined)}
     * @memberof Player
     */
    public weekStats: IStats | undefined;

    /**
     * IStats of players projections for scoring period
     *
     * @type {(IStats | undefined)}
     * @memberof Player
     */
    public weekProjections: IStats | undefined;

    constructor(player: IPlayer, week: number) {
        this.id = player.id;
        this.onTeamId = player.onTeamId;
        this.active = player.active;
        this.defaultPositionId = player.defaultPositionId;
        this.lineupSlotId = -1;
        this.droppable = player.droppable;
        this.eligibleSlots = player.eligibleSlots;
        this.firstName = player.firstName;
        this.fullName = player.fullName;
        this.injured = player.injured;
        this.injuryStatus = player.injuryStatus;
        this.jersey = player.jersey;
        this.lastName = player.lastName;
        this.proTeamId = player.proTeamId;
        this.seasonOutlook = player.seasonOutlook;
        this.totalStats = this.getTotalStats(player.stats);
        this.weekStats = this.getWeekStats(player.stats, week);
        this.weekProjections = this.getWeekProjections(player.stats, week);
    }

    public getHeadshot(): string {
        return this.defaultPositionId === 16
            ? `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/${proTeamAbbrev[this.proTeamId]}.png&h=150&w=150&w=96&h=70&cb=1`
            : `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${this.id}.png&w=96&h=70&cb=1`;
    }

    /**
     * Create the IStats of the players total stats
     *  - ScoringPeriod === 0 and sourceId === 0
     * @private
     * @param {IStats[]} playerStats
     * @return {*}  {(IStats | undefined)}
     * @memberof Player
     */
    private getTotalStats(playerStats: IStats[]): IStats | undefined {
        const totalStats =
            playerStats.filter((stat) => {
                return stat.scoringPeriodId === 0 && stat.statSourceId === 0;
            })[0] ?? undefined;
        if (!totalStats) {
            return;
        }
        var statmap = new Map<string, number>();
        Object.keys(totalStats.stats).map((key: string) => {
            const mapping = ScoringIdMap[key];
            if (mapping) {
                statmap.set(mapping, totalStats.stats[key]);
            }
        });
        totalStats.stats = statmap;
        return totalStats;
    }

    /**
     * Create the IStats of the stats for scoring period
     *  - scoringPeriod === week and sourceID === 0
     *
     * @private
     * @param {IStats[]} playerStats
     * @param {number} week
     * @return {*}  {(IStats | undefined)}
     * @memberof Player
     */
    private getWeekStats(playerStats: IStats[], week: number): IStats | undefined {
        const weekStats =
            playerStats.filter((stat) => {
                return stat.scoringPeriodId === week && stat.statSourceId === 0;
            })[0] ?? undefined;
        if (!weekStats) {
            return;
        }
        var statmap = new Map<string, number>();
        Object.keys(weekStats.stats).map((key: string) => {
            const mapping = ScoringIdMap[key];
            if (mapping) {
                statmap.set(mapping, weekStats.stats[key]);
            }
        });
        weekStats.stats = statmap;
        return weekStats;
    }

    /**
     * Create IStats of players projections for week
     *  - scoringPeriod === week and sourceId === 1
     * @private
     * @param {IStats[]} stats
     * @param {number} week
     * @return {*}  {(IStats | undefined)}
     * @memberof Player
     */
    private getWeekProjections(stats: IStats[], week: number): IStats | undefined {
        const weekProjections =
            stats.filter((stat) => {
                return stat.scoringPeriodId === week && stat.statSourceId === 1;
            })[0] ?? undefined;
        if (!weekProjections) {
            return;
        }
        var statmap = new Map<string, number>();
        Object.keys(weekProjections.stats).map((key: string) => {
            const mapping = ScoringIdMap[key];
            if (mapping) {
                statmap.set(mapping, weekProjections.stats[key]);
            }
        });
        weekProjections.stats = statmap;
        return weekProjections;
    }
}

export interface IPlayer {
    id: number;
    onTeamId: number;
    active: boolean;
    defaultPositionId: number;
    droppable: boolean;
    eligibleSlots: [];
    firstName: string;
    fullName: string;
    injured: boolean;
    injuryStatus: string;
    jersey: number;
    lastName: string;
    proTeamId: number;
    seasonOutlook: string;
    stats: IStats[];
}

/**
 * Player format retrieved when loading Teams
 *
 * @export
 * @interface IESPNPlayer
 */
export interface IESPNPlayer {
    player: IPlayer;
    onTeamId: number;
}

/**
 * Stats interface for players stats
 *
 * @interface IStats
 */
interface IStats {
    appliedTotal: number;
    scoringPeriodId: number;
    statSourceId: number;

    /**
     * Dictionary of scoring stat id to stat total
     *
     * @type {*}
     * @memberof IStats
     */
    stats: any;
}
