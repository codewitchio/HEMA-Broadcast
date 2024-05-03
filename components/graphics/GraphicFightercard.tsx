import React from 'react'
import { GetFlagEmoji } from '@/lib/GetFlagEmoji'
import '@/styles/graphics.css'
import FighterSearchBox from '@/components/FighterSearchBox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn-ui/form'
import { ColorPicker } from '@/components/ColorPicker'
import { Switch } from '@/components/shadcn-ui/switch'
import { FormElementProps, GraphicPropsWithFighter } from '@/components/graphics/Graphics'

export function GraphicFightercard(props: GraphicPropsWithFighter) {
    const { fighter, selectedRating, color, glow } = props
    return (
        <div className={`card-wrapper vertical-flex ${color} ${glow && 'box-glow'}`}>
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

export function GraphicFightercardForm(props: FormElementProps) {
    const { form } = props
    return (
        <>
            <h2 className='text-2xl text-center'>Search HEMA Ratings</h2>
            <FighterSearchBox numberOfSelections={1} includeRating={true} />
            <h2 className='text-2xl text-center'>Graphic settings</h2>
            <form className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="glow"
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>
                                Glow
                            </FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <ColorPicker name={'color'} form={form} />
                {/* TODO: Add manual input */}
            </form>
        </>

    )
}
