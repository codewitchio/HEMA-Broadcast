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
ViteExpress.config({ mode: process.env.NODE_ENV as ("production" | "development" | undefined) })

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

ViteExpress.listen(app, Number(process.env.EXPRESS_PORT), () =>
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}...`),
)

module.exports = app