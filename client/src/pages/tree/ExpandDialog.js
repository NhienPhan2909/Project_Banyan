import React, { useState, useEffect } from "react";
import axios from "axios";

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

export default function ExpandDialog({
    open,
    setOpen,
    data,
    setData,
    selected,
}) {
    const handleClose = () => {
        setOpen(false);
    };

    const initChildIDs = (children) => {
        if (children && children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                children[i]["id"] = -1;
            }
        }
        return children
    }

    const expandNode = async (root) => {
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

            const response = await axios.post(`http://localhost:11000/chatgpt/expand-node`, {
                projectPrompt: root.attributes.prompt,
                agileType: selected.attributes.type,
                parentNodePrompt: selected.attributes.prompt,
            });

            if (response.status !== 200) {
                throw new Error(`Failed to expand node: ${response.status} ${response.statusText}`);
            }

            // Add children to parent
            const genChildren = initChildIDs(response.data.children)
            const node = traverse(root, selected.id);
            node.children = node.children.concat(genChildren);

            setData({ ...data }); // trigger a re-render by updating the data state

            //console.log(initChildIDs(response.data.children))
            //console.log(response)
            //console.log(node.children)
            //console.log(root)
            handleClose()
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Expand item?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={async () => {
                            expandNode(data);
                        }}>
                        Expand
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
