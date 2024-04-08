import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
export interface FormInterface {
    FormSchema: z.ZodObject<any>,
    DefaultValues: Object,
    FormElement: (props: { form: UseFormReturn<any> }) => JSX.Element
}