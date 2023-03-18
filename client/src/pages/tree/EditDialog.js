import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditDialog({ open, setOpen, data, setData, selected }) {
  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (!selected) return;
    setName(selected?.name);
    setPrompt(selected?.attributes?.prompt);
    console.log(name);
  }, [selected, data, name]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Prompt at Node</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Set Name</DialogContentText> */}
          <TextField
            autoFocus
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
          />
        </DialogContent>
        <DialogContent>
          {/* <DialogContentText>Set Prompt</DialogContentText> */}
          <TextField
            autoFocus
            id="prompt"
            label="Prompt"
            type="text"
            fullWidth
            variant="standard"
            multiline={true}
            rows="3"
            value={prompt}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Apply</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
