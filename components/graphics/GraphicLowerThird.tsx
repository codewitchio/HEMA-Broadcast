import React from 'react'
import '@/styles/graphics.css'
import { ColorPicker } from '../ColorPicker'
import { FormElementProps, GraphicProps } from '@/components/graphics/Graphics'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn-ui/form'
import { Input } from '@/components/shadcn-ui/input'
import { Switch } from '@/components/shadcn-ui/switch'


export function GraphicLowerThird(props: GraphicProps & { name: string, subtitle: string }) {
    const { name, subtitle, color, glow } = props
    return (
        <div className={`card-wrapper vertical-flex ${color} ${glow && 'box-glow'}`}>
            <div className='card-border'>
                <div className='graphic graphic-lowerthird noise backdrop'>
                    <span>{name || 'Name'}</span>
                    <span className='card-secondary-text'>{subtitle || 'Subtitle'}</span>
                </div>
            </div>
        </div>
    )
}

export function GraphicLowerThirdForm(props: FormElementProps) {
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
