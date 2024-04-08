"use client"
import React from "react"
import copy from "copy-to-clipboard"
import { FormProvider, UseFormReturn, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import GraphicFightercard from "@/components/graphics/GraphicFightercard"
import GraphicLowerThird, { GraphicLowerThirdProps } from "@/components/graphics/GraphicLowerThird"
import { GraphicFightercardProps } from '@/components/graphics/GraphicFightercard'
import { LowerThirdForm } from "@/components/forms/LowerThirdForm"
import { FormInterface } from "@/components/forms/FormInterface"
import { FighterCardForm } from "@/components/forms/FighterCardForm"
import { FighterContext } from "@/components/FighterProvider"

function ConfigurePage({ params }: { params: { template: string } }) {
    const { selectedFighters, selectedRating } = React.useContext(FighterContext)

    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
    }, [])

    let ConfigForm!: FormInterface
    let form!: UseFormReturn<any>
    let graphicElement: React.ReactElement | undefined = undefined
    let graphicProps: Object = {}
    switch (params.template) {
        case 'fightercard':
            ConfigForm = React.useMemo(() => new FighterCardForm(), [params.template])
            form = useForm<z.infer<typeof ConfigForm.FormSchema>>({
                resolver: zodResolver(ConfigForm.FormSchema),
                defaultValues: ConfigForm.DefaultValues,
            })
            graphicProps = { fighter: selectedFighters[0], selectedRating: selectedRating, isRed: form.watch('isRed') }
            graphicElement = <GraphicFightercard  {...(graphicProps as GraphicFightercardProps)} />
            break
        case 'lowerthird':
        default:
            ConfigForm = React.useMemo(() => new LowerThirdForm(), [params.template])
            form = useForm<z.infer<typeof ConfigForm.FormSchema>>({
                resolver: zodResolver(ConfigForm.FormSchema),
                defaultValues: ConfigForm.DefaultValues,
            })
            graphicProps = { name: form.watch('name'), subtitle: form.watch('subtitle'), isRed: form.watch('isRed') } // Hmm still needs check
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
                <h2 className="text-2xl text-center">Preview</h2>
                {graphicElement}
                <h2 className="text-2xl text-center">Export</h2>
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