const APIUrl = "/api"

export type FighterSearchResultCombined = {
    searchTerm: string,
    matches: Array<FighterResult>
}

export type FighterSearchResult = {
    searchTerm: string,
    exactMatches: Array<FighterResult>,
    fuzzyMatches: Array<FighterResult>
}

export type FighterResult = {
    id: number,
    name: string,
    countryCode: string,
    countryName: string,
    clubId: number,
    clubName: string,
    ratings: Array<RatingResult> | null
}

export type RatingResult = {
    ratingCategoryId: number,
    ratingCategoryName: string,
    month: string,
    weightedRating: number,
    rank: number
}

export function FighterSearchMock(_name: string, includeRating: boolean = false): Promise<FighterSearchResult> {
    return new Promise<any>((resolve, _reject) => {
        setTimeout(() => {
            if (includeRating) {
                resolve({
                    "searchTerm": "Einar", "exactMatches": [{
                        "id": 10369, "name": "Einar Lundgren", "countryCode": "SE", "countryName": "Sweden", "clubId": 64, "clubName": "Stockholmspolisens Idrottsförening Fäktning", "ratings": [{
                            "ratingCategoryId": 1,
                            "ratingCategoryName": "Longsword",
                            "month": "2024-04-07T12:57:10.325Z",
                            "weightedRating": 1500,
                            "rank": 10 - 0
                        }]
                    }], "fuzzyMatches": [{ "id": 11594, "name": "Einar Schiöth", "countryCode": "IS", "countryName": "Iceland", "clubId": null, "clubName": null, "ratings": null }, { "id": 516, "name": "Einar Hellvik", "countryCode": "NO", "countryName": "Norway", "clubId": 20, "clubName": "Fekteklubben Frie Duellister", "ratings": null }, { "id": 3572, "name": "Andreas Reinartz", "countryCode": "DE", "countryName": "Germany", "clubId": 299, "clubName": "Brückenschlag", "ratings": null }, {
                        "id": 3575, "name": "Olga Reinartz", "countryCode": "DE", "countryName": "Germany", "clubId": 299, "clubName": "Brückenschlag", "ratings": [{
                            "ratingCategoryId": 1,
                            "ratingCategoryName": "Longsword",
                            "month": "2024-04-07T12:57:10.325Z",
                            "weightedRating": 1500,
                            "rank": 10 - 0
                        }]
                    }]
                })
            } else {
                resolve({ "searchTerm": "Einar", "exactMatches": [{ "id": 10369, "name": "Einar Lundgren", "countryCode": "SE", "countryName": "Sweden", "clubId": 64, "clubName": "Stockholmspolisens Idrottsförening Fäktning", "ratings": null }], "fuzzyMatches": [{ "id": 11594, "name": "Einar Schiöth", "countryCode": "IS", "countryName": "Iceland", "clubId": null, "clubName": null, "ratings": null }, { "id": 516, "name": "Einar Hellvik", "countryCode": "NO", "countryName": "Norway", "clubId": 20, "clubName": "Fekteklubben Frie Duellister", "ratings": null }, { "id": 10369, "name": "Einar Lundgren", "countryCode": "SE", "countryName": "Sweden", "clubId": 64, "clubName": "Stockholmspolisens Idrottsförening Fäktning", "ratings": null }, { "id": 3572, "name": "Andreas Reinartz", "countryCode": "DE", "countryName": "Germany", "clubId": 299, "clubName": "Brückenschlag", "ratings": null }, { "id": 3575, "name": "Olga Reinartz", "countryCode": "DE", "countryName": "Germany", "clubId": 299, "clubName": "Brückenschlag", "ratings": null }] })
            }
        }, 100)
    })
}

export function FighterSearch(name: string, includeRating: boolean = false): Promise<FighterSearchResultCombined> {
    return InternalAPIRequest(`${APIUrl}/fighters/search/${name}/${includeRating}`).then((JSONResponse: FighterSearchResult) => {
        return {
            searchTerm: JSONResponse.searchTerm,
            matches: JSONResponse.exactMatches.concat(JSONResponse.fuzzyMatches)
        }
    })
}

async function InternalAPIRequest(url: string): Promise<any> {
    return fetch(url).then((APIResponse): Promise<any> => {
        if (!APIResponse.ok) {
            throw new Error(`HTTP error! Status: ${APIResponse.status}`)
        }
        return APIResponse.json()
    })
}