import { Link } from "react-router-dom";
import Posts from "../components/Posts";

export default function GuestPage() {
    return (
        <div>
            <h1>Cosmic Strip</h1>
            <section>
                <article className="margin">
                    Welcome to Cosmic Strip, the website where you can find all your favorite webcomics in one place!
                    Log in to comment and post!
                </article>
                <Link to="/login"><button>LOG IN</button></Link>
            </section>
            <section>
                <h3 className="featured">Featured Comics</h3>
                <Posts />
            </section>
        </div>
    )
}