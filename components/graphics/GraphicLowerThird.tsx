import React from 'react'
import '@/styles/graphics.css'
import { Colors } from '../forms/ColorPicker'

export type GraphicLowerThirdProps = { name: string, subtitle: string, color: Colors, glow: boolean }

function GraphicLowerThird(props: GraphicLowerThirdProps) {
    const { name, subtitle, color, glow } = props
    console.log(glow)
    return (
        <div className={`card-wrapper vertical-flex ${color} ${glow && 'box-glow'}`}>
            <div className='card-border'>
                <div className='graphic graphic-lowerthird noise backdrop'>
                    <span>{name || 'Name'}</span>
                    <span className='card-secondary-text'>{subtitle || 'Subtitle'}</span>
                </div>
            </div>
        </div>
    )
}

export default GraphicLowerThird