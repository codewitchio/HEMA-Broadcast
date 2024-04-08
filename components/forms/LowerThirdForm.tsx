"use client"
import { z } from 'zod'
import { Button } from '../ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { UseFormReturn } from 'react-hook-form'
import { FormInterface } from './FormInterface'

export class LowerThirdForm implements FormInterface {
    public FormSchema = z.object({
        name: z.string(),
        subtitle: z.string()
    })

    public DefaultValues = {
        name: "",
        subtitle: ""
    }

    public FormElement = (props: { form: UseFormReturn<any> }) => {
        const { form } = props
        return (
            <form className="space-y-8">
                <h2>Manual input</h2>
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
                <Button type="submit">Submit</Button>
            </form>
        )
    }
}