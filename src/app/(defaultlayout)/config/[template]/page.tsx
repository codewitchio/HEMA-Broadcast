"use client"
import React from "react"
import GraphicFightercard from "../../../_components/graphics/GraphicFightercard"
import FighterSearchBox from "../../../_components/FighterSearchBox"
import { FighterResult, RatingResult } from "../../../_helpers/InternalAPI"
import copy from "copy-to-clipboard"
import GraphicLowerThird, { GraphicLowerThirdProps } from "../../../_components/graphics/GraphicLowerThird"
import { GraphicFightercardProps } from '../../../_components/graphics/GraphicFightercard'

// TODO: Create input types for each template
type InputFields = {
    name: string,
    club: string
}

function ConfigurePage({ params }: { params: { template: string } }) {
    // TODO: Create input types for each template
    const [inputFields, setInputFields]: [Object, Function] = React.useState({})
    const [selectedFighters, setSelectedFighters]: [Array<FighterResult>, Function] = React.useState([])
    const [selectedRating, setSelectedRating]: [RatingResult | null, Function] = React.useState(null)
    const [isRed, setIsRed]: [boolean, Function] = React.useState(false)

    const setSelectedFightersWrapper = (fighters: FighterResult[]) => {
        setSelectedFighters(fighters)
        if (fighters.length === 0) {
            setSelectedRating(null)
            setIsRed(false)
        }
    }

    let configInput: React.ReactElement | undefined = undefined
    let graphicElement: React.ReactElement | undefined = undefined
    let graphicProps: Object = {}
    let formattedData: Object = {}
    switch (params.template) {
        case 'fightercard':
            configInput = (
                <>
                    <h2>Search HEMA Ratings</h2>
                    <FighterSearchBox setSelectedFighters={setSelectedFightersWrapper} selectedFighters={selectedFighters} numberOfSelections={1} includeRating={true} />
                    {selectedFighters[0] && selectedFighters[0].ratings ? (
                        <select name="rating" onChange={(e) => setSelectedRating(selectedFighters[0].ratings?.[Number(e.target.value)])}>
                            <option value={-1}>Select a rating</option>
                            {Object.entries(selectedFighters[0].ratings).map(([index, rating]) =>
                                <option key={index} value={index}>{rating.ratingCategoryName}</option>
                            )}
                        </select>
                    ) : ''}
                    {selectedFighters[0] ? (
                        <label>
                            <span>Red</span>
                            <input type="checkbox" checked={isRed} onChange={() => setIsRed(!isRed)} />
                        </label>
                    ) : ''}
                    {/* TODO: Add manual input */}
                </>
            )
            graphicProps = { fighter: selectedFighters[0], selectedRating: selectedRating, isRed: isRed }
            graphicElement = <GraphicFightercard  {...(graphicProps as GraphicFightercardProps)} />
            formattedData = encodeURI(JSON.stringify(graphicProps))
            break
        case 'lowerthird':
            configInput = (
                <>
                    TODO: Implement
                </>
            )
            graphicProps = { name: "Name Surname", subtitle: "Subtitle", isRed: isRed }
            graphicElement = <GraphicLowerThird {...(graphicProps as GraphicLowerThirdProps)} />
            formattedData = encodeURI(JSON.stringify(graphicProps))
    }

    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
    }, [])

    let link = isClient ? `${window.location.hostname}:${window.location.port}/graphic/${params.template}/${formattedData}` : ""
    let hasSelection: boolean = selectedFighters.length > 0
    // TODO: Add checks for all required inputs filled

    return (
        <div className="page page-config">
            <div className="config-input vertical-flex">
                {configInput}
                {/* TODO: Hide by default? And fill with data */}
                <h2>Manual input</h2>
                <form className="config-manual-input vertical-flex">
                    {Object.entries(inputFields).map(([key, value], index) => {
                        let formattedKey: string = key[0].toUpperCase() + key.substring(1)
                        return (
                            <div className="input-wrapper" key={index}>
                                <label htmlFor={key}>{formattedKey}</label>
                                <input type="text" name={key} placeholder={formattedKey} value={value} onChange={(e) => {
                                    setInputFields({ ...inputFields, [e.target.name as keyof InputFields]: e.target.value as string })
                                }} />
                            </div>
                        )
                    })}
                </form>
            </div>
            <div className="config-graphics vertical-flex">
                <h2>Preview</h2>
                {graphicElement}
                <h2>Export</h2>
                <div className="input-wrapper input-wrapper-shared input-button-left">
                    <button onClick={() => {
                        copy(link)
                    }} disabled={!hasSelection}>Copy link</button>
                    <input type="text" value={hasSelection ? link : ''} readOnly disabled={!hasSelection} />
                </div>
                <button disabled>Save as image (under construction)</button>
            </div>
        </div>
    )
}

export default ConfigurePage