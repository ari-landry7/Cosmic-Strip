import NavBar from "../components/NavBar";
import Posts from "../components/Posts";
import { useState } from "react";
import { usePostContext } from "../context/PostContext";
import { useUserContext } from "../context/UserContext";

export default function HomePage() {
    const {currentUser, handleUpdateUser} = useUserContext();
    const {currentPosts, handleUpdatePosts} = usePostContext()

    
    const handleFilterPosts = (text) => {
        console.log(text)

        let filteredPosts = currentPosts.filter(post => {
            if (post.title.includes(text)) {
                return post
            }
        })
        console.log(filteredPosts)
    }

    return (
        <div style={{width: "80vw"}}>
            <div className="header">
                <a href="#top" style={{color: "white"}}><h1>Cosmic Strip</h1></a>
                <NavBar />
            </div>
            
            <div id="#top"><strong>Hello {currentUser.username}!</strong></div>
            {/* <label>
                <input type="text" value="Search" name="search"
                    onChange={(e) => e.filter(a => a.target.value)} />
            </label> */}

            {/* <label>
                <input type="text" name="search" onChange={e => handleFilterPosts(e.target.value)} />
            </label> */}
            <Posts />
        </div>
    )
}