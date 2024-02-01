// import './FighterSearch.css'

import React from "react"
import { FighterResult, FighterSearch, FighterSearchMock, FighterSearchResult } from "../helpers/InternalAPI"
import { InputLoadingIcon } from './InputLoadingIcon'
import { GetFlagEmoji } from "../helpers/GetFlagEmoji"

const typingTimeoutDuration = 350

type SearchResultRowProps = {
    exactMatch: boolean,
    fighter: FighterResult
}

function SearchResultRow(props: SearchResultRowProps) {
    return (
        <div className="fighter-search-results-row">
            <span className="fighter-search-results-row-flag">{GetFlagEmoji(props.fighter.countryCode)}</span>
            <span>{props.fighter.name}</span>
            <span className="text-grey right">#{props.fighter.id}</span>
        </div>
    )
}

function FighterSearchBox() {
    const [inputValue, setInputValue]: [string, Function] = React.useState('')
    const [isLoading, setIsLoading]: [boolean, Function] = React.useState(false)
    const [searchResult, setSearchResult]: [FighterSearchResult | undefined, Function] = React.useState()

    let typingTimeout: React.MutableRefObject<NodeJS.Timeout | undefined> = React.useRef()

    React.useEffect(() => {
        clearTimeout(typingTimeout.current)

        if (inputValue != '') {
            setIsLoading(true)
            typingTimeout.current = setTimeout(() => {
                if (inputValue != searchResult?.searchTerm) {
                    FighterSearchMock(inputValue).then((FighterSearchResults: FighterSearchResult): void => {
                        setIsLoading(false)
                        setSearchResult(FighterSearchResults)
                        console.log(FighterSearchResults)
                    })
                } else {
                    setIsLoading(false)
                }
            }, typingTimeoutDuration)
        } else {

        }
    }, [inputValue])

    const hasMatches = searchResult && (searchResult.exactMatches.length > 0 || searchResult.fuzzyMatches.length > 0)

    return (
        <form className="fighter-search-box">
            <div className="input-wrapper">
                <input className={hasMatches ? 'hasMatches' : ''} type="text" name="name" placeholder="Search for a name" value={inputValue} onChange={(e) => {
                    setInputValue(e.target.value as string)
                }} />
                <InputLoadingIcon visible={isLoading} />
                <div className="fighter-search-results">
                    {hasMatches ? (searchResult.exactMatches.map((fighter: FighterResult) =>
                        <SearchResultRow key={fighter.id} exactMatch={true} fighter={fighter} />)
                    ) : ''}
                    {hasMatches ? (searchResult.fuzzyMatches.map((fighter: FighterResult) =>
                        <SearchResultRow key={fighter.id} exactMatch={false} fighter={fighter} />)
                    ) : ''}
                </div>
            </div>
        </form>
    )
}

export default FighterSearchBox