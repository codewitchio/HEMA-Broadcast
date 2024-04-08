"use client"
import React from "react"
import copy from "copy-to-clipboard"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import GraphicFightercard from "@/components/graphics/GraphicFightercard"
import FighterSearchBox from "@/components/FighterSearchBox"
import { FighterResult, RatingResult } from "@/lib/InternalAPI"
import GraphicLowerThird, { GraphicLowerThirdProps } from "@/components/graphics/GraphicLowerThird"
import { GraphicFightercardProps } from '@/components/graphics/GraphicFightercard'
import { LowerThirdForm } from "@/components/forms/LowerThirdForm"
import { FormInterface } from "@/components/forms/FormInterface"

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

    let ConfigForm!: FormInterface
    switch (params.template) {
        case 'fightercard':
            ConfigForm = React.useMemo(() => new LowerThirdForm(), [params.template])
            break
        case 'lowerthird':
            ConfigForm = React.useMemo(() => new LowerThirdForm(), [params.template])
            break
    }

    const form = useForm<z.infer<typeof ConfigForm.FormSchema>>({
        resolver: zodResolver(ConfigForm.FormSchema),
        defaultValues: ConfigForm.DefaultValues,
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
            configInput = <ConfigForm.FormElement form={form} /> // Always the same
            graphicProps = { name: form.watch('name'), subtitle: form.watch('subtitle'), isRed: isRed } // Hmm still needs check
            graphicElement = <GraphicLowerThird {...(graphicProps as GraphicLowerThirdProps)} /> // Still needs check
    }

    const URIEncodedData = encodeURI(JSON.stringify(graphicProps))
    const link = isClient ? `${window.location.hostname}:${window.location.port}/graphic/${params.template}/${URIEncodedData}` : ""
    const hasSelection: boolean = selectedFighters.length > 0
    // TODO: Add checks for all required inputs filled

    return (
        <div className="page page-config">
            <div className="config-input vertical-flex">
                <FormProvider {...form}>
                    <ConfigForm.FormElement form={form} />
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