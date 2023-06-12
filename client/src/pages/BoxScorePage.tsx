import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dropdown from "../components/dropdown";
import { FantasyFootballContext } from "../components/FantasyFootballContext";
import Layout from "../components/Layout";
import MatchupsTable from "../components/MatchupsTable";
import TeamTable from "../components/TeamTable";
import { Matchup } from "../helpers/matchup";
import { Team } from "../helpers/team";

export default function BoxScorePage() {
    const { week, matchupId } = useParams();
    const { teamCache, matchupCache, initCache } = useContext(FantasyFootballContext);

    const [matchup, setMatchup] = useState<Matchup>();
    const [homeTeam, setHomeTeam] = useState<Team>();
    const [awayTeam, setAwayTeam] = useState<Team>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if ((!teamCache || !matchupCache) && week) {
            setLoading(true);
            initCache(parseInt(week)).then((doneLoading) => {
                setLoading(!doneLoading);
            });
        } else {
            setLoading(false);
        }
        if (!loading && teamCache && matchupCache && week && matchupId) {
            const matchup = matchupCache[parseInt(week)]?.find((matchup) => matchup.id === parseInt(matchupId));
            const homeTeam = teamCache[parseInt(week)]?.find((team) => matchup?.home.teamId === team.id);
            const awayTeam = teamCache[parseInt(week)]?.find((team) => matchup?.away.teamId === team.id);
            setMatchup(matchup);
            setHomeTeam(homeTeam);
            setAwayTeam(awayTeam);
        }
    }, [loading]);

    if (!matchupId) {
        return <div>Silly, you forgot the matchup id</div>;
    }

    //TODO Fix bye week stats
    return (
        <Layout>
            <div className="flex">
                <div className="flex flex-col m-10 w-2/5">
                    <h1 className="flex justify-center font-bold text-2xl mb-5">{homeTeam?.name}</h1>
                    <TeamTable team={homeTeam} boxScore={matchup?.home} />
                </div>
                <div className="flex w-1/5"></div>
                <div className="flex flex-col m-10 w-2/5">
                    <h1 className="flex justify-center font-bold text-2xl mb-5">{awayTeam?.name}</h1>
                    <TeamTable team={awayTeam} boxScore={matchup?.away} />
                </div>
            </div>
        </Layout>
    );
}
