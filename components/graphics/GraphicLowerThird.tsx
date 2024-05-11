import React from 'react'
import '@/styles/graphics.css'
import { FormElementProps, GraphicProps } from '@/components/graphics/Graphics'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn-ui/form'
import { Input } from '@/components/shadcn-ui/input'

export function GraphicLowerThird(props: GraphicProps & { name: string, subtitle: string }) {
    const { name, subtitle } = props
    return (
        <div className='graphic graphic-lowerthird'>
            <span>{name || 'Name'}</span>
            <span className='card-secondary-text'>{subtitle || 'Subtitle'}</span>
        </div>
    )
}

export function GraphicLowerThirdForm(props: FormElementProps) {
    const { form } = props
    return (
        <>
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
        </>
    )
}
