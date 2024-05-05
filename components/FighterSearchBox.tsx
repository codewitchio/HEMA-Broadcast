import React from "react"
import { FighterResult, FighterSearch, FighterSearchResultCombined } from "@/lib/InternalAPI"
import { GetFlagEmoji } from "@/lib/GetFlagEmoji"
import { InputLoadingIcon } from './InputLoadingIcon'
import AnimateHeight from 'react-animate-height'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./shadcn-ui/select"
import { FighterContext } from "./FighterProvider"
import { ScrollArea } from "@/components/shadcn-ui/scroll-area"

const typingTimeoutDuration = 350
const animationDuration = 250

type SearchResultRowProps = {
    fighter: FighterResult,
    selectFighter: Function,
    highlight?: boolean
}

function SearchResultRow(props: SearchResultRowProps) {
    return (
        <div className={`fighter-search-results-row ${props.highlight ? 'highlight' : ''}`} tabIndex={0} role="button" onClick={() => {
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

type FighterSearchBoxProps = {
    numberOfSelections?: number,
    includeRating?: boolean
}

// TODO: Add prop for allowed number of fighters to pick
function FighterSearchBox(props: FighterSearchBoxProps) {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue]: [string, Function] = React.useState('')
    const [inputFocused, setInputFocused]: [boolean, Function] = React.useState(false)
    const [isLoading, setIsLoading]: [boolean, Function] = React.useState(false)
    const [searchResult, setSearchResult]: [FighterSearchResultCombined | undefined, Function] = React.useState()
    const [searchResultsHeight, setSearchResultsHeight]: [number, Function] = React.useState<number>(0)
    const searchResultsElement = React.useRef<HTMLDivElement | null>(null)

    const { selectedFighters, setSelectedFighters, setSelectedRating } = React.useContext(FighterContext)
    const { numberOfSelections, includeRating } = props


    function selectFighter(fighter: FighterResult): void {
        if (!numberOfSelections || selectedFighters.length < numberOfSelections) {
            setSelectedFighters(selectedFighters.concat([fighter]))
            setSearchResult()
            setInputValue('')
            inputRef.current && inputRef.current.focus()
        }

        if (selectedFighters.length === 0) {
            setSelectedRating(null)
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
                    FighterSearch(inputValue, includeRating).then((FighterSearchResults: FighterSearchResultCombined): void => {
                        setIsLoading(false)
                        setSearchResult(FighterSearchResults)
                    })
                } else {
                    setIsLoading(false)
                }
            }, typingTimeoutDuration)
        } else {
            setSearchResult(undefined)
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
        <div className="fighter-search-box vertical-flex">
            <div className="input-wrapper">
                <input className={`fighter-search-input ${showHeader ? 'showHeader' : ''}`} type="text" name="name" placeholder="Search for a name" ref={inputRef} value={inputValue} autoComplete="off" onChange={(e) => {
                    setInputValue(e.target.value as string)
                }} onFocus={() => {
                    setInputFocused(true)
                }} onBlur={() => {
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
                }} disabled={!!numberOfSelections && selectedFighters.length >= numberOfSelections} />
                <InputLoadingIcon visible={isLoading} />
                <ScrollArea tabIndex={-1} className={`fighter-search-results ${!showHeader && 'showHeader'}`}>
                    <AnimateHeight duration={animationDuration} contentRef={searchResultsElement} height={searchResultsHeight} disableDisplayNone contentClassName="auto-content">
                        {showHeader ? (
                            <div className="fighter-search-results-header text-grey" tabIndex={-1} >
                                {`${searchResult && (searchResult.matches.length)} results`}
                            </div>
                        ) : ''}
                        {searchResult && searchResult.matches.map((fighter: FighterResult, index: number) =>
                            <SearchResultRow key={fighter.id} highlight={index === 0 && inputFocused} fighter={fighter} selectFighter={selectFighter} />)
                        }
                    </AnimateHeight>
                </ScrollArea>
            </div>
            <div className="fighter-search-selected-list">
                {hasSelection && (selectedFighters.map((fighter: FighterResult) =>
                    <div className="fighter-search-selected-list-item" key={fighter.id}>
                        <span key={fighter.id}>{GetFlagEmoji(fighter.countryCode) + " " + fighter.name}</span>
                        <i className="fa-solid fa-xmark" onClick={() => unselectFighter(fighter)} />
                    </div>
                ))}
                <div className="fighter-search-selected-count text-grey ms-auto">{`${selectedFighters.length}/${numberOfSelections} selected`}</div>
            </div>
            {selectedFighters[0] && selectedFighters[0].ratings?.length ? (
                <Select onValueChange={(e) => setSelectedRating(selectedFighters[0].ratings?.[Number(e)])}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a rating" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(selectedFighters[0].ratings).map(([index, rating]) =>
                            <SelectItem key={index} value={index}>{rating.ratingCategoryName}</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            ) : selectedFighters[0] && (
                <Select disabled>
                    <SelectTrigger>
                        <SelectValue placeholder="Fencer has no ratings" />
                    </SelectTrigger>
                </Select>
            )}
        </div>
    )
}

export default FighterSearchBox