import { Button } from "@mui/material"
import EditModal from "../forms/EditModal"
import { useUserContext } from "../context/UserContext"

function SinglePost(post) {
    const {currentUser} = useUserContext()

    const deletePost = () => {
        if (currentUser.username === post.postUsername) {
            post.onDeletePost(post._id)
        } else {
            alert("Cannot delete posts that you did not create")
            console.log('Failed to delete post: username does not match')
        }
    }

    const updatePost = () => {
        if (currentUser.username === post.postUsername) {
            post.onUpdatePost(post._id)
        } else {
            alert("Cannot edit posts that you did not create")
            console.log('Failed to edit post: username does not match')
        }
    }

    return (
        <div>
            <section className="border margin card">
                <figure>
                    <div className="flex margin" style={{justifyContent: "space-between", alignItems: "center"}}>
                        <section className="flex padding align-left">
                            {/* <img alt="avatar" src="https://placehold.co/70x70" style={{borderRadius: "50%"}} /> */}
                            <h2>{post.title}</h2>
                        </section>
                        <div>
                            <EditModal />
                            <Button variant="outlined" style={{width: "6em"}} onClick={() => deletePost(post)}>Delete</Button>
                        </div>
                    </div>
                    <hr />
                    <img className="margin" alt={post.alt} src={post.image} style={{maxWidth: "90%"}} />
                    <hr />
                    <section className="margin align-left">
                        <p><strong>By {post.postUsername}</strong></p>
                        <div>{post.caption}</div>
                    </section>
                </figure>
                {/* <figure>
                    <div className="flex margin border padding">
                        <img alt="avatar" src="https://placehold.co/70x70" style={{borderRadius: "50%"}} />
                        <section className="padding align-left">
                            <div><strong>User</strong></div>
                            <div>This is a comment about this comic strip</div>
                        </section>
                    </div>
                </figure> */}
            </section>
        </div>
    )
}

export default SinglePost;