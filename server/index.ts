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
