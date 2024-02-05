import { useParams } from "react-router-dom"
import GraphicFightercard from "../components/graphics/GraphicFightercard"
import { FighterResult } from "../helpers/InternalAPI"

function GraphicPage() {
    const { template, data } = useParams()

    let formattedData: Object = JSON.parse(decodeURI(data))
    let graphicElement: React.ReactElement = <div>Invalid data</div>

    if (formattedData) {
        switch (template) {
            case 'fightercard':
                graphicElement = <GraphicFightercard {...(formattedData as FighterResult)} />
                break
            default:
                break
        }
    }

    return (
        graphicElement
    )
}

export default GraphicPage