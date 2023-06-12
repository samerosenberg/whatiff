import { createContext } from "react";
import { Matchup } from "../helpers/matchup";
import { Team } from "../helpers/team";

const base: IFantasyFootballContext = {
    headers: { headers: "" },
    config: { params: { leagueId: "", year: 0, week: 0 }, headers: { headers: "" } },
    matchupCache: {},
    setMatchupCache: () => {},
    teamCache: {},
    setTeamCache: () => {},
    initCache: () => {
        return Promise.resolve(false);
    },
};

export const FantasyFootballContext = createContext<IFantasyFootballContext>(base);

interface IFantasyFootballContext {
    headers: { headers: string };
    config: { params: { leagueId: string; year: number; week: number }; headers: { headers: string } };
    matchupCache: { [week: number]: Matchup[] | undefined } | undefined;
    setMatchupCache: (cache?: { [week: number]: Matchup[] | undefined }) => void;
    teamCache: { [week: number]: Team[] | undefined } | undefined;
    setTeamCache: (cache: { [week: number]: Team[] | undefined }) => void;
    initCache: (week: number) => Promise<boolean>;
}
