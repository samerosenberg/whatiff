import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import leagueInfo from "./secrets.json";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import TeamsPage from "./pages/TeamsPage";
import { Team } from "./helpers/team";

axios.defaults.withCredentials = true;

function App() {
    const [isLoading, setLoading] = useState(true);
    const [cachedData, setCache] = useState<{ [week: number]: Team[] | undefined }>();
    const [league, setLeague] = useState();
    const headers = useRef({ headers: `{"Cookie": "espn_s2=${leagueInfo.espn_s2}; SWID=${leagueInfo.swid};"}` });
    const config = useRef({ params: { leagueId: leagueInfo.leagueID, year: 2022, week: 1 }, headers: headers.current });

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
                <Route path="/teams" element={<TeamsPage headers={headers.current} config={config.current} cache={cachedData} addToCache={setCache} />} />
            </Routes>
        </div>
    );
}

export default App;
