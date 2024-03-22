import React from 'react'
import GraphicFightercard, { GraphicFightercardProps } from "../../../_components/graphics/GraphicFightercard"

// TODO: Add [data] folder for second param, figure out why JSON parse doesn't work on server
function GraphicPage({ params }: { params: { template: string, data: string } }) {
    let formattedData: Object = params.data ? JSON.parse(decodeURI(params.data)) : undefined
    let graphicElement: React.ReactElement = <div>Invalid data</div>

    if (formattedData) {
        switch (params.template) {
            case 'fightercard':
                graphicElement = <GraphicFightercard {...(formattedData as GraphicFightercardProps)} />
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