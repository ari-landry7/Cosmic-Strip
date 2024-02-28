function SinglePost(post) {
    return (
        <div>
            <section className="border margin">
                <figure>
                    <div>{post.title}</div>
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