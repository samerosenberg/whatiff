import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { ITeam, Team } from "../helpers/team";
import Dropdown from "../components/dropdown";
import Layout from "../components/Layout";
import TeamTable, { SkeletonTeam } from "../components/TeamTable";

export default function TeamsPage(teamProps: ITeamProps) {
    const [activeTeam, setActiveTeam] = useState("");
    const [week, setWeek] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if ((!teamProps.cache || !teamProps.cache[week]) && teamProps.headers) {
            setLoading(true);
            teamProps.config.params.week = week;
            axios.get("/teams", teamProps.config).then((res: any) => {
                teamProps.addToCache({ ...teamProps.cache, [week]: res.data.teams.map((team: ITeam) => new Team(team, week)) });
                setLoading(false);
            });
        }
    }, [activeTeam, week, loading]);

    return (
        <Layout>
            <Dropdown list={teamProps.cache ? teamProps.cache[week]?.map((team) => team.abbrev) : []} title={"Teams"} activeVar={activeTeam} setVar={setActiveTeam}></Dropdown>
            <Dropdown list={[1, 2, 3]} title={"Week"} activeVar={week} setVar={setWeek}></Dropdown>

            {loading ? <SkeletonTeam /> : activeTeam !== "" ? <TeamTable team={teamProps.cache ? teamProps?.cache[week]?.find((team) => team.abbrev === activeTeam) : undefined} /> : <div></div>}
        </Layout>
    );
}

interface ITeamProps {
    headers: { headers: string };
    config: { params: { leagueId: string; year: number; week: number }; headers: { headers: string } };
    cache: { [week: number]: Team[] | undefined } | undefined;
    addToCache: (cache: { [week: number]: Team[] | undefined }) => void;
}
