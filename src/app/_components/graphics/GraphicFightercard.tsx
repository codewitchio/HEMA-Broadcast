import React from 'react'
import { GetFlagEmoji } from '../../_helpers/GetFlagEmoji'
import { FighterResult, RatingResult } from '../../_helpers/InternalAPI'
import './Fightercard.css'

export type GraphicFightercardProps = FighterResult & { selectedRating: RatingResult | null }

function GraphicFightercard(props: GraphicFightercardProps) {
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
                            <span>{props.clubName || 'Select a fencer'}</span>
                        </div>
                        <div>
                            <span className='card-secondary-text'>Country</span>
                            <span>{props.countryName && props.countryCode ? props.countryName + " " + GetFlagEmoji(props.countryCode) : 'Select a fencer'}</span>
                        </div>
                        <div>
                            <span className='card-secondary-text'>Rank</span>
                            <span>{props.selectedRating?.ratingCategoryName || 'Select a rating'}</span>
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