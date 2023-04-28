import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { traverseAndRemove } from "./traversal";

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
            {/* Dialog to confirm users wish to delete this node */}
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
