/**
 * Positions in a typical Fantasy Football roster
 */
export const lineupSlots = ["QB", "RB", "WR", "TE", "FLEX", "DST", "K"];

/**
 * Mapping of position to lineupSlotId
 */
export const posToID: Record<string, number> = {
    QB: 0,
    RB: 2,
    WR: 4,
    TE: 6,
    FLEX: 23,
    DST: 16,
    K: 17,
    BE: 20,
};

/**
 * Mapping of lineupSlotId to position
 */
export const lineupSlotId: Record<number, string> = {
    0: "QB",
    2: "RB",
    4: "WR",
    6: "TE",
    23: "FLEX",
    16: "DST",
    17: "K",
    20: "BE",
};

export const proTeamId: Record<number, string> = {
    0: "None",
    1: "Atlanta Falcons",
    2: "Buffalo Bills",
    3: "Chicago Bears",
    4: "Cincinnati Bengals",
    5: "Cleveland Browns",
    6: "Dallas Cowboys",
    7: "Denver Broncos",
    8: "Detroit Lions",
    9: "Green Bay Packers",
    10: "Tennessee Titans",
    11: "Indianapolis Colts",
    12: "Kansas City Chiefs",
    13: "Oakland Raiders",
    14: "Los Angeles Rams",
    15: "Miami Dolphins",
    16: "Minnesota Vikings",
    17: "New England Patriots",
    18: "New Orleans Saints",
    19: "New York Giants",
    20: "New York Jets",
    21: "Philadelphia Eagles",
    22: "Arizona Cardinals",
    23: "Pittsburgh Steelers",
    24: "Los Angeles Chargers",
    25: "San Francisco 49ers",
    26: "Seattle Seahawks",
    27: "Tampa Bay Buccaneers",
    28: "Washington Commanders",
    29: "Carolina Panthers",
    30: "Jacksonville Jaguars",
    33: "Baltimore Ravens",
    34: "Houston Texans",
};

export const proTeamAbbrev: Record<number, string> = {
    0: "None",
    1: "ATL",
    2: "BUF",
    3: "CHI",
    4: "CIN",
    5: "CLE",
    6: "DAL",
    7: "DEN",
    8: "DET",
    9: "GB",
    10: "TEN",
    11: "IND",
    12: "KC",
    13: "OAK",
    14: "LAR",
    15: "MIA",
    16: "MIN",
    17: "NE",
    18: "NO",
    19: "NYG",
    20: "NYJ",
    21: "PHI",
    22: "ARI",
    23: "PIT",
    24: "LAC",
    25: "SF",
    26: "SEA",
    27: "TB",
    28: "WSH",
    29: "CAR",
    30: "JAX",
    33: "BAL",
    34: "HOU",
};

/**
 * Mapping of id to scoring stat
 *
 * */
export const ScoringIdMap: Record<string, string> = {
    "0": "passingAttempts",
    "1": "passingCompletions",
    "2": "passingIncompletions",
    "3": "passingYards",
    "4": "passingTouchdowns",
    "19": "passing2PtConversion",
    "20": "passingInterceptions",
    "23": "rushingAttempts",
    "24": "rushingYards",
    "25": "rushingTouchdowns",
    "26": "rushing2PtConversion",
    "38": "rushing200PlusYardGame",
    "41": "receivingReceptions",
    "42": "receivingYards",
    "43": "receivingTouchdowns",
    "44": "receiving2PtConversions",
    "68": "fumbles",
    "213": "receivingFirstDowns",
};
