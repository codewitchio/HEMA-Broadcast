


"use client"
import * as React from "react"
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"

export enum Colors {
    NEUTRAL = "Neutral",
    BLUE = "Blue",
    RED = "Red"
}

type ColorPickerProps = {
    name: string,
    form: UseFormReturn<any>,
}

export const ColorPicker = (props: ColorPickerProps) => {
    const { name, form } = props
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex flex-col'>
                    <FormLabel>
                        Colour
                    </FormLabel>
                    <FormControl>
                        <RadioGroup defaultValue={field.value} onValueChange={field.onChange}>
                            {(Object.values(Colors)).map((color) => {
                                return (
                                    <div className="flex items-center space-x-2" key={color}>
                                        <RadioGroupItem value={color} id={color} />
                                        <Label htmlFor={color}>{color}</Label>
                                    </div>
                                )
                            })}
                        </RadioGroup>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}