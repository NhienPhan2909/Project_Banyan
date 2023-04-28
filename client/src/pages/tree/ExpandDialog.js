import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import FadeLoader from "react-spinners/FadeLoader";
import { traverse } from "./traversal"

export default function ExpandDialog({
    open,
    setOpen,
    data,
    setData,
    selected,
}) {
    const [loading, setLoading] = useState(false);

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
            setLoading(true)

            const capitalize = (string) => {
                return string.charAt(0).toUpperCase() + string.slice(1);
            };

            const node = traverse(root, selected.id);

            const response = await axios.post(`http://localhost:11000/chatgpt/expand-node`, {
                projectPrompt: root.attributes.prompt,
                agileType: selected.attributes.type,
                parentNodePrompt: selected.attributes.prompt,
            });

            if (response.status !== 200) {
                throw new Error(`Failed to expand node: ${response.status} ${response.statusText}`);
            }

            // Add children to parent
            const genChildren = initChildIDs(response.data.children);
            

            let count = node.children.length + 1;
            genChildren.forEach(child => {
                child.id = `TEMPID - ${node.id} (${count})`;
                child.name = capitalize(child.attributes.type) + " " + count;
                node.children.push(child);
                count++;
            });

            setData({ ...data }); // trigger a re-render by updating the data state

            handleClose()
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <Dialog open={open} onClose={handleClose}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <FadeLoader className='spinner' loading={loading} size={30} sx={{color: 'rgb(0, 105, 62)'}} style={{backgroundColor: '69af77'}} />
                </div>
                <DialogTitle>Expand item?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={async () => { expandNode(data); }}>Expand</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
