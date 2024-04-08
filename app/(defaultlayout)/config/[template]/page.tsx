"use client"
import React from "react"
import copy from "copy-to-clipboard"
import GraphicFightercard from "@/components/graphics/GraphicFightercard"
import FighterSearchBox from "@/components/FighterSearchBox"
import { FighterResult, RatingResult } from "@/lib/InternalAPI"
import GraphicLowerThird, { GraphicLowerThirdProps } from "@/components/graphics/GraphicLowerThird"
import { GraphicFightercardProps } from '@/components/graphics/GraphicFightercard'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FormProvider, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"

function ConfigurePage({ params }: { params: { template: string } }) {
    const [selectedFighters, setSelectedFighters]: [Array<FighterResult>, Function] = React.useState([])
    const [selectedRating, setSelectedRating]: [RatingResult | null, Function] = React.useState(null)
    const [isRed, setIsRed]: [boolean, Function] = React.useState(false)

    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
    }, [])

    const setSelectedFightersWrapper = (fighters: FighterResult[]) => {
        setSelectedFighters(fighters)
        if (fighters.length === 0) {
            setSelectedRating(null)
            setIsRed(false)
        }
    }

    const formSchema = z.object({
        name: z.string(),
        subtitle: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subtitle: ""
        },
    })

    let configInput: React.ReactElement | undefined = undefined
    let graphicElement: React.ReactElement | undefined = undefined
    let graphicProps: Object = {}
    switch (params.template) {
        case 'fightercard':
            configInput = (
                <>
                    <h2>Search HEMA Ratings</h2>
                    <FighterSearchBox setSelectedFighters={setSelectedFightersWrapper} selectedFighters={selectedFighters} numberOfSelections={1} includeRating={true} />
                    {selectedFighters[0] && selectedFighters[0].ratings ? (
                        <select name="rating" onChange={(e) => setSelectedRating(selectedFighters[0].ratings?.[Number(e.target.value)])}>
                            <option value={-1}>Select a rating</option>
                            {Object.entries(selectedFighters[0].ratings).map(([index, rating]) =>
                                <option key={index} value={index}>{rating.ratingCategoryName}</option>
                            )}
                        </select>
                    ) : ''}
                    {selectedFighters[0] ? (
                        <label>
                            <span>Red</span>
                            <input type="checkbox" checked={isRed} onChange={() => setIsRed(!isRed)} />
                        </label>
                    ) : ''}
                    {/* TODO: Add manual input */}
                </>
            )
            graphicProps = { fighter: selectedFighters[0], selectedRating: selectedRating, isRed: isRed }
            graphicElement = <GraphicFightercard  {...(graphicProps as GraphicFightercardProps)} />
            break
        case 'lowerthird':
            configInput = (
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
            graphicProps = { name: form.watch('name'), subtitle: form.watch('subtitle'), isRed: isRed }
            graphicElement = <GraphicLowerThird {...(graphicProps as GraphicLowerThirdProps)} />
    }

    const URIEncodedData = encodeURI(JSON.stringify(graphicProps))
    const link = isClient ? `${window.location.hostname}:${window.location.port}/graphic/${params.template}/${URIEncodedData}` : ""
    const hasSelection: boolean = selectedFighters.length > 0
    // TODO: Add checks for all required inputs filled

    return (
        <div className="page page-config">
            <div className="config-input vertical-flex">
                <FormProvider {...form}>
                    {configInput}
                </FormProvider>
            </div>
            <div className="config-graphics vertical-flex">
                <h2>Preview</h2>
                {graphicElement}
                <h2>Export</h2>
                <div className="input-wrapper input-wrapper-shared input-button-left">
                    <button onClick={() => {
                        copy(link)
                    }} disabled={!hasSelection}>Copy link</button>
                    <input type="text" value={hasSelection ? link : ''} readOnly disabled={!hasSelection} />
                </div>
                <button disabled>Save as image (under construction)</button>
            </div>
        </div>
    )
}

export default ConfigurePage