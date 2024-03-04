function SinglePost(post) {
    const deletePost = () => {
        post.onDeletePost(post._id)
    }

    const updatePost = () => {
        post.onUpdatePost(post._id)
    }

    return (
        <div>
            <section className="border margin">
                <figure>
                    <div className="flex margin" style={{justifyContent: "space-between", alignItems: "center"}}>
                        <h2>{post.title}</h2>
                        <div><button onClick={() => updatePost(post)}>Edit</button>
                            <button onClick={() => deletePost(post)}>Delete</button></div>
                    </div>
                    <hr />
                    <img className="margin" alt={post.alt} src={post.image} style={{maxWidth: "90%"}} />
                    <figcaption className="align-left margin">{post.caption}</figcaption>
                </figure>
                <figure>
                    <div className="flex margin border padding">
                        <img alt="avatar" src="https://placehold.co/70x70" style={{borderRadius: "50%"}} />
                        <section className="padding align-left">
                            <div><strong>User</strong></div>
                            <div>This is a comment about this comic strip</div>
                        </section>
                    </div>
                </figure>
            </section>
        </div>
    )
}

export default SinglePost;