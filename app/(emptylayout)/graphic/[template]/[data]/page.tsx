import React from 'react'
import GraphicFightercard, { GraphicFightercardProps } from "@/components/graphics/GraphicFightercard"
import GraphicLowerThird from '@/components/graphics/GraphicLowerThird'
import { GraphicLowerThirdProps } from '@/components/graphics/GraphicLowerThird'

function GraphicPage({ params }: { params: { template: string, data: string } }) {
    let formattedData: Object = params.data ? JSON.parse(decodeURIComponent(params.data)) : undefined
    let graphicElement: React.ReactElement = <div>Invalid data</div>

    if (formattedData) {
        switch (params.template) {
            case 'fightercard':
                graphicElement = <GraphicFightercard {...(formattedData as GraphicFightercardProps)} />
                break
            case 'lowerthird':
                graphicElement = <GraphicLowerThird {...(formattedData as GraphicLowerThirdProps)} />
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