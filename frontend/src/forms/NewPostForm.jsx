import { useState } from "react";
import { usePostContext } from "../context/PostContext";

export default function NewPostForm({onAddPost}) {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [alt, setAlt] = useState('')
    const [caption, setCaption] = useState('')
    const [submitResult, setSubmitResult] = useState('')

    const {currentPosts, handleUpdatePosts} = usePostContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)

        const newPost = Object.fromEntries(data)
        console.log(newPost)
        onAddPost({newPost})
        handleUpdatePosts([...currentPosts, newPost])
        setSubmitResult('Successful post')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title: 
                        <input name="title" value={title} onChange={e => setTitle(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>Image: 
                        <input name="image" value={image} onChange={e => setImage(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>Alternative Text: 
                    <input name="alt" value={alt} onChange={e => setAlt(e.target.value)} />
                </label>
                </div>
                <div>
                    <label>Caption: 
                    <input name="caption" value={caption} onChange={e => setCaption(e.target.value)} />
                </label>
                </div>
                <button>Post</button>
            </form>
            <div>{submitResult}</div>
        </div>
    )
}