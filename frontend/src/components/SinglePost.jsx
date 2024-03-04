function SinglePost(post) {
    const deletePost = () => {
        post.onDeletePost(post._id)
    }

    return (
        <div>
            <section className="border margin">
                <figure>
                    <div className="flex margin" style={{justifyContent: "space-between"}}><div>{post.title}</div><div><button onClick={() => deletePost(post)}>Delete Post</button></div></div>
                    <img className="margin" alt={post.alt} src={post.image} />
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