import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";

export default function CreateDialog({
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
    const [type, setType] = useState("task");

    const addNode = async (root) => {
        try {
            // Find the node in the PMTree given an id
            const traverse = (node, id) => {
                if (node.id === id) {
                    return node;
                }
                if (node.children && node.children.length > 0) {
                    for (let i = 0; i < node.children.length; i++) {
                        const result = traverse(node.children[i], id);
                        if (result) {
                            return result;
                        }
                    }
                }
                return null;
            };

            //Add a new child to the selected node
            const newChild = {
                id: -1,
                name: name,
                attributes: {
                    type: type,
                    prompt: prompt
                },
                children: []
            };

            // Edit display
            selected.children.push(newChild);
            setOpen(false);
            console.log(selected);

            // Edit state
            const node = traverse(root, selected.id);
            node.children.push(newChild);
            console.log(node);

            setData({ ...data });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a New Node</DialogTitle>
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
                        onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </DialogContent>
                <DialogContent>
                    <FormControl>
                        <FormLabel>Type</FormLabel>
                        <RadioGroup value={type} onChange={(e) => setType(e.target.value)}>
                            <FormControlLabel value="epic" control={<Radio />} label="Epic" />
                            <FormControlLabel value="story" control={<Radio />} label="Story" />
                            <FormControlLabel value="task" control={<Radio />} label="Task" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={async () => {
                            addNode(data);
                        }}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
