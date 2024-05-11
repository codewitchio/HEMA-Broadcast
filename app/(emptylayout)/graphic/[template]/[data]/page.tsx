"use client"
import React from 'react'
import '@/styles/graphics.css'
import { GetGraphicInfo, GraphicPropsWithFighter } from '@/components/graphics/Graphics'

const invalidElement = <div>Invalid data</div>
function GraphicPage({ params }: { params: { template: string, data: string } }) {
    let formattedData: GraphicPropsWithFighter = params.data ? JSON.parse(decodeURIComponent(params.data)) : undefined

    const graphic = GetGraphicInfo(params.template)
    if (!graphic || !formattedData) { return invalidElement }
    else {
        return (
            <div className={`card-wrapper vertical-flex noise ${formattedData.color} ${formattedData.glow && 'glow'}`}>
                <div className='card-border'>
                    <graphic.graphicElement {...formattedData} />
                </div>
            </div>
        )
    }
}

export default GraphicPage