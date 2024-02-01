// import './FighterSearch.css'

import React from "react"
import { FighterResult, FighterSearch, FighterSearchMock, FighterSearchResult } from "../helpers/InternalAPI"
import { InputLoadingIcon } from './InputLoadingIcon'
import { GetFlagEmoji } from "../helpers/GetFlagEmoji"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"

const typingTimeoutDuration = 350

type SearchResultRowProps = {
    exactMatch: boolean,
    fighter: FighterResult,
    selectFighter: Function
}

function SearchResultRow(props: SearchResultRowProps) {
    return (
        <div className="fighter-search-results-row" onClick={(e) => {
            props.selectFighter(props.fighter)
        }}>
            <span>{GetFlagEmoji(props.fighter.countryCode)}</span>
            <span>{props.fighter.name}</span>
            <span className="text-grey right">#{props.fighter.id}</span>
        </div>
    )
}

// TODO: Add prop for allowed number of fighters to pick
function FighterSearchBox() {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue]: [string, Function] = React.useState('')
    const [isLoading, setIsLoading]: [boolean, Function] = React.useState(false)
    const [searchResult, setSearchResult]: [FighterSearchResult | undefined, Function] = React.useState()
    const [selectedFighters, setSelectedFighters]: [Array<FighterResult>, Function] = React.useState([])

    function selectFighter(fighter: FighterResult): void {
        setSelectedFighters(selectedFighters.concat([fighter]))
        setSearchResult()
        setInputValue('')
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    function unselectFighter(fighter: FighterResult): void {
        setSelectedFighters(selectedFighters.filter((f) => f.id !== fighter.id))
    }

    let typingTimeout: React.MutableRefObject<NodeJS.Timeout | undefined> = React.useRef()

    React.useEffect(() => {
        clearTimeout(typingTimeout.current)

        if (inputValue != '' && inputValue.length > 2) {
            setIsLoading(true)
            typingTimeout.current = setTimeout(() => {
                if (inputValue != searchResult?.searchTerm) {
                    FighterSearch(inputValue).then((FighterSearchResults: FighterSearchResult): void => {
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
    const matchesCount = searchResult && (searchResult.exactMatches.length + searchResult?.fuzzyMatches.length)
    const hasSelection = selectedFighters.length > 0
    const showHeader = searchResult && (hasMatches || inputValue.length > 0)

    return (
        <form className="fighter-search-box">
            <div className="input-wrapper">
                <input className={showHeader ? 'showHeader' : ''} type="text" name="name" placeholder="Search for a name" ref={inputRef} value={inputValue} onChange={(e) => {
                    setInputValue(e.target.value as string)
                }} />
                <InputLoadingIcon visible={isLoading} />
                <OverlayScrollbarsComponent element="div" className={`fighter-search-results ${!showHeader ? 'showHeader' : ''}`} options={{ scrollbars: { autoHide: 'scroll', autoHideDelay: 500 } }} defer>
                    {showHeader ? (
                        <div className="fighter-search-results-header text-grey" >
                            {`${matchesCount} matches found`}
                        </div>
                    ) : ''}
                    {hasMatches ? (searchResult.exactMatches.map((fighter: FighterResult) =>
                        <SearchResultRow key={fighter.id} exactMatch={true} fighter={fighter} selectFighter={selectFighter} />)
                    ) : ''}
                    {hasMatches ? (searchResult.fuzzyMatches.map((fighter: FighterResult) =>
                        <SearchResultRow key={fighter.id} exactMatch={false} fighter={fighter} selectFighter={selectFighter} />)
                    ) : ''}
                </OverlayScrollbarsComponent>
            </div>
            <div className="fighter-search-selected-list">
                {hasSelection ? (selectedFighters.map((fighter: FighterResult) =>
                    <div className="fighter-search-selected-list-item">
                        <span key={fighter.id}>{GetFlagEmoji(fighter.countryCode) + " " + fighter.name}</span>
                        <i className="fa-solid fa-xmark" onClick={e => unselectFighter(fighter)} />
                    </div>
                )) : ''}
            </div>
        </form>
    )
}

export default FighterSearchBox