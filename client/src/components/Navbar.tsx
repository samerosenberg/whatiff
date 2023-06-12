export default function Navbar() {
    return (
        <div className="navbar bg-black">
            <div className="navbar-start w-1/3">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a href="/teams">Teams</a>
                        </li>
                        <li>
                            <a>WhatIFF</a>
                            <ul className="p-2">
                                <li>
                                    <a>Max Points</a>
                                </li>
                                <li>
                                    <a>Schedule Change</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="/matchups">Matchups</a>
                        </li>
                    </ul>
                </div>
                <a className="font-bold ml-2 normal-case text-xl text-white">WhatIFF</a>
            </div>
            <div className="navbar-center w-1/3 justify-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-white">
                    <li className="hover:bg-slate-400 rounded">
                        <a href="/teams">Teams</a>
                    </li>
                    <li tabIndex={0}>
                        <details>
                            <summary className="hover:bg-slate-400 rounded">WhatIFF</summary>
                            <ul className="p-2 text-black">
                                <li>
                                    <a>Max Points</a>
                                </li>
                                <li>
                                    <a>Schedule Chane</a>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li className="hover:bg-slate-400 rounded">
                        <a href="/matchups">Matchups</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
