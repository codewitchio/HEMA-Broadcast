"use client"
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import { FormInterface } from './FormInterface'
import FighterSearchBox from '../FighterSearchBox'
import { FighterResult } from '@/lib/InternalAPI'
import React from 'react'
import { FighterContext } from '../FighterProvider'
import { Switch } from '../ui/switch'


export class FighterCardForm implements FormInterface {
    public FormSchema = z.object({
        isRed: z.boolean()
    })

    public DefaultValues = {
        isRed: false,
    }

    public FormElement = (props: { form: UseFormReturn<any> }) => {
        const { form } = props
        const { selectedFighters, setSelectedFighters, setSelectedRating } = React.useContext(FighterContext)

        const setSelectedFightersWrapper = (fighters: FighterResult[]) => {
            setSelectedFighters(fighters)
            if (fighters.length === 0) {
                setSelectedRating(null)
            }
        }
        return (
            <>
                <h2 className='text-2xl text-center'>Search HEMA Ratings</h2>
                <FighterSearchBox setSelectedFighters={setSelectedFightersWrapper} selectedFighters={selectedFighters} numberOfSelections={1} includeRating={true} />
                {selectedFighters[0] && selectedFighters[0].ratings ? (
                    <select name="rating" onChange={(e) => setSelectedRating(selectedFighters[0].ratings?.[Number(e.target.value)])}>
                        <option value={-1}>Select a rating</option>
                        {Object.entries(selectedFighters[0].ratings).map(([index, rating]) =>
                            <option key={index} value={index}>{rating.ratingCategoryName}</option>
                        )}
                    </select>
                ) : ''}

                <form className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="isRed"
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>
                                    Colour
                                </FormLabel>
                                <FormControl>
                                    <Switch
                                        className='data-[state=checked]:bg-red-700'
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* TODO: Add manual input */}
                </form>
            </>

        )
    }
}