import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dropdown from "../components/dropdown";
import { FantasyFootballContext } from "../components/FantasyFootballContext";
import Layout from "../components/Layout";
import MatchupsTable from "../components/MatchupsTable";
import TeamTable from "../components/TeamTable";
import { IMatchup, Matchup } from "../helpers/matchup";
import { ITeam, Team } from "../helpers/team";

export default function BoxScorePage() {
    const { week, matchupId } = useParams();
    const { teamCache, matchupCache } = useContext(FantasyFootballContext);

    const [matchup, setMatchup] = useState<Matchup>();
    const [homeTeam, setHomeTeam] = useState<Team>();

    if (teamCache && matchupCache && week && matchupId) {
        setMatchup(matchupCache[parseInt(week)]?.find((matchup) => matchup.id === parseInt(matchupId)));
        setHomeTeam(teamCache[parseInt(week)]?.find((team) => matchup?.home.teamId === team.id));
    }

    if (!matchupId) {
        return <div>Silly, you forgot the matchup id</div>;
    }

    return (
        <div className="flex">
            <p> hello</p>
            <TeamTable team={homeTeam} />
        </div>
    );
}
