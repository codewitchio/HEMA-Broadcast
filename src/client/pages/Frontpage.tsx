import { Link } from "react-router-dom"

function Frontpage() {

    return (
        <div className="page page-frontpage">
            Frontpage :D
            <br />
            <Link to="/config/fightercard">Config - Fighter Card</Link>
            {/* Todo: Add list/grid of templates */}
        </div>
    )
}

export default Frontpage
