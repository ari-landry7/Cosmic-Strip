import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePostContext } from "../context/PostContext";

function NewPostForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");

  const navigate = useNavigate();

  const [response, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {currentPosts, handleUpdatePosts} = usePostContext()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      image,
      alt,
      caption,
    };

    try {
      const response = await fetch("http://localhost:8000/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const postList = await fetch("http://localhost:8000/api/posts")
        .then((response) => response.json())
        // .then((json) => {
        //     console.log(json.data)
        // });
      
      const data = await response.json();
      if (response.ok) {
        console.log(data.data)
        console.log(postList.data)
        handleUpdatePosts(postList.data)
        setResponseMessage("Success");
        navigate("/home");
      } else {
        setErrorMessage(data.error);
        console.error("Oops: ", data.error);
      }
    } catch (error) {
      setErrorMessage("Something seems to be wrong. Try again");
      console.error("Oops", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Image:
            <input
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Alternative Text:
            <input
              name="alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Caption:
            <input
              name="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </label>
        </div>
        <button>Post</button>
      </form>
    </div>
  );
}

export default NewPostForm;
