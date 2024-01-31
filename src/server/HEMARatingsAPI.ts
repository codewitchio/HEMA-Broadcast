import Credentials from "./credentials.json"

const APIUrl = 'https://hemaratingspublicapi.azurewebsites.net/api'

const DefaultOptions = {
    "method": 'GET',
    "headers": {
        "x-functions-key": Credentials.HEMARatingsAPIKey
    }
}

export async function FighterSearch(name: string): Promise<any> {
    return HEMARatingsAPIRequest(APIUrl + `/fighters/search/${name}`)
}

async function HEMARatingsAPIRequest(url: string): Promise<any> {
    return fetch(url, DefaultOptions).then((APIResponse): Promise<any> => {
        if (!APIResponse.ok) {
            throw new Error(`HTTP error! Status: ${APIResponse.status}`)
        }
        return APIResponse.json()
    })
}
