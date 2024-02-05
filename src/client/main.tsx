import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Frontpage from "./pages/Frontpage"
import ConfigurePage from "./pages/ConfigurePage"
import DefaultLayout from "./layout/DefaultLayout"
import GraphicLayout from "./layout/GraphicLayout"
import GraphicPage from "./pages/GraphicPage"
import About from "./pages/About"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // TODO: Remove StrictMode when building for production
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<GraphicLayout />}>
                    <Route exact path="/graphic/:template/:data" element={<GraphicPage />} />
                </Route>
                <Route element={<DefaultLayout />}>
                    <Route exact path="/" element={<Frontpage />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/config/:template" element={<ConfigurePage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
