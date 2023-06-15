import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Dropdown from "../components/dropdown";
import { FantasyFootballContext } from "../components/FantasyFootballContext";
import Layout from "../components/Layout";
import MatchupsTable from "../components/MatchupsTable";
import ScheduleTable from "../components/ScheduleTable";
import { Matchup } from "../helpers/matchup";
import { Team } from "../helpers/team";

export default function SchedulePage() {
    const [week, setWeek] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeTeam, setActiveTeam] = useState<Team>();
    const [teamMatchups, setTeamMatchups] = useState<Matchup[]>([]);

    const { headers, config, teamCache, setTeamCache, matchupCache, setMatchupCache, initCache } = useContext(FantasyFootballContext);

    useEffect(() => {
        //Run initial load for matchups and teams
        setLoading(true);
        initCache(week).then((doneLoading) => {
            setLoading(!doneLoading);
        });

        const teamMatchupsTemp: Matchup[] = [];
        if (matchupCache) {
            const maxWeek = Math.max(...Object.keys(matchupCache!).map(Number));
            for (var matchupWeek = 1; matchupWeek <= maxWeek; matchupWeek++) {
                setLoading(true);
                //Load each subsequent weeks teams
                initCache(matchupWeek).then((doneLoading) => {
                    setLoading(!doneLoading);
                });
                matchupCache[matchupWeek]?.map((matchup) => {
                    if (matchup.away.teamId === activeTeam?.id || matchup.home.teamId === activeTeam?.id) {
                        teamMatchupsTemp.push(matchup);
                    }
                });
            }
        }
        setTeamMatchups(teamMatchupsTemp);
    }, [loading, activeTeam]);

    return (
        <>
            <Layout>
                <Dropdown
                    list={teamCache ? teamCache[week]?.map((team) => team.abbrev) : []}
                    title={"Teams"}
                    activeVar={activeTeam?.abbrev}
                    setVar={(abbrev: string) => (teamCache ? setActiveTeam(teamCache[week]?.find((team) => team.abbrev === abbrev)) : setActiveTeam(undefined))}
                ></Dropdown>

                <ScheduleTable activeTeam={activeTeam} matchups={teamMatchups} teams={teamCache ? teamCache : {}} />
            </Layout>
        </>
    );
}
