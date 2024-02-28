import { useContext, createContext, useState } from "react";

const PostContext = createContext();

export const PostProvider = (props) => {
    const [currentPosts, setPostList] = useState([])

    const handleUpdatePosts = (list) => {
        setPostList(list)
    }

    return (
        <PostContext.Provider value={{currentPosts, handleUpdatePosts}}>
            {props.children}
        </PostContext.Provider>
    )
}

export const usePostContext = () => {
    return useContext(PostContext)
}