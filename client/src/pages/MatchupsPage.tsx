import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Dropdown from "../components/dropdown";
import { FantasyFootballContext } from "../components/FantasyFootballContext";
import Layout from "../components/Layout";
import MatchupsTable from "../components/MatchupsTable";

export default function MatchupsPage() {
    const [week, setWeek] = useState(0);
    const [loading, setLoading] = useState(true);

    const { headers, config, teamCache, setTeamCache, matchupCache, setMatchupCache, initCache } =
        useContext(FantasyFootballContext);

    useEffect(() => {
        setLoading(true);
        initCache(week).then((doneLoading: boolean) => {
            setLoading(!doneLoading);
        });
    }, [loading, week]);

    return (
        <>
            <h1 className="ml-5 mt-5 font-bold text-4xl text-center">Matchups</h1>
            <Layout>
                <Dropdown
                    list={
                        matchupCache
                            ? Array.from(
                                  { length: Math.max(...Object.keys(matchupCache!).map(Number)) },
                                  (value, index) => index + 1
                              )
                            : []
                    }
                    title={"Week"}
                    activeVar={week}
                    setVar={setWeek}
                ></Dropdown>

                {
                    /*loading ? <SkeletonMatchup /> :*/ week > 0 ? (
                        <MatchupsTable
                            matchups={matchupCache ? matchupCache[week] : []}
                            teams={teamCache ? teamCache[week] : []}
                        />
                    ) : (
                        <div></div>
                    )
                }
            </Layout>
        </>
    );
}
