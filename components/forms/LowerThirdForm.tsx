"use client"
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { UseFormReturn } from 'react-hook-form'
import { FormInterface } from './FormInterface'
import { Switch } from '../ui/switch'
import { ColorPicker, Colors } from './ColorPicker'

export class LowerThirdForm implements FormInterface {
    public FormSchema = z.object({
        name: z.string(),
        subtitle: z.string(),
        glow: z.boolean(),
        color: z.nativeEnum(Colors)
    })

    public DefaultValues = {
        name: "",
        subtitle: "",
        glow: true,
        color: Colors.NEUTRAL
    }

    public FormElement = (props: { form: UseFormReturn<any> }) => {
        const { form } = props
        return (
            <form className="space-y-4">
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
                    name="subtitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subtitle</FormLabel>
                            <FormControl>
                                <Input placeholder="Subtitle" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <h2 className='text-2xl text-center'>Graphic settings</h2>
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
            </form>
        )
    }
}