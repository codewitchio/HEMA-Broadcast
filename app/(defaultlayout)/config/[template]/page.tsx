"use client"
import React from "react"
import copy from "copy-to-clipboard"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FighterContext } from "@/components/FighterProvider"
import { Input } from "@/components/shadcn-ui/input"
import { Button } from "@/components/shadcn-ui/button"
import { toast } from "sonner"
import { GetGraphicInfo, GraphicPropsWithFighter } from "@/components/graphics/Graphics"
import { ColorPicker } from "@/components/ColorPicker"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/shadcn-ui/form"
import { Switch } from "@/components/shadcn-ui/switch"

function ConfigurePage({ params }: { params: { template: string } }) {
    const { selectedFighters, selectedRating } = React.useContext(FighterContext)

    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
    }, [])

    const graphic = GetGraphicInfo(params.template)
    if (!graphic) {
        return (
            <div className="page page-config">
                Invalid url
            </div>
        )
    }
    const form = useForm<z.infer<typeof graphic.formSchema>>({
        resolver: zodResolver(graphic.formSchema),
        defaultValues: graphic.defaultFormValues,
    })

    // Watch all names in the form schema
    const graphicProps = Object.fromEntries(Object.keys(graphic.formSchema.shape).map((name: string) => [name, form.watch(name)]))
    graphicProps.fighter = selectedFighters[0]
    graphicProps.selectedRating = selectedRating
    /* TODO: Clean up fighter/rating prop when moving to direct form values */


    const URIEncodedData = encodeURI(JSON.stringify(graphicProps))
    const link = isClient ? `${window.location.hostname}:${window.location.port}/graphic/${params.template}/${URIEncodedData}` : ""
    // TODO: Add checks for all required inputs filled

    return (
        <div className="page page-config">
            <div className="config-input vertical-flex">
                <Form {...form}>
                    <div className="space-y-4">
                        <graphic.formElement form={form} />
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
                    </div>
                </Form>
            </div>
            <div className="config-graphics vertical-flex">
                <h2 className="text-2xl text-center">Preview</h2>
                <div className={`card-wrapper vertical-flex ${graphicProps.color} ${graphicProps.glow && 'glow'}`}>
                    <div className='card-border'>
                        <graphic.graphicElement {...(graphicProps as GraphicPropsWithFighter)} />
                    </div>
                </div>
                <h2 className="text-2xl text-center">Export</h2>
                <Input type="text" value={link} readOnly />
                <Button variant={"outline"} onClick={() => {
                    copy(link)
                    toast("Link copied", { description: "Paste the link into a browser source in OBS", duration: 2500 })
                }}>Copy link</Button>
                <Button variant={"outline"} disabled>Save as image (under construction)</Button>
            </div>
        </div>
    )
}

export default ConfigurePage