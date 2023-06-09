import { KeyPairKeyObjectResult } from "crypto";
import { ITeam } from "./team";

export class Matchup {
    /**
     * Away team's boxscore
     *
     * @type {IBoxScore}
     * @memberof Matchup
     */
    public away: IBoxScore;

    /**
     *Home team's boxscore
     *
     * @type {IBoxScore}
     * @memberof Matchup
     */
    public home: IBoxScore;

    /**
     * Matchup ID
     *
     * @type {number}
     * @memberof Matchup
     */
    public id: number;

    /**
     * Matchup Period ID
     *  - Should be same as scoring period
     *
     * @type {number}
     * @memberof Matchup
     */
    public matchupPeriodId: number;

    /**
     * Playoff Tier type
     *  - "WINNERS BRACKET"
     *  - "WINNERS CONSOLATION LADDER"
     *  - "LOSERS CONSOLATION LADDER"
     *
     * @type {string}
     * @memberof Matchup
     */
    public playoffTierType: string;

    /**
     * Winner: "AWAY" or "HOME"
     *
     * @type {string}
     * @memberof Matchup
     */
    public winner: string;
    constructor(matchup: IMatchup) {
        this.away = matchup.away;
        this.home = matchup.home;
        this.id = matchup.id;
        this.matchupPeriodId = matchup.matchupPeriodId;
        this.playoffTierType = matchup.playoffTierType;
        this.winner = matchup.winner;
    }
}

export interface IMatchup {
    away: IBoxScore;
    home: IBoxScore;
    id: number;
    matchupPeriodId: number;
    playoffTierType: string;
    winner: string;
}

interface IBoxScore {
    /**
     *Follows form: {losses, statBySlot: null, ties, wins }
     *
     * @type {object}
     * @memberof IBoxScore
     */
    cumulativeScores: object;
    /**
     * Follows form: {[week: string] : [points: number]}
     *
     * @type {object}
     * @memberof IBoxScore
     */
    pointsByScoringPeriod: object;
    /**
     * Id of team
     *
     * @type {number}
     * @memberof IBoxScore
     */
    teamId: number;
    /**
     * Total points for scored for matchup
     *
     * @type {number}
     * @memberof IBoxScore
     */
    totalPoints: number;
}
