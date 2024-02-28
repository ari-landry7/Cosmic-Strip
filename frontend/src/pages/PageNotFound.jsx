import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div>
            <h1>Page Not Found</h1>
            <p>Uh oh! We couldn't find the page you were looking for. 
                Would you like to return <Link to='/'>home</Link> to try again?</p>
        </div>
    )
}