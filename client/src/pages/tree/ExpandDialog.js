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

import FadeLoader from "react-spinners/FadeLoader";

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

            const capitalize = (string) => {
                return string.charAt(0).toUpperCase() + string.slice(1);
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

            let count = node.children.length + 1;
            genChildren.forEach(child => {
                child.id = `TEMPID - ${node.id} (${count})`;
                child.name = capitalize(child.attributes.type) + " " + count;
                node.children.push(child);
                count++;
            });

            setData({ ...data }); // trigger a re-render by updating the data state

            //console.log(initChildIDs(response.data.children))
            //console.log(response)
            //console.log(node.children)
            //console.log(root)
            handleClose()
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <FadeLoader className='spinner' loading={loading} size={30} sx={{color: 'rgb(0, 105, 62)'}} style={{backgroundColor: '69af77', position: 'fixed', top: '50%', left: '50%', transform: 'translateX(-50%)',}}/>
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
