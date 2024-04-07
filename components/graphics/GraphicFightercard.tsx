import React from 'react'
import { GetFlagEmoji } from '../../lib/GetFlagEmoji'
import { FighterResult, RatingResult } from '../../lib/InternalAPI'
import './graphics.css'

export type GraphicFightercardProps = { fighter: FighterResult, selectedRating: RatingResult | null, isRed: boolean }

function GraphicFightercard(props: GraphicFightercardProps) {
    const { fighter, selectedRating, isRed } = props
    return (
        <div className={`card-wrapper vertical-flex ${isRed ? ' red' : ''}`}>
            <div className='card-border'>
                <div className='graphic graphic-fightercard noise backdrop'>
                    {/* Fencer name */}
                    <h1 style={{ textAlign: "center", margin: '0' }}>
                        {fighter?.name || 'Fencer name'} {fighter?.countryCode && GetFlagEmoji(fighter?.countryCode)}
                    </h1>
                    {/* Club name */}
                    <div className='card-subtitle horizontal-flex card-secondary-text'>
                        {/* TODO: Fetch short name when length over 35 */}
                        <span>{fighter?.clubName || 'Fencer club'}</span>
                    </div>
                    {/* Rating name */}
                    <div className='card-subtitle horizontal-flex'>
                        <h4>
                            {selectedRating?.ratingCategoryName || 'Rating name'}
                        </h4>
                    </div>
                    {/* Rating and rank */}
                    <div style={{ margin: '0 auto' }}>
                        <span className='card-secondary-text'>Rank: </span>
                        <span>{selectedRating?.rank || '(rank)'}</span>
                        <span className='card-secondary-text'> Rating: </span>
                        <span>{selectedRating?.weightedRating.toFixed(1) || '(rating)'}</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default GraphicFightercard