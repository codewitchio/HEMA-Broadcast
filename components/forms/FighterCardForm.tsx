"use client"
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import { FormInterface } from './FormInterface'
import FighterSearchBox from '../FighterSearchBox'
import React from 'react'
import { FighterContext } from '../FighterProvider'
import { Switch } from '../ui/switch'
import { ColorPicker, Colors } from './ColorPicker'


export class FighterCardForm implements FormInterface {
    public FormSchema = z.object({
        glow: z.boolean(),
        color: z.nativeEnum(Colors)
    })

    public DefaultValues = {
        glow: true,
        color: Colors.NEUTRAL
    }

    public FormElement = (props: { form: UseFormReturn<any> }) => {
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
}