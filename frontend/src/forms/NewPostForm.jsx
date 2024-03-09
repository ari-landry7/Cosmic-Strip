import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Box, Button, TextField } from "@mui/material";

function NewPostForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [userId, setUserId] = useState("");
  const [postUsername, setPostUsername] = useState("");
  const {currentUser} = useUserContext();
  const email = currentUser.email;

  const navigate = useNavigate();

  useEffect(() => {
    console.log("running effect");
    let ignore = false;

    fetch("http://localhost:8000/api/users/" + email)
      .then((response) => response.json())
      .then((json) => {
        if (!ignore) {
          // console.log(json.data[0])
          setUserId(json.data[0]._id);
          setPostUsername(json.data[0].username);
        }
      });
    return () => {
      ignore = true;
      console.log("cleanup effect");
    };
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      image,
      alt,
      caption,
      userId,
      postUsername
    };

    try {
      const response = await fetch("http://localhost:8000/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const postList = await fetch("http://localhost:8000/api/posts").then(
        (response) => response.json()
      );
      // .then((json) => {
      //     console.log(json.data)
      // });

      const data = await response.json();
      if (response.ok) {
        // console.log(data.data);
        // console.log(postList.data);

        navigate("/home");
      } else {
        console.error("Oops: ", data.error);
      }
    } catch (error) {
      console.error("Oops", error);
    }
  };

  return (
    <div style={{ width: "80vw" }}>
      <Box component="form" size="large" onSubmit={handleSubmit}>
        <div>
          <TextField
            variant="outlined"
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            label="Image"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            label="Alternative Text"
            name="alt"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            label="Caption"
            name="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div>
          <Button variant="contained" onClick={handleSubmit}>
            Post
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default NewPostForm;
