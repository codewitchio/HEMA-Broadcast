import { FighterResult, RatingResult } from "@/lib/InternalAPI"
import React, { ReactNode } from "react"

type FighterContextType = {
    selectedFighters: FighterResult[],
    setSelectedFighters: Function,
    selectedRating: RatingResult | undefined,
    setSelectedRating: Function
}

type FighterProviderProps = {
    children: ReactNode
}

export const FighterContext = React.createContext<FighterContextType>({
    selectedFighters: [],
    setSelectedFighters: () => { },
    selectedRating: undefined,
    setSelectedRating: () => { }
})

export function FighterProvider(props: FighterProviderProps) {
    const [selectedFighters, setSelectedFighters]: [Array<FighterResult>, Function] = React.useState([])
    const [selectedRating, setSelectedRating]: [RatingResult | undefined, Function] = React.useState(undefined)
    const value = { selectedFighters, setSelectedFighters, selectedRating, setSelectedRating }

    return (
        <FighterContext.Provider value={value}>
            {props.children}
        </FighterContext.Provider>
    )
}