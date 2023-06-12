import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { ITeam, Team } from "../helpers/team";
import Dropdown from "../components/dropdown";
import Layout from "../components/Layout";
import TeamTable, { SkeletonTeam } from "../components/TeamTable";
import { FantasyFootballContext } from "../components/FantasyFootballContext";

export default function TeamsPage(teamProps: ITeamProps) {
    const [activeTeam, setActiveTeam] = useState("");
    const [week, setWeek] = useState(0);
    const [loading, setLoading] = useState(true);

    const { headers, config, teamCache, setTeamCache, matchupCache, setMatchupCache, initCache } = useContext(FantasyFootballContext);

    useEffect(() => {
        if (!teamCache || !teamCache[week]) {
            setLoading(true);
            initCache(week).then((doneLoading) => setLoading(!doneLoading));
        }
    }, [activeTeam, week, loading]);

    return (
        <Layout>
            <Dropdown list={teamCache ? teamCache[week]?.map((team) => team.abbrev) : []} title={"Teams"} activeVar={activeTeam} setVar={setActiveTeam}></Dropdown>
            {activeTeam !== "" ? <Dropdown list={Array.from({ length: teamProps.maxWeek! }, (value, index) => index + 1)} title={"Week"} activeVar={week} setVar={setWeek}></Dropdown> : <></>}

            {loading ? <SkeletonTeam /> : activeTeam !== "" ? <TeamTable team={teamCache ? teamCache[week]?.find((team) => team.abbrev === activeTeam) : undefined} /> : <div></div>}
        </Layout>
    );
}

interface ITeamProps {
    maxWeek: number | undefined;
}
