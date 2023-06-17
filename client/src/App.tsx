import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import leagueInfo from "./secrets.json";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import TeamsPage from "./pages/TeamsPage";
import { ITeam, Team } from "./helpers/team";
import MatchupsPage from "./pages/MatchupsPage";
import { IMatchup, Matchup } from "./helpers/matchup";
import { ILeague } from "./helpers/league";
import { FantasyFootballContext } from "./components/FantasyFootballContext";
import BoxScorePage from "./pages/BoxScorePage";
import SchedulePage from "./pages/SchedulePage";
import MaxPointsPage from "./pages/MaxPointsPage";

axios.defaults.withCredentials = true;

function App() {
    const [isLoading, setLoading] = useState(true);
    const [teamCache, setTeamCache] = useState<{ [week: number]: Team[] | undefined }>();
    const [matchupCache, setMatchupCache] = useState<{ [week: number]: Matchup[] | undefined }>();
    const [league, setLeague] = useState<ILeague>();
    const week = 0;
    const [headers, setHeaders] = useState({
        headers: `{"Cookie": "espn_s2=${leagueInfo.espn_s2}; SWID=${leagueInfo.swid};"}`,
    });
    const [config, setConfig] = useState({
        params: { leagueId: leagueInfo.leagueID, year: 2022, week: week },
        headers: headers,
    });
    const [currentTab, setCurrentTab] = useState("");

    useEffect(() => {
        if (!league && headers) {
            axios
                .get("/league", config)
                .then((res) => {
                    setLeague(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                });
        }
    }, []);

    async function initCache(week: number): Promise<boolean> {
        if ((!matchupCache || !matchupCache[week]) && (!teamCache || !teamCache[week])) {
            return getMatchups().then(() => getTeams(week).then((res) => res));
        } else if (!matchupCache || !matchupCache[week]) {
            return getMatchups().then((res) => res);
        } else if (!teamCache || !teamCache[week]) {
            return getTeams(week).then((res) => res);
        }
        return Promise.resolve(true);
    }

    async function getMatchups(): Promise<boolean> {
        return axios.get("/matchups", config).then((res: any) => {
            const allGames: Matchup[] = res.data.schedule.map(
                (matchup: IMatchup) => new Matchup(matchup)
            );
            var cache: { [week: number]: Matchup[] | undefined } = {};
            for (const matchup of allGames) {
                if (matchup.matchupPeriodId in cache) {
                    cache[matchup.matchupPeriodId]?.push(matchup);
                } else {
                    cache[matchup.matchupPeriodId] = [matchup];
                }
            }
            setMatchupCache(cache);
            return true;
        });
    }

    async function getTeams(week: number): Promise<boolean> {
        config.params.week = week;
        return axios.get("/teams", config).then((res: any) => {
            setTeamCache((previousTeams) => ({
                ...previousTeams,
                [week]: res.data.teams.map((team: ITeam) => new Team(team, week)),
            }));
            return true;
        });
    }

    //TODO Add better loading screen
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <FantasyFootballContext.Provider
            value={{
                headers,
                config,
                teamCache,
                setTeamCache,
                matchupCache,
                setMatchupCache,
                initCache,
            }}
        >
            <Navbar />
            <Routes>
                <Route
                    path="teams"
                    element={<TeamsPage maxWeek={league?.status.finalScoringPeriod} />}
                />
                <Route path="schedule" element={<SchedulePage />} />
                <Route path="matchups" element={<MatchupsPage />} />
                <Route path="boxscore/:week/:matchupId" element={<BoxScorePage />} />
                <Route path="/maxpoints" element={<MaxPointsPage />} />
            </Routes>
        </FantasyFootballContext.Provider>
    );
}

export default App;
