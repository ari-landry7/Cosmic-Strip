import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import EditModal from "../forms/EditModal";
import { usePostContext } from "../context/PostContext";

function Posts() {
  const [responseMessage, setResponseMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPosts, setCurrentPosts] = useState([]);

  const {currentPost, handleUpdatePost} = usePostContext()

  const handleDeletePost = (id) => {
    fetch("http://localhost:8000/api/posts/" + id, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(json => {
        console.log("deletePost: ", json.data);
        setResponseMessage('Success')
      })
  };

  const title = currentPost.title
  const image = currentPost.image
  const alt = currentPost.alt
  const caption = currentPost.caption

  const handleEditPost = (id) => {
    const postData = {
      title,
      image,
      alt,
      caption
    }

    fetch("http://localhost:8000/api/posts/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(json => {
        console.log("updatePost: ", json.data);
        // console.log(json)
        setResponseMessage('Success')
      })
  }

  useEffect(() => {
    try {
      console.log("running effect");
      let ignore = false;

      fetch("http://localhost:8000/api/posts")
        .then(response => response.json())
        .then(json => {
          if (!ignore) setCurrentPosts(json.data);
        });

      return () => {
        ignore = true;
        console.log("cleanup effect");
      };
    } catch (error) {
      setErrorMessage("Something seems to be wrong. Try again");
      console.error("Oops", error);
    }
  }, [responseMessage]);

  const postList = currentPosts.map(post => (
    <SinglePost
      key={post._id}
      userId={post.userId}
      postUsername={post.postUsername}
      title={post.title}
      image={post.image}
      alt={post.alt}
      caption={post.caption}
      onDeletePost={() => handleDeletePost(post._id)}
      onUpdatePost={() => handleEditPost(post._id)}
    />
  ));

  return (
    <div>
      {/* <label>
        <input
          type="text"
          name="search"
          onChange={(e) => handleFilterPosts(e.target.value)}
        />
      </label> */}
      {postList.reverse()}
    </div>
  );
}

export default Posts;