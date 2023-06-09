import { Player } from "./player";
import { lineupSlotId } from "./constants";

export class Roster {
    /**
     * Starting QBs
     *
     * @type {Player[]}
     * @memberof Roster
     */
    public QB: Player[] = [];

    /**
     * Starting RBs
     *
     * @type {Player[]}
     * @memberof Roster
     */
    public RB: Player[] = [];

    /**
     * Starting WRs
     *
     * @type {Player[]}
     * @memberof Roster
     */
    public WR: Player[] = [];

    /**
     * Starting TEs
     *
     * @type {Player[]}
     * @memberof Roster
     */
    public TE: Player[] = [];

    /**
     * Starting Flexs
     *
     * @type {Player[]}
     * @memberof Roster
     */
    public FLEX: Player[] = [];

    /**
     * Starting Defenses
     *
     * @type {Player[]}
     * @memberof Roster
     */
    public DST: Player[] = [];

    /**
     *Starting Kickers
     *
     * @type {Player[]}
     * @memberof Roster
     */
    public K: Player[] = [];

    /**
     * Bench Players
     *
     * @type {Player[]}
     * @memberof Roster
     */
    public BE: Player[] = [];
    [key: string]: Player[];

    constructor(playerArray: Player[]) {
        playerArray.map((player: Player) => {
            const pos = lineupSlotId[player.lineupSlotId];
            if (pos in this) {
                this[pos].push(player);
            }
        });
    }

    //public static rosterFromMap(playerMap: Map<string, Player[]>) {}
}
