import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dropdown from "../components/dropdown";
import Layout from "../components/Layout";
import MatchupsTable from "../components/MatchupsTable";
import TeamTable from "../components/TeamTable";
import { IMatchup, Matchup } from "../helpers/matchup";
import { ITeam, Team } from "../helpers/team";

export default function BoxScorePage(boxScoreProps: IBoxScoreProps) {
    const { matchupId } = useParams();

    if (!matchupId) {
        return <div>Silly, you forgot the matchup id</div>;
    }

    return (
        <div className="flex">
            <TeamTable team={boxScoreProps.teams?.find((team) => boxScoreProps.matchups?.find((matchup) => matchup.id === parseInt(matchupId))?.home.teamId === team.id)} />
        </div>
    );
}

interface IBoxScoreProps {
    matchups: Matchup[] | undefined;
    teams: Team[] | undefined;
}
