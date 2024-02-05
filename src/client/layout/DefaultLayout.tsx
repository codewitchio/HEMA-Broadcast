import "../index.css"
import 'overlayscrollbars/overlayscrollbars.css'

import { Link, Outlet } from "react-router-dom"

function DefaultLayout() {
    return (
        <div className="default-layout-root">
            <div className="header">
                <Link className="nav-primary" to="/">HEMA Broadcast</Link>
                <Link className="nav-secondary" to="/">Overlays</Link>
                <Link className="nav-secondary" to="/">About</Link>
            </div>
            <div className="content">
                <Outlet />
            </div>
            <div className="footer">
                {/* TODO: Move to about page? */}
                <div className="frontpage-credits">
                    Author: <a href="https://github.com/Aryuko/">Aryuko</a>, Code: <a href="https://github.com/Aryuko/HEMA-Broadcast">GitHub</a>
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout