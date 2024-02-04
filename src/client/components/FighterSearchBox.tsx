// import './FighterSearch.css'

import React from "react"
import { FighterResult, FighterSearch, FighterSearchResultCombined } from "../helpers/InternalAPI"
import { InputLoadingIcon } from './InputLoadingIcon'
import { GetFlagEmoji } from "../helpers/GetFlagEmoji"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import AnimateHeight from 'react-animate-height'

const typingTimeoutDuration = 350
const animationDuration = 250

type SearchResultRowProps = {
    fighter: FighterResult,
    selectFighter: Function,
    highlight?: boolean
}

function SearchResultRow(props: SearchResultRowProps) {
    return (
        <div className={`fighter-search-results-row ${props.highlight ? 'highlight' : ''}`} tabIndex={0} role="button" onClick={(e) => {
            props.selectFighter(props.fighter)
        }} onKeyDown={(e) => {
            if (e.key === "Enter") {
                e.preventDefault()
                props.selectFighter(props.fighter);
                (e.target as HTMLDivElement).blur()
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                let endOfList = !e.currentTarget.nextSibling
                if (endOfList) {
                    e.currentTarget.parentNode?.firstElementChild?.nextSibling && (e.currentTarget.parentNode?.firstElementChild?.nextSibling as HTMLDivElement).focus()
                } else {
                    e.currentTarget.nextSibling && (e.currentTarget.nextSibling as HTMLDivElement).focus()
                }
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault()
                let startOfList = e.currentTarget.previousSibling &&
                    (e.currentTarget.previousSibling as HTMLDivElement).classList.contains("fighter-search-results-header")
                if (startOfList) {
                    e.currentTarget.parentNode?.lastElementChild && (e.currentTarget.parentNode?.lastElementChild as HTMLDivElement).focus()
                } else (
                    e.currentTarget.previousSibling && (e.currentTarget.previousSibling as HTMLDivElement).focus()
                )
            }
        }}>
            <span>{GetFlagEmoji(props.fighter.countryCode)}</span>
            <span>{props.fighter.name}</span>
            <span className="text-grey right">#{props.fighter.id}</span>
        </div>
    )
}

type FighterSearchBox = {
    numberOfSelections?: number
}

// TODO: Add prop for allowed number of fighters to pick
function FighterSearchBox(props: FighterSearchBox) {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue]: [string, Function] = React.useState('')
    const [inputFocused, setInputFocused]: [boolean, Function] = React.useState(false)
    const [isLoading, setIsLoading]: [boolean, Function] = React.useState(false)
    const [searchResult, setSearchResult]: [FighterSearchResultCombined | undefined, Function] = React.useState()
    const [searchResultsHeight, setSearchResultsHeight]: [number, Function] = React.useState<number>(0)
    const searchResultsElement = React.useRef<HTMLDivElement | null>(null)

    const [selectedFighters, setSelectedFighters]: [Array<FighterResult>, Function] = React.useState([])


    // const [focusedSearchResult, setFocusedSearchResult]: [number]

    function selectFighter(fighter: FighterResult): void {
        if (!props.numberOfSelections || selectedFighters.length < props.numberOfSelections) {
            setSelectedFighters(selectedFighters.concat([fighter]))
            setSearchResult()
            setInputValue('')
            inputRef.current && inputRef.current.focus()
        }
    }

    function unselectFighter(fighter: FighterResult): void {
        setSelectedFighters(selectedFighters.filter((f) => f.id !== fighter.id))
    }

    // Typing timer and search
    let typingTimeout: React.MutableRefObject<NodeJS.Timeout | undefined> = React.useRef()
    React.useEffect(() => {
        clearTimeout(typingTimeout.current)

        if (inputValue != '' && inputValue.length > 2) {
            setIsLoading(true)
            typingTimeout.current = setTimeout(() => {
                if (inputValue != searchResult?.searchTerm) {
                    FighterSearch(inputValue).then((FighterSearchResults: FighterSearchResultCombined): void => {
                        setIsLoading(false)
                        setSearchResult(FighterSearchResults)
                        // console.log(FighterSearchResults)
                    })
                } else {
                    setIsLoading(false)
                }
            }, typingTimeoutDuration)
        } else {

        }
    }, [inputValue])

    // Animate search results on change
    React.useEffect(() => {
        const element = searchResultsElement.current as HTMLDivElement

        const resizeObserver = new ResizeObserver(() => {
            setSearchResultsHeight(element.clientHeight)
        })

        resizeObserver.observe(element)

        return () => resizeObserver.disconnect()
    }, [])

    const hasSelection = selectedFighters.length > 0
    const showHeader = searchResult && (searchResult.matches.length > 0 || inputValue.length > 0)

    return (
        <form className="fighter-search-box">
            <div className="input-wrapper">
                <input className={`fighter-search-input ${showHeader ? 'showHeader' : ''}`} type="text" name="name" placeholder="Search for a name" ref={inputRef} value={inputValue} onChange={(e) => {
                    setInputValue(e.target.value as string)
                }} onFocus={(e) => {
                    setInputFocused(true)
                }} onBlur={(e) => {
                    setInputFocused(false)
                }} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        searchResultsElement.current?.children.item(1) && (searchResultsElement.current?.children.item(1) as HTMLDivElement).click()
                        e.preventDefault()
                    }
                    if (e.key === 'ArrowDown' || e.key === 'Tab') {
                        e.preventDefault()
                        searchResultsElement.current?.children.item(2) && (searchResultsElement.current?.children.item(2) as HTMLDivElement).focus()
                    }
                    if (e.key === 'ArrowUp') {
                        e.preventDefault()
                        searchResultsElement.current?.lastChild && (searchResultsElement.current?.lastChild as HTMLDivElement).focus()
                    }
                }} disabled={!!props.numberOfSelections && selectedFighters.length >= props.numberOfSelections} />
                <InputLoadingIcon visible={isLoading} />
                <OverlayScrollbarsComponent tabIndex={-1} element="div" className={`fighter-search-results ${!showHeader ? 'showHeader' : ''}`} options={{ scrollbars: { autoHide: 'scroll', autoHideDelay: 500 } }} defer>
                    <AnimateHeight duration={animationDuration} contentRef={searchResultsElement} height={searchResultsHeight} disableDisplayNone contentClassName="auto-content">
                        {showHeader ? (
                            <div className="fighter-search-results-header text-grey" tabIndex={-1} >
                                {`${searchResult && (searchResult.matches.length)} matches found`}
                            </div>
                        ) : ''}
                        {searchResult && searchResult.matches.map((fighter: FighterResult, index: number) =>
                            <SearchResultRow key={fighter.id} highlight={index === 0 && inputFocused} fighter={fighter} selectFighter={selectFighter} />)
                        }
                    </AnimateHeight>
                </OverlayScrollbarsComponent>
            </div>
            {hasSelection && props.numberOfSelections ? (
                <div className="fighter-search-selected-count text-grey">{`${selectedFighters.length}/${props.numberOfSelections} selected`}</div>
            ) : ''}
            <div className="fighter-search-selected-list">
                {hasSelection ? (selectedFighters.map((fighter: FighterResult) =>
                    <div className="fighter-search-selected-list-item" key={fighter.id}>
                        <span key={fighter.id}>{GetFlagEmoji(fighter.countryCode) + " " + fighter.name}</span>
                        <i className="fa-solid fa-xmark" onClick={e => unselectFighter(fighter)} />
                    </div>
                )) : ''}
            </div>
        </form>
    )
}

export default FighterSearchBox