import React from 'react'
import { GetFlagEmoji } from '../../_helpers/GetFlagEmoji'
import { FighterResult, RatingResult } from '../../_helpers/InternalAPI'
import './Fightercard.css'

export type GraphicFightercardProps = FighterResult & { selectedRating: RatingResult | null } & { isRed: boolean }

function GraphicFightercard(props: GraphicFightercardProps) {
    return (
        <div className={`card-wrapper vertical-flex ${props.isRed ? ' red' : ''}`}>
            <div className='card-border'>
                <div className='graphic graphic-fightercard noise backdrop'>
                    {/* Fencer name */}
                    <h1 style={{ textAlign: "center", margin: '0' }}>
                        {props.name || 'Fencer name'} {props.countryCode && GetFlagEmoji(props.countryCode)}
                    </h1>
                    {/* Club name */}
                    <div className='card-subtitle horizontal-flex card-secondary-text'>
                        {/* TODO: Fetch short name when length over 35 */}
                        <span>{props.clubName || 'Fencer club'}</span>
                    </div>
                    {/* Rating name */}
                    <div className='card-subtitle horizontal-flex'>
                        <h4>
                            {props.selectedRating?.ratingCategoryName || 'Select a rating'}
                        </h4>
                    </div>
                    {/* Rating and rank */}
                    <div style={{ margin: '0 auto' }}>
                        <span className='card-secondary-text'>Rank: </span>
                        <span>{props.selectedRating?.rank || 'Select a rating'}</span>
                        <span className='card-secondary-text'> Rating: </span>
                        <span>{props.selectedRating?.weightedRating.toFixed(1) || 'Select a rating'}</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default GraphicFightercard