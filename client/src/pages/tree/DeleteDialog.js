import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

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

            // Edit display
            // TODO

            // Edit state
            // Remove the node in the PMTree given an id
            const traverseAndRemove = (node, id) => {
                if (node.children && node.children.length > 0) {
                    for (let i = 0; i < node.children.length; i++) {
                        if (node.children[i].id === id) {
                            // remove the node from children
                            node.children.splice(i, 1); 
                            // indicate that the node has been removed
                            return true; 
                        }
                        const result = traverseAndRemove(node.children[i], id);
                        if (result) {
                            // indicate that the node has been removed
                            return true;
                        }
                    }
                }
                return false; // indicate that the node has not been found
            };

            const removeNode = (tree, id) => {
                if (tree.id === id) {
                    // Remove the root node
                    setData(null);
                } else {
                    // Remove a child node
                    const result = traverseAndRemove(tree, id);
                    if (result) {
                        setData({ ...data }); // trigger a re-render by updating the data state
                    }
                }
            };

            removeNode(root, selected.id);
            handleClose()
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
