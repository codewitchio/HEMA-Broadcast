import 'overlayscrollbars/overlayscrollbars.css'

import { Outlet } from "react-router-dom"

function GraphicLayout() {
    return (
        <div className="graphic-layout-root">
            <Outlet />
        </div>
    )
}

export default GraphicLayout