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

    const deleteNodeAndChildren = async (root) => {
        try {
            //Update the name and prompt of the selected node
            console.log(selected);
            // Edit display
            // TODO

            // Edit state
            // Remove the node in the PMTree given an id
            const traverseAndRemove = (node, id) => {
                if (node.children && node.children.length > 0) {
                    for (let i = 0; i < node.children.length; i++) {
                        if (node.children[i].id === id) {
                            //console.log(node.children[i].id);
                            node.children.splice(i, 1); // remove the node from children
                            return true; // indicate that the node has been removed
                        }
                        const result = traverseAndRemove(node.children[i], id);
                        if (result) {
                            return true; // indicate that the node has been removed
                        }
                    }
                }
                return false; // indicate that the node has not been found
            };

            const removeNode = (tree, id) => {
                if (tree.id === id) {
                    return null; // cannot remove the root node
                }
                traverseAndRemove(tree, id);
                return tree; // return the modified tree
            };

            removeNode(root, selected.id);
            console.log(root);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete item (and all items below)?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={async () => {
                            deleteNodeAndChildren(data);
                        }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
