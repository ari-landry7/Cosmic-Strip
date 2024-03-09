import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function EditModal(postId) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [alt, setAlt] = useState("");
    const [caption, setCaption] = useState("");

    useEffect(() => {
        console.log("running effect");
        let ignore = false;

        fetch("http://localhost:8000/api/posts/" + postId)
            .then(response => response.json())
            .then(json => {
                // console.log(json.data)
                if (!ignore) console.log(json.data)
            })
        return () => {
            ignore = true;
            console.log("cleanup effect");
            };
    }, [open])

    return (
        <div>
            <Button variant="outlined" style={{width: "6em"}} onClick={handleOpen}>Edit</Button>
            <Modal open={open} onClose={handleClose}>
                <Box style={style} component="form">
                    <TextField
                        variant="outlined"
                        name="newTitle"
                        label="New Title"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        name="newImage"
                        label="New Image"
                        onChange={e => setImage(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        name="newAltText"
                        label="New Alternative Text"
                        onChange={e => setAlt(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        name="newCaption"
                        label="New Caption"
                        onChange={e => setCaption(e.target.value)}
                    />
                </Box>
            </Modal>
        </div>
    )
}