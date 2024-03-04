import { useState } from "react";
import { usePostContext } from "../context/PostContext"
import SinglePost from "./SinglePost"

function Posts() {
    const [errorMessage, setErrorMessage] = useState("");
    const {currentPosts, handleUpdatePosts} = usePostContext()

    const loadPosts = async() => {
        try {
            const response = await fetch("http://localhost:8000/api/posts")
                .then((response) => response.json())
            const newPosts = response.data
            handleUpdatePosts(newPosts)
        } catch (error) {
            setErrorMessage("Something seems to be wrong. Try again");
            console.error("Oops", error);
        }
    }
    const reload = setInterval(loadPosts, 10_000)
    reload
    
    const postList = currentPosts.map(post => (
        <SinglePost
            key={post._id}
            title={post.title}
            image={post.image}
            alt={post.alt}
            caption={post.caption} />
    ))

    let filteredPosts = []

    const handleFilterPosts = (text) => {
        console.log(text)

        filteredPosts = currentPosts.filter(post => {
            if (post.title.includes(text)) {
                return post
            }
        })
        console.log(filteredPosts)
    }

    const newPostList = filteredPosts.map(post => (
        <SinglePost
            key={post.id}
            title={post.title}
            image={post.image}
            alt={post.alt}
            caption={post.caption} />
    ))

    return (
        <div>
            <label>
                <input type="text" name="search" onChange={e => handleFilterPosts(e.target.value)} />
            </label>
            {postList.reverse()}
        </div>
    )
}

export default Posts;