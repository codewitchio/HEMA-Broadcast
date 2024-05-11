import React from 'react'
import { GetFlagEmoji } from '@/lib/GetFlagEmoji'
import '@/styles/graphics.css'
import FighterSearchBox from '@/components/FighterSearchBox'
import { FormElementProps, GraphicPropsWithFighter } from '@/components/graphics/Graphics'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/shadcn-ui/form'
import { Input } from '@/components/shadcn-ui/input'

export function GraphicFightercard(props: GraphicPropsWithFighter) {
    const { name, clubName, countryCode, ratingCategoryName, rank, weightedRating } = props
    return (
        <div className='graphic graphic-fightercard noise backdrop'>
            {/* Fencer name */}
            <h1 className='text-4xl text-center'>
                {name || 'Fencer name'} {countryCode && GetFlagEmoji(countryCode)}
            </h1>
            {/* Club name */}
            <div className='card-subtitle horizontal-flex card-secondary-text'>
                {/* TODO: Fetch short name when length over 35 */}
                <span>{clubName || 'Fencer club'}</span>
            </div>
            {/* Rating name */}
            <div className='card-subtitle horizontal-flex'>
                <h4 className='mt-6'>
                    {ratingCategoryName || 'Rating name'}
                </h4>
            </div>
            {/* Rating and rank */}
            <div style={{ margin: '0 auto' }}>
                <span className='card-secondary-text'>Rank: </span>
                <span>{rank || '(rank)'}</span>
                <span className='card-secondary-text'> Rating: </span>
                <span>{Number(weightedRating) ? weightedRating.toFixed(1) : '(rating)'}</span>
            </div>
        </div>
    )
}

export function GraphicFightercardForm(props: FormElementProps) {
    const { form } = props
    return (
        <>
            <h2 className='text-2xl text-center'>Search HEMA Ratings</h2>
            <FighterSearchBox numberOfSelections={1} includeRating={true} form={form} />
            {/* TODO: Make collapsible */}
            <h2 className='text-2xl text-center'>Manual input</h2>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="clubName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Club</FormLabel>
                        <FormControl>
                            <Input placeholder="Club" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                            <Input placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="ratingCategoryName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rating name</FormLabel>
                        <FormControl>
                            <Input placeholder="Rating name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="rank"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rank (number)</FormLabel>
                        <FormControl>
                            <Input placeholder="Rank" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="weightedRating"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rating  (number)</FormLabel>
                        <FormControl>
                            <Input placeholder="Rating" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}
