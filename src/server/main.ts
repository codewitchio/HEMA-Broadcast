import express from "express"
import ViteExpress from "vite-express"

import "./HEMARatingsAPI.ts"
import { FighterSearch } from "./HEMARatingsAPI.ts"

const app = express()

app.get("/hello", (req: any, res: any) => {
    res.send("Hello Vite + React + TypeScript!")
})

// http://localhost:3000/api/hemaratings/fighters/search/Einar
app.get("/api/hemaratings/fighters/search/:name", (req: any, res: any) => {
    FighterSearch(req.params.name).then((FighterSearchResult): void => {
        res.send(FighterSearchResult)
    })
})

ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000..."),
)
