import React from "react"
import { useParams } from "react-router-dom"
import GraphicFightercard from "../components/graphics/Fightercard"
import FighterSearchBox from "../components/FighterSearchBox"

// TODO: Create input types for each template
type InputFields = {
    name: string,
    club: string
}

function ConfigurePage() {
    const { template } = useParams()

    // TODO: https://stackoverflow.com/questions/70086856/create-object-based-on-types-typescript
    const [inputFields, setInputFields]: [InputFields, Function] = React.useState({ name: '', club: '' })

    return (
        <div className="page config-page">
            <div className="config-input">
                <h2>Search names</h2>
                <FighterSearchBox />
                <h2>Manual input</h2>
                {/* TODO: Hide by default? */}
                <form>
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
            <div className="config-graphics">
                {template == 'fightercard' ?
                    <GraphicFightercard name={inputFields.name} /> : ''
                }
            </div>
        </div>
    )
}

export default ConfigurePage