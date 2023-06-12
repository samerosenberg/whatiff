import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dropdown from "../components/dropdown";
import { FantasyFootballContext } from "../components/FantasyFootballContext";
import Layout from "../components/Layout";
import MatchupsTable from "../components/MatchupsTable";
import { IMatchup, Matchup } from "../helpers/matchup";
import { ITeam, Team } from "../helpers/team";
import BoxScorePage from "./BoxScorePage";

export default function MatchupsPage() {
    const [week, setWeek] = useState(0);
    const [loading, setLoading] = useState(true);

    const { headers, config, teamCache, setTeamCache, matchupCache, setMatchupCache } = useContext(FantasyFootballContext);

    useEffect(() => {
        if (!matchupCache || !matchupCache[week]) {
            setLoading(true);
            axios.get("/matchups", config).then((res: any) => {
                const allGames: Matchup[] = res.data.schedule.map((matchup: IMatchup) => new Matchup(matchup));
                var cache: { [week: number]: Matchup[] | undefined } = {};
                for (const matchup of allGames) {
                    if (matchup.matchupPeriodId in cache) {
                        cache[matchup.matchupPeriodId]?.push(matchup);
                    } else {
                        cache[matchup.matchupPeriodId] = [matchup];
                    }
                }
                setMatchupCache(cache);
                setLoading(false);
            });
        }
        if (!teamCache || !teamCache[week]) {
            setLoading(true);
            config.params.week = week;
            axios.get("/teams", config).then((res: any) => {
                setTeamCache({ ...teamCache, [week]: res.data.teams.map((team: ITeam) => new Team(team, week)) });
                setLoading(false);
            });
        }
    }, [loading, week]);

    return (
        <>
            <Layout>
                <Dropdown
                    list={matchupCache ? Array.from({ length: Math.max(...Object.keys(matchupCache!).map(Number)) }, (value, index) => index + 1) : []}
                    title={"Week"}
                    activeVar={week}
                    setVar={setWeek}
                ></Dropdown>

                {/*loading ? <SkeletonMatchup /> :*/ week > 0 ? <MatchupsTable matchups={matchupCache ? matchupCache[week] : []} teams={teamCache ? teamCache[week] : []} /> : <div></div>}
            </Layout>
        </>
    );
}
