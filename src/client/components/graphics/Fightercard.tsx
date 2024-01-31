import './Fightercard.css'

type GraphicFightercardProps = {
    name: string
}

function GraphicFightercard(props: GraphicFightercardProps) {
    let placeholder = "placeholder"
    return (
        <div className="graphic graphic-fightercard">
            <span>Name: {props.name}</span>
            <span>Club: {placeholder}</span>
            <span>Country: {placeholder}</span>
            <span>Main weapon: {placeholder}</span>
            <span>Rank: {placeholder}</span>
            <span>Wins: {placeholder}</span>
        </div>
    )
}

export default GraphicFightercard