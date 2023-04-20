import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditDialog({ open, setOpen, data, setData, selected }) {
    const handleClose = () => {
        setOpen(false);
    };

    const [name, setName] = useState("");
    const [prompt, setPrompt] = useState("");

    const updateNode = async (root) => {
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

            //Update the name and prompt of the selected node
            
            // Edit display
            selected.name = name;
            selected.attributes.prompt = prompt;
            setOpen(false);
            //console.log(selected);

            // Edit state
            const node = traverse(root, selected.id);
            node.name = name;
            node.attributes.prompt = prompt;
        
            setData({ ...data });

        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        if (!selected) return;
        setName(selected?.name);
        setPrompt(selected?.attributes?.prompt);
    }, [selected, data]);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle >Edit Node</DialogTitle>
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
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={async () => {
                        updateNode(data);
                    }}>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
