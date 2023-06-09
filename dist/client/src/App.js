"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./App.css");
const axios_1 = __importDefault(require("axios"));
const secrets_json_1 = __importDefault(require("./secrets.json"));
axios_1.default.defaults.withCredentials = true;
function App() {
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    const [teams, setTeams] = (0, react_1.useState)();
    const [league, setLeague] = (0, react_1.useState)();
    const [headers, setHeaders] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const headers = { headers: { Cookie: `espn_s2=${secrets_json_1.default.espn_s2}; SWID=${secrets_json_1.default.swid};` } };
        if (!league && headers) {
            axios_1.default.get("/league", { params: { leagueId: secrets_json_1.default.leagueID, year: 2022 }, headers: headers }).then((res) => {
                setLeague(res.data);
                setLoading(false);
            });
        }
    }, []);
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "App" }, { children: "Loading ..." }));
    }
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "App" }, { children: (0, jsx_runtime_1.jsx)("header", Object.assign({ className: "App-header" }, { children: (0, jsx_runtime_1.jsx)("p", { children: league }) })) })));
}
exports.default = App;
