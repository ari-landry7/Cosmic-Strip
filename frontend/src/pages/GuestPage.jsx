import { Link } from "react-router-dom";
import Posts from "../components/Posts";
import NavBar from "../components/NavBar";

export default function GuestPage() {
    return (
        <div style={{width: "80vw"}}>
            <div className="header">
                <a href="#top" style={{color: "white"}}><h1>Cosmic Strip</h1></a>
            </div>

            <section id="top">
                <article className="margin">
                    <p>Welcome to Cosmic Strip, the website where you can find all your favorite webcomics in one place!
                    Log in to comment and post!</p>
                </article>
                <Link to="/signup"><button className="margin">SIGN UP</button></Link>
                <Link to="/login"><button className="margin">LOG IN</button></Link>
            </section>

            <section>
                <h3 className="featured">Featured Comics</h3>
                <Posts />
            </section>
        </div>
    )
}