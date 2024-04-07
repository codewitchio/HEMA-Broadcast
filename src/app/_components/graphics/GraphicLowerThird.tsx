import React from 'react'
import './graphics.css'

export type GraphicLowerThirdProps = { name: string, subtitle: string, isRed: boolean }

function GraphicLowerThird(props: GraphicLowerThirdProps) {
    const { name, subtitle, isRed } = props
    return (
        <div className={`card-wrapper vertical-flex ${isRed ? ' red' : ''}`}>
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