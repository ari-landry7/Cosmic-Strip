import { Button, Box, Modal, TextField } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import { useState } from "react";
import { usePostContext } from "../context/PostContext";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    backgroundColor: "#1f1f1f",
    border: "2px solid #1f1f1f",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

function SinglePost(post) {
  const { currentUser } = useUserContext();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");

  const {currentPost, handleUpdatePost} = usePostContext()

  const handleOpen = () => {
    if (currentUser.username === post.postUsername) {
      setOpen(true);
      handleUpdatePost(post) 
    } else {
      alert("Cannot edit posts that you did not create");
      console.log("Failed to edit post: username does not match");
    }
  }
  const handleClose = () => setOpen(false);

  const deletePost = () => {
    if (currentUser.username === post.postUsername) {
      post.onDeletePost(post._id);
    } else {
      alert("Cannot delete posts that you did not create");
      console.log("Failed to delete post: username does not match");
    }
  };

  let newTitle, newImage, newAlt, newCaption

  const updatePost = () => {
    if (title) {
        newTitle = title
    } else newTitle = post.title

    if (image) {
        newImage = image
    } else newImage = post.image

    if (alt) {
        newAlt = alt
    } else newAlt = post.alt

    if (caption) {
        newCaption = caption
    } else newCaption = post.caption
    
    // if (currentUser.username === post.postUsername) {
      handleUpdatePost({id: post._id, title: newTitle, image: newImage, alt: alt, caption: caption})
      post.onUpdatePost(post._id);
    // } else {
    //   alert("Cannot edit posts that you did not create");
    //   console.log("Failed to edit post: username does not match");
    // }
  };

  return (
    <>
      <section className="border card">
        <figure>
          <div
            className="flex"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <section className="flex padding align-left">
              {/* <img alt="avatar" src="https://placehold.co/70x70" style={{borderRadius: "50%"}} /> */}
              <h2>{post.title}</h2>
            </section>
            <div>
              {/* <EditModal /> */}
              {/* <Button variant="outlined" style={{width: "6em"}} onClick={() => updatePost(post)}>Edit</Button> */}
              <div>
                <Button
                  variant="outlined"
                  style={{ width: "6em" }}
                  onClick={handleOpen}
                >
                  Edit
                </Button>
                <Modal open={open} style={{zIndex: 1600}} onClose={handleClose}>
                  <Box style={style} component="form" onSubmit={updatePost}>
                    <TextField
                      variant="outlined"
                      value={title}
                      name="newTitle"
                      label="New Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                      variant="outlined"
                      value={image}
                      name="newImage"
                      label="New Image"
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <TextField
                      variant="outlined"
                      value={alt}
                      name="newAltText"
                      label="New Alternative Text"
                      onChange={(e) => setAlt(e.target.value)}
                    />
                    <TextField
                      variant="outlined"
                      value={caption}
                      name="newCaption"
                      label="New Caption"
                      onChange={(e) => setCaption(e.target.value)}
                    />
                    <Button variant="contained" onClick={() => updatePost()}>
                      Confirm Changes
                    </Button>
                  </Box>
                </Modal>
              </div>
              <Button
                variant="outlined"
                style={{ width: "6em" }}
                onClick={() => deletePost(post)}
              >
                Delete
              </Button>
            </div>
          </div>
          <hr />
          <img className="margin comic-image" alt={post.alt} src={post.image} />
          <hr />
          <section className="margin align-left">
            <p>
              <strong>By {post.postUsername}</strong>
            </p>
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
    </>
  );
}

export default SinglePost;
