import React from 'react'
import { GetFlagEmoji } from '../../_helpers/GetFlagEmoji'
import { FighterResult } from '../../_helpers/InternalAPI'
import './Fightercard.css'

function GraphicFightercard(props: FighterResult) {
    let placeholder = "Under construction"
    return (
        <div className='card-wrapper vertical-flex'>
            <div className='card-border'>
                <div className="graphic graphic-fightercard noise backdrop">
                    <h1 style={{ textAlign: "center" }}>
                        {props.name || 'Fencer name'}
                    </h1>
                    <div className='card-list vertical-flex'>
                        <div>
                            <span className='card-secondary-text'>Club</span>
                            <span>{props.clubName || 'No data'}</span>
                        </div>
                        <div>
                            <span className='card-secondary-text'>Country</span>
                            <span>{props.countryName && props.countryCode ? props.countryName + " " + GetFlagEmoji(props.countryCode) : 'No data'}</span>
                        </div>
                        <div>
                            <span className='card-secondary-text'>Rank</span>
                            <span>{placeholder}</span>
                        </div>
                        <div>
                            <span className='card-secondary-text'>Wins</span>
                            <span>{placeholder}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GraphicFightercard