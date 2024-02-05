import { GetFlagEmoji } from '../../helpers/GetFlagEmoji'
import { FighterResult } from '../../helpers/InternalAPI'
import './Fightercard.css'

function GraphicFightercard(props: FighterResult) {
    let placeholder = "Under construction"
    return (
        <div className="graphic graphic-fightercard">
            <div>
                <span className='text-grey'>Name</span>
                <span>{props.name}</span>
            </div>
            <div>
                <span className='text-grey'>Club</span>
                <span>{props.clubName}</span>
            </div>
            <div>
                <span className='text-grey'>Country</span>
                <span>{props.countryName && props.countryCode ? props.countryName + " " + GetFlagEmoji(props.countryCode) : ''}</span>
            </div>
            <div>
                <span className='text-grey'>Rank</span>
                <span>{placeholder}</span>
            </div>
            <div>
                <span className='text-grey'>Wins</span>
                <span>{placeholder}</span>
            </div>
        </div>
    )
}

export default GraphicFightercard