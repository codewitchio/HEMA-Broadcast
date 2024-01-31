import React from "react"
import { useParams } from "react-router-dom"
import GraphicFightercard from "../components/graphics/Fightercard"

// TODO: Create input types for each template
type InputFields = {
    name: string,
    club: string
}

function ConfigurePage() {
    const { template } = useParams()

    const [inputFields, setInputFields]: [InputFields, Function] = React.useState({ name: '', club: '' })

    // console.log(inputFields)

    return (
        <div className="page config-page">
            {/* <h2>Config - {template}</h2> */}
            <form className="config-input">
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
            <div className="config-graphics">
                {template == 'fightercard' ?
                    <GraphicFightercard name={inputFields.name} /> : ''
                }
            </div>
        </div>
    )
}

export default ConfigurePage