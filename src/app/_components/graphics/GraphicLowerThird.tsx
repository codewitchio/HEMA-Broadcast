import React from 'react'
import './graphics.css'

export type GraphicLowerThirdProps = { name: string, subtitle: string, isRed: boolean }

function GraphicLowerThird(props: GraphicLowerThirdProps) {
    return (
        <div className={`card-wrapper vertical-flex ${props.isRed ? ' red' : ''}`}>
            <div className='card-border'>
                <div className='graphic graphic-lowerthird noise backdrop'>
                    <span>{props.name || 'Name'}</span>
                    <span className='card-secondary-text'>{props.subtitle || 'Subtitle'}</span>
                </div>
            </div>
        </div>
    )
}

export default GraphicLowerThird