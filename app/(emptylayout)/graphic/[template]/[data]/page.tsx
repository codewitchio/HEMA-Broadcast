"use client"
import React from 'react'
import { GetGraphicInfo, GraphicProps, GraphicPropsWithFighter } from '@/components/graphics/Graphics'

const invalidElement = <div>Invalid data</div>
function GraphicPage({ params }: { params: { template: string, data: string } }) {
    let formattedData: Object = params.data ? JSON.parse(decodeURIComponent(params.data)) : undefined
    let graphicElement: React.ReactElement = <div>Invalid data</div>

    const graphic = GetGraphicInfo(params.template)
    if (!graphic || !formattedData) { return invalidElement }
    else {
        return <graphic.graphicElement {...(formattedData as GraphicPropsWithFighter)} />
    }
}

export default GraphicPage