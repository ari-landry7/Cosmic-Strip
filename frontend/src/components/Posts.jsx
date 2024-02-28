import { usePostContext } from "../context/PostContext"
import SinglePost from "./SinglePost"

function Posts() {
    const comics = [
        {
            id: 1,
            title: "Test 1",
            image: "https://placehold.co/600x400?text=Comic+Strip+1",
            alt: "placeholder comic",
            caption: "Some example text to fill out this section"
        },
        {
            id: 2,
            title: "Test 2",
            image: "https://placehold.co/600x400?text=Comic+Strip+2",
            alt: "placeholder comic 2",
            caption: "This is where the user posts their caption"
        }
    ]

    const {currentPosts, handleUpdatePosts} = usePostContext(comics)

    const postList = currentPosts.map(post => (
        <SinglePost
            key={post.id}
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