import { useState } from "react";
import NavBar from "../components/NavBar";
import { usePostContext } from "../context/PostContext";
import NewPostForm from "../forms/NewPostForm";

export default function CreatePost() {
    const {currentPosts, handleUpdatePosts} = usePostContext();

    const handleAddPost = (newPost) => {
        newPost.id = currentPosts.length + 1
        let newPosts = [ ...currentPosts, newPost]
        handleUpdatePosts(newPosts)
    }

    return (
        <div>
            <h1>Cosmic Strip</h1>
            <aside><NavBar /></aside>
            <NewPostForm onAddPost={handleAddPost} />
        </div>
    )
}