"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
// const headers = {
//     headers: {
//         Cookie:
//         Accept: "application/json",
//     },
// };
const baseURL = "https://fantasy.espn.com/apis/v3/games/ffl/seasons/";
const mid = "/segments/0/leagues/";
function createRoute(leagueId, year, tail) {
    return baseURL + year + mid + leagueId + tail;
}
function api(req, tail) {
    const leagueId = req.query.leagueId;
    const year = req.query.year;
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
    const stuff = JSON.parse(req.headers.headers);
    console.log(stuff);
    return axios_1.default
        .get(route, { headers: JSON.parse(req.headers.headers) })
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
    const week = req.query.week;
    api(req, `?scoringPeriodId=${week}&view=mRoster&view=mTeam`).then((response) => {
        res.send(response);
    });
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
