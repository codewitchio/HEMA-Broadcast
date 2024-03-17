import React from 'react'
import GraphicFightercard from "../../../_components/graphics/GraphicFightercard"
import { FighterResult } from "../../../_helpers/InternalAPI"

// TODO: Add [data] folder for second param, figure out why JSON parse doesn't work on server
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