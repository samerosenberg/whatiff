export class TeamRecord {
    /**
     * Away Record
     *
     * @type {IRecord}
     * @memberof TeamRecord
     */
    public away: IRecord;

    /**
     * Division Record
     *
     * @type {IRecord}
     * @memberof TeamRecord
     */
    public division: IRecord;

    /**
     * Home Record
     *
     * @type {IRecord}
     * @memberof TeamRecord
     */
    public home: IRecord;

    /**
     * Overall Record
     *
     * @type {IRecord}
     * @memberof TeamRecord
     */
    public overall: IRecord;
    constructor(record: ITeamRecord) {
        this.away = record.away;
        this.division = record.division;
        this.home = record.home;
        this.overall = record.overall;
    }
}

export interface ITeamRecord {
    away: IRecord;
    division: IRecord;
    home: IRecord;
    overall: IRecord;
}

interface IRecord {
    /**
     * Total games back
     *
     * @type {number}
     * @memberof IRecord
     */
    gamesBack: number;

    /**
     * Total Losses
     *
     * @type {number}
     * @memberof IRecord
     */
    losses: number;

    /**
     * Win percentage
     *
     * @type {number}
     * @memberof IRecord
     */
    percentage: number;

    /**
     * Total points against
     *
     * @type {number}
     * @memberof IRecord
     */
    pointsAgainst: number;

    /**
     * Total points for
     *
     * @type {number}
     * @memberof IRecord
     */
    pointsFor: number;

    /**
     * Current streak length
     *
     * @type {number}
     * @memberof IRecord
     */
    streakLength: number;

    /**
     * Current streak type: "WIN" or "LOSS"
     *
     * @type {string}
     * @memberof IRecord
     */
    streakType: string;

    /**
     * Ties
     *
     * @type {number}
     * @memberof IRecord
     */
    ties: number;

    /**
     * Total wins
     *
     * @type {number}
     * @memberof IRecord
     */
    wins: number;
}
