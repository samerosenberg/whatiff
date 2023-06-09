import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import leagueInfo from "./secrets.json";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import TeamsPage from "./pages/TeamsPage";
import { ITeam, Team } from "./helpers/team";
import MatchupsPage from "./pages/MatchupsPage";
import { Matchup } from "./helpers/matchup";

axios.defaults.withCredentials = true;

function App() {
    const [isLoading, setLoading] = useState(true);
    const [teamCache, setTeamCache] = useState<{ [week: number]: Team[] | undefined }>();
    const [matchupCache, setMatchupCache] = useState<{ [week: number]: Matchup[] | undefined }>();
    const [league, setLeague] = useState();
    const week = 0;
    const headers = useRef({ headers: `{"Cookie": "espn_s2=${leagueInfo.espn_s2}; SWID=${leagueInfo.swid};"}` });
    const config = useRef({ params: { leagueId: leagueInfo.leagueID, year: 2022, week: week }, headers: headers.current });

    useEffect(() => {
        if (!league && headers) {
            axios
                .get("/league", config.current)
                .then((res) => {
                    setLeague(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                });
            axios.get("/teams", config.current).then((res: any) => {
                setTeamCache({ [week]: res.data.teams.map((team: ITeam) => new Team(team, week)) });
                setLoading(false);
            });
        }
    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    //TODO fix this
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/teams" element={<TeamsPage headers={headers.current} config={config.current} cache={teamCache} addToCache={setTeamCache} />} />
                <Route
                    path="/matchups"
                    element={
                        <MatchupsPage
                            headers={headers.current}
                            config={config.current}
                            matchupCache={matchupCache}
                            addToMatchupCache={setMatchupCache}
                            teamCache={teamCache}
                            addToTeamCache={setTeamCache}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
