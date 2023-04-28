import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { traverse } from "./traversal"
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

            // Edit state
            const node = traverse(root, selected.id);

            let count = node.children.length + 1;

            //Add a new child to the selected node
            const newChild = {
                id: `TEMPID - ${node.id} (${count})`,
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

            node.children.push(newChild);

            setData({ ...data });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {/* Dialog that will pop up when a user clicks the create node option */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a New Node</DialogTitle>
                <DialogContent>
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
                    {/* Allow users to choose what type of node they wish to create (epic, story, or task) */}
                    <FormControl>
                        <FormLabel>Type</FormLabel>
                        <RadioGroup value={type} onChange={(e) => setType(e.target.value)}>
                            <FormControlLabel value="epic" control={<Radio />} label="Epic" />
                            <FormControlLabel value="story" control={<Radio />} label="Story" />
                            <FormControlLabel value="task" control={<Radio />} label="Task" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                {/* Buttons to Create the node or cancel and exit the dialog */}
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
