import express from "express"
import ViteExpress from "vite-express"

import "./HEMARatingsAPI.ts"
import { HEMARatingsFighterSearch } from "./HEMARatingsAPI.ts"

import 'dotenv/config'

if (!process.env.HEMARatingsAPIKey) {
    console.error("ERROR: HEMARatingsAPIKey not found, make sure to set up your .env")
    process.exit(1)
}

const app = express()

app.get("/hello", (req: any, res: any) => {
    res.send("Hello Vite + React + TypeScript!")
})

// http://localhost:3000/api/hemaratings/fighters/search/Einar
// TODO: Should I restrict this to only allow local requests?
app.get("/api/hemaratings/fighters/search/:name/:includeRating", (req: any, res: any) => {
    HEMARatingsFighterSearch(req.params.name, req.params.includeRating).then((FighterSearchResult): void => {
        res.send(FighterSearchResult)
    })
})
const port = 3001

ViteExpress.listen(app, port, () =>
    console.log(`Server is listening on port ${port}...`),
)

module.exports = app