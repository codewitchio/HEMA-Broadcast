import React from 'react'
import '@/styles/graphics.css'
import { ColorPicker } from '../ColorPicker'
import { FormElementProps, GraphicProps } from '@/components/graphics/Graphics'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn-ui/form'
import { Input } from '@/components/shadcn-ui/input'
import { Switch } from '@/components/shadcn-ui/switch'


export function GraphicCustom(props: GraphicProps & { markdown: string }) {
    const { markdown, color, glow } = props
    return (
        <div className={`card-wrapper vertical-flex ${color} ${glow && 'box-glow'}`}>
            <div className='card-border'>
                <div className='graphic graphic-lowerthird noise backdrop'>
                    <span>{markdown || ''}</span>
                </div>
            </div>
        </div>
    )
}

export function GraphicCustomForm(props: FormElementProps) {
    const { form } = props
    return (
        <form className="space-y-4">
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
