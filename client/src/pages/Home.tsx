import { useState } from "react";
import Layout from "../components/Layout";

export default function Home(homeProps: IHomeProps) {
    const [leagueId, setLeagueId] = useState("");
    const [swid, setSWID] = useState("");
    const [espns2, setESPNS2] = useState("");
    const [success, setSuccess] = useState<boolean>();

    return (
        <Layout className="items-center">
            <h1 className="font-bold text-5xl"> Welcome to WhatIFF!</h1>
            <div className="text-lg mt-10 mx-48 text-center">
                <p className="mt-2">
                    This is an ESPN Fantasy Football dashboard where you can view all your league
                    statistics and more!
                </p>
                <p className="mt-2">
                    For public leagues simply enter your league ID below and hit connect.
                </p>
                <p className="mt-2">
                    For private leagues, you will need to enter your league ID as well as your users
                    SWID and espn_s2 cookie values.
                </p>
                <p className="mt-2">
                    Once you have connected feel free to check out your team, their schedule, or the
                    matchups page. For some more fun check out the WhatIFF pages to see how well
                    your team would have performed if say they scored their "max points" each week.
                    Or check out what your record would have been had you had another members
                    schedule.
                </p>
            </div>
            <div className="text-lg mt-10 mx-48 text-center">
                <div className="form-control max-w-xs">
                    <label className="label">
                        <span className="label-text">League ID:</span>{" "}
                    </label>
                    <input
                        type="text"
                        placeholder="League ID"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setLeagueId(e.target.value)}
                    />
                </div>
                <div className="form-control max-w-xs">
                    <label className="label">
                        <span className="label-text">SWID:</span>{" "}
                    </label>
                    <input
                        type="text"
                        placeholder="SWID"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setSWID(e.target.value)}
                    />
                </div>
                <div className="form-control max-w-xs">
                    <label className="label">
                        <span className="label-text">ESPN S2:</span>{" "}
                    </label>
                    <input
                        type="text"
                        placeholder="ESPN S2"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setESPNS2(e.target.value)}
                    />
                </div>
            </div>
            <button
                className="btn btn-success mt-10"
                onClick={() =>
                    homeProps.login(leagueId, swid, espns2).then((res) => setSuccess(res))
                }
            >
                Connect
            </button>
            {success ? (
                <p>You successfully connected to the league {leagueId} </p>
            ) : (
                <p>Connection failed</p>
            )}
        </Layout>
    );
}

interface IHomeProps {
    login: (leagueId: string, swid: string, espns2: string) => Promise<boolean>;
}
