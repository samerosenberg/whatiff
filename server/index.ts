import express, { Request } from "express";
import axios from "axios";
import leagueInfo from "../client/src/secrets.json";

const PORT = process.env.PORT || 3001;

const app = express();

// const headers = {
//     headers: {
//         Cookie:
//         Accept: "application/json",
//     },
// };
const baseURL: string = "https://fantasy.espn.com/apis/v3/games/ffl/seasons/";
const mid: string = "/segments/0/leagues/";

interface IRouteParams {
    leagueId: string;
    year: string;
}

function createRoute(leagueId: string, year: string, tail: string) {
    return baseURL + year + mid + leagueId + tail;
}

function api(req: Request, tail: string): Promise<any> {
    const leagueId = req.query.leagueId as string;
    const year = req.query.year as string;
    if (!leagueId) {
        return new Promise(() => {
            return { status: 400, statusMessage: "LeagueId was passed incorrectly" };
        });
    }
    if (!year) {
        return new Promise(() => {
            return { status: 400, statusMessage: "Year was passed incorrectly" };
        });
    }

    const route = createRoute(leagueId, year, tail);

    return axios
        .get(route, { headers: JSON.parse(req.headers.headers as string) })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
}

app.get("/login", (res, req) => {
    //Retrieve s2 and SWID
    axios.get(
        "https://registerdisney.go.com/jgc/v8/client/ESPN-ONESITE.WEB-PROD/guest/login?langPref=en-US&feature=no-password-reuse"
        //I believe this just uses {authorization: APIKEY ... }
    );

    //Get Leagues
    //Contains all preferences in a preferences list, type=9 seems to be fantasy league
    //leagueID = metaData.entry.groups[0].groupId
    //https://fan.api.espn.com/apis/v2/fans/%7B5CB419A7-9012-4C4C-B419-A790123C4CD4%7D?displayEvents=true&displayNow=true&displayRecs=true&displayHiddenPrefs=true&featureFlags=expandAthlete&featureFlags=isolateEvents&featureFlags=challengeEntries&recLimit=5&showAirings=buy%2Clive%2Creplay
});

app.get("/league/", (req, res) => {
    api(req, "?view=mSettings").then((response) => {
        res.send(response);
    });
});

app.get("/matchups", (req, res) => {
    api(req, "?view=mMatchupScore").then((response) => {
        res.send(response);
    });
});

app.get("/teams", (req, res) => {
    const week = req.query.week as string;
    api(req, `?scoringPeriodId=${week}&view=mRoster&view=mTeam`).then((response) => {
        res.send(response);
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
