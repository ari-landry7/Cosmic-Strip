import { Link } from "react-router-dom";
import Posts from "../components/Posts";
import NavBar from "../components/NavBar";
import { Button } from "@mui/material";
import AdSpace from "../components/AdSpace";

export default function GuestPage() {
    return (
        <div style={{width: "80vw"}}>
            <header className="header">
                <a href="#top" style={{color: "white"}}><h1>Cosmic Strip</h1></a>
                <Link to='/signup'>Subscribe now</Link> to get rid of ads!
            </header>

            <section id="top">
                <article className="margin">
                    <p>Welcome to Cosmic Strip, the website where you can find all your favorite webcomics in one place!
                    Log in to comment and post!</p>
                </article>
                <div className="flex" style={{justifyContent: "space-around"}}>
                    <Link to="/signup"><Button variant="contained" size="large" className="margin">SIGN UP</Button></Link>
                    <Link to="/login"><Button variant="contained" size="large" className="margin">LOG IN</Button></Link>
                </div>
            </section>

            <section>
                <h3 className="featured">Featured Comics</h3>
                <div className="flex">
                    <Posts />
                    <AdSpace />
                </div>
            </section>
        </div>
    )
}