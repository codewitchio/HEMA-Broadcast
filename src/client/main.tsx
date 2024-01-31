import "./index.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Link } from "react-router-dom"

import Frontpage from "./pages/Frontpage"
import GraphicFightercard from "./components/graphics/Fightercard"
import ConfigurePage from "./pages/ConfigurePage"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // TODO: Remove StrictMode when building for production
    <React.StrictMode>
        <BrowserRouter>
            <div className="header"><h1><Link to="/">HEMA Broadcast</Link></h1></div>
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Frontpage />} />
                    <Route exact path="/config/:template" element={<ConfigurePage />} />
                    {/* TODO: Set dynamic path for graphics? */}
                    {/* <Route exact path="/graphic/fightercard" element={<GraphicFightercard />} /> */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            <div className="footer">
                {/* TODO: Move to about page? */}
                <div className="frontpage-credits">
                    Author: <a href="https://github.com/Aryuko/">Aryuko</a>, Code: <a href="https://github.com/Aryuko/HEMA-Broadcast">GitHub</a>
                </div>
            </div>
        </BrowserRouter>
    </React.StrictMode>,
)
