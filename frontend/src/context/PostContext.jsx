import { useContext, createContext, useState, useEffect } from "react";

const PostContext = createContext();

export const PostProvider = (props) => {
    const [currentPost, setCurrentPost] = useState({})
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [alt, setAlt] = useState("")
    const [caption, setCaption] = useState("")

    const handleUpdatePost = (post) => {
        setCurrentPost(post)
    }

    return (
        <PostContext.Provider value={{currentPost, handleUpdatePost}}>
            {props.children}
        </PostContext.Provider>
    )
}

export const usePostContext = () => {
    return useContext(PostContext)
}