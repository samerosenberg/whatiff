export default function Navbar() {
    return (
        <div className="navbar bg-black">
            <div className="navbar-start">
                <a className="font-bold ml-2 normal-case text-xl text-white">WhatIFF</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-white">
                    <li className="hover:bg-slate-400 rounded">
                        <a href="/teams">Teams</a>
                    </li>
                    <li tabIndex={0}>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li>
                                    <a>Submenu 1</a>
                                </li>
                                <li>
                                    <a>Submenu 2</a>
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
