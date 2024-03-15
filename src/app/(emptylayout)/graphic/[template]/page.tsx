import React from 'react'
import GraphicFightercard from "../../../_components/graphics/GraphicFightercard"
import { FighterResult } from "../../../_helpers/InternalAPI"

function GraphicPage({ params }: { params: { template: string, data: string } }) {
    let formattedData: Object = params.data ? JSON.parse(decodeURI(params.data)) : undefined
    let graphicElement: React.ReactElement = <div>Invalid data</div>

    if (formattedData) {
        switch (params.template) {
            case 'fightercard':
                graphicElement = <GraphicFightercard {...(formattedData as FighterResult)} />
                break
            default:
                break
        }
    }

    return (
        graphicElement
    )
}

export default GraphicPage