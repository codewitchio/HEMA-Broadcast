import React from 'react'
import '@/styles/graphics.css'
import { FormElementProps, GraphicProps } from '@/components/graphics/Graphics'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn-ui/form'
import { Input } from '@/components/shadcn-ui/input'

export function GraphicCustom(props: GraphicProps & { markdown: string }) {
    const { markdown } = props
    return (
        <div className='graphic graphic-lowerthird noise backdrop'>
            <span>{markdown || ''}</span>
        </div>
    )
}

export function GraphicCustomForm(props: FormElementProps) {
    const { form } = props
    return (
        <>
            <h2 className='text-2xl text-center'>Manual input</h2>
            <FormField
                control={form.control}
                name="markdown"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Markdown</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter text here" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}
