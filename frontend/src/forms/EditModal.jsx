import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function EditModal() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Button variant="outlined" style={{width: "6em"}} onClick={handleOpen}>Edit</Button>
            <Modal open={open} onClose={handleClose}>
                <Box component="form">
                    <TextField
                        variant="filled"
                        name="newTitle"
                        label="New Title"
                    />
                </Box>
            </Modal>
        </div>
    )
}