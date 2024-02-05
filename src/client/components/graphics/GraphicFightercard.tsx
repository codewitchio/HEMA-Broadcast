import { GetFlagEmoji } from '../../helpers/GetFlagEmoji'
import { FighterResult } from '../../helpers/InternalAPI'
import './Fightercard.css'

function GraphicFightercard(props: FighterResult) {
    let placeholder = "Under construction"
    return (
        <div className="graphic graphic-fightercard">
            <span>Name: {props.name}</span>
            <span>Club: {props.clubName}</span>
            <span>Country: {props.countryName && props.countryCode ? props.countryName + " " + GetFlagEmoji(props.countryCode) : ''}</span>
            <span>Rank: {placeholder}</span>
            <span>Wins: {placeholder}</span>
        </div>
    )
}

export default GraphicFightercard