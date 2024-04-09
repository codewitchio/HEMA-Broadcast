import React from 'react'
import { GetFlagEmoji } from '@/lib/GetFlagEmoji'
import { FighterResult, RatingResult } from '@/lib/InternalAPI'
import '@/styles/graphics.css'
import { Colors } from '../forms/ColorPicker'

export type GraphicFightercardProps = { fighter: FighterResult, selectedRating: RatingResult | null, color: Colors, glow: boolean }

function GraphicFightercard(props: GraphicFightercardProps) {
    const { fighter, selectedRating, color, glow } = props
    return (
        <div className={`card-wrapper vertical-flex ${color === Colors.RED ? ' red' : ''} ${glow ? 'box-glow' : ''}`}>
            <div className='card-border'>
                <div className='graphic graphic-fightercard noise backdrop'>
                    {/* Fencer name */}
                    <h1 className='text-4xl text-center'>
                        {fighter?.name || 'Fencer name'} {fighter?.countryCode && GetFlagEmoji(fighter?.countryCode)}
                    </h1>
                    {/* Club name */}
                    <div className='card-subtitle horizontal-flex card-secondary-text'>
                        {/* TODO: Fetch short name when length over 35 */}
                        <span>{fighter?.clubName || 'Fencer club'}</span>
                    </div>
                    {/* Rating name */}
                    <div className='card-subtitle horizontal-flex'>
                        <h4 className='mt-6'>
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