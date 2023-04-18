import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";

export default function DeleteDialog({
    open,
    setOpen,
    data,
    setData,
    selected,
}) {
    const handleClose = () => {
        setOpen(false);
    };

    const [name, setName] = useState("");
    const [prompt, setPrompt] = useState("");

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete item (and all items below)?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
