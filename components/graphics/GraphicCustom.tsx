import React from 'react'
import '@/styles/graphics.css'
import { FormElementProps, GraphicProps } from '@/components/graphics/Graphics'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn-ui/form'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import { Textarea } from '@/components/ui/textarea'

const placeholderMarkdown = "# Example\n You can fill this with anything you want \n- including lists\n## Subtitles\n1. and more!"

export function GraphicCustom(props: GraphicProps & { markdown: string }) {
    const { markdown } = props
    const html = DOMPurify.sanitize(marked.parse(markdown || placeholderMarkdown) as string)

    return (
        <div className='graphic graphic-custom noise backdrop' dangerouslySetInnerHTML={{ __html: html }} />
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
                        <FormLabel>Supports <a href='https://commonmark.org/help/'>Markdown</a></FormLabel>
                        <FormControl>
                            <Textarea placeholder="Enter text here" {...field} className='h-60' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}
