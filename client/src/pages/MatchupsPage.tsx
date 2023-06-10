import { match } from "assert";
import axios from "axios";
import { useEffect, useState } from "react";
import Dropdown from "../components/dropdown";
import Layout from "../components/Layout";
import MatchupsTable from "../components/MatchupsTable";
import { IMatchup, Matchup } from "../helpers/matchup";
import { ITeam, Team } from "../helpers/team";

export default function MatchupsPage(matchupProps: IMatchupProps) {
    const [week, setWeek] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!matchupProps.matchupCache || !matchupProps.matchupCache[week]) {
            setLoading(true);
            axios.get("/matchups", matchupProps.config).then((res: any) => {
                const allGames: Matchup[] = res.data.schedule.map((matchup: IMatchup) => new Matchup(matchup));
                var cache: { [week: number]: Matchup[] | undefined } = {};
                for (const matchup of allGames) {
                    if (matchup.matchupPeriodId in cache) {
                        cache[matchup.matchupPeriodId]?.push(matchup);
                    } else {
                        cache[matchup.matchupPeriodId] = [matchup];
                    }
                }
                matchupProps.addToMatchupCache(cache);
                setLoading(false);
            });
        }
        if (!matchupProps.teamCache || !matchupProps.teamCache[week]) {
            setLoading(true);
            matchupProps.config.params.week = week;
            axios.get("/teams", matchupProps.config).then((res: any) => {
                matchupProps.addToTeamCache({ ...matchupProps.teamCache, [week]: res.data.teams.map((team: ITeam) => new Team(team, week)) });
                setLoading(false);
            });
        }
    }, [loading, week]);

    return (
        <Layout>
            <Dropdown
                list={matchupProps.matchupCache ? Array.from({ length: Math.max(...Object.keys(matchupProps.matchupCache!).map(Number)) }, (value, index) => index + 1) : []}
                title={"Week"}
                activeVar={week}
                setVar={setWeek}
            ></Dropdown>

            {
                /*loading ? <SkeletonMatchup /> :*/ week > 0 ? (
                    <MatchupsTable matchups={matchupProps.matchupCache ? matchupProps?.matchupCache[week] : []} teams={matchupProps.teamCache ? matchupProps.teamCache[week] : []} />
                ) : (
                    <div></div>
                )
            }
        </Layout>
    );
}

interface IMatchupProps {
    headers: { headers: string };
    config: { params: { leagueId: string; year: number; week: number }; headers: { headers: string } };
    matchupCache: { [week: number]: Matchup[] | undefined } | undefined;
    addToMatchupCache: (cache: { [week: number]: Matchup[] | undefined }) => void;
    teamCache: { [week: number]: Team[] | undefined } | undefined;
    addToTeamCache: (cache: { [week: number]: Team[] | undefined }) => void;
}
