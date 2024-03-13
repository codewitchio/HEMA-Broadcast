"use client"
import React from "react"
import { useParams } from "react-router-dom"
import GraphicFightercard from "../../../client/components/graphics/GraphicFightercard"
import FighterSearchBox from "../../../client/components/FighterSearchBox"
import { FighterResult } from "../../../client/helpers/InternalAPI"
import copy from "copy-to-clipboard"

// TODO: Create input types for each template
type InputFields = {
    name: string,
    club: string
}


function ConfigurePage(params: { template: string }) {
    const { template } = useParams()

    // TODO: https://stackoverflow.com/questions/70086856/create-object-based-on-types-typescript
    const [inputFields, setInputFields]: [InputFields, Function] = React.useState({ name: '', club: '' })
    const [selectedFighters, setSelectedFighters]: [Array<FighterResult>, Function] = React.useState([])

    let numberOfSelections: number | undefined = undefined
    let graphicElement: React.ReactElement | undefined = undefined
    let formattedData: Object = {}
    switch (template) {
        case 'fightercard':
            numberOfSelections = 1
            graphicElement = <GraphicFightercard {...selectedFighters[0]} />
            formattedData = encodeURI(JSON.stringify(selectedFighters[0]))
            break
    }

    let link: string = `${window.location.hostname}:${window.location.port}/graphic/${template}/${formattedData}`
    let hasSelection: boolean = selectedFighters.length === numberOfSelections

    return (
        <div className="page page-config">
            <div className="config-input vertical-flex">
                <h2>Search HEMA Ratings</h2>
                <FighterSearchBox setSelectedFighters={setSelectedFighters} selectedFighters={selectedFighters} numberOfSelections={numberOfSelections} />
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
                    <button onClick={(e) => {
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