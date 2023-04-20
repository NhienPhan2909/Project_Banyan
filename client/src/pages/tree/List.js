import * as React from "react";
import axios from "axios";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';


export default function List({ data }) {
    const [selectedItemId, setSelectedItemId] = React.useState(null);
    
    const spinTreeItems = (data) => {
        return (
            <TreeItem nodeId={data[0].toString()} label={data[1]}>
                {renderTreeItems(data[3])}
            </TreeItem>
        );
    };

    const renderTreeItems = (items) => {
        return (
            <>
                {" "}
                {items.map((item) => (
                    <TreeItem
                        key={item.id}
                        nodeId={item.id.toString()}
                        label={item.name}
                        selected={selectedItemId === item.id}
                    >
                        {item.children.length > 0 && renderTreeItems(item.children)}
                    </TreeItem>
                ))}
            </>
        );
    };

    const updateNodeAndChildren = async (node, parentId = null) => {
        try {
            const childIdList = [];

            // recursively update children first
            if (node.children && node.children.length > 0) {
                for (let i = 0; i < node.children.length; i++) {
                    const childNode = node.children[i];
                    await updateNodeAndChildren(childNode, node.id);

                    if (childNode.id && childNode.id != -1) {
                        childIdList.push(childNode.id);
                    }
                }
            }

            // check if node has ID
            if (!node.id || node.id.startsWith("TEMPID")) {
                if (node.attributes.content === "") {
                    console.log("Empty node!");
                    return;
                }

                // add new node to database
                const response = await axios.post(`http://localhost:11000/nodes/add-node`, {
                    content: node.attributes.prompt,
                    agile_scope: node.attributes.type,
                    _childIdList: childIdList,
                    _parentId: parentId
                });

                if (response.status !== 200) {
                    throw new Error(`Failed to add new node: ${response.status} ${response.statusText}`);
                }

                // get new ID from response
                node.id = response.data.result._id;
            } else {
                // Delete nodes in the DB that are not childIdList but are in node's _childIdList
                const existingNodeResponse = await axios.get(`http://localhost:11000/nodes/${node.id}`);
                const existingNode = existingNodeResponse.data;

                if (existingNode._childIdList && existingNode._childIdList.length > 0) {
                    for (let i = 0; i < existingNode._childIdList.length; i++) {
                        const id = existingNode._childIdList[i];

                        if (!childIdList.includes(id)) {
                            const deleteResponse = await axios.delete(`http://localhost:11000/nodes/delete/${id}`);

                            if (deleteResponse.status !== 200) {
                                throw new Error(`Failed to delete node with ID ${id}: ${deleteResponse.status} ${deleteResponse.statusText}`);
                            }
                        }
                    }
                }

                // update current node
                const response = await axios.patch(`http://localhost:11000/nodes/update/${node.id}`, {
                    content: node.attributes.prompt,
                    agile_scope: node.attributes.type,
                    _childIdList: childIdList,
                    _parentId: parentId
                });

                if (response.status !== 200) {
                    throw new Error(`Failed to update node with ID ${node.id}: ${response.status} ${response.statusText}`);
                }
            }
        } catch (error) {
            console.error(error);
            return -1;
        }
    }



    return (

        <Container style={{ border: "solid black", width: "20%", paddingTop: '10px' }}>
            <img id='treeLogo' src="/BanyanText_Transparent.png" alt="logo" />

            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1} paddingTop={'5px'} paddingBottom={'10px'}>
                <Button sx={{backgroundColor: 'rgb(0, 105, 62)', fontSize:'12px'}} style={{ maxWidth: '90px', maxHeight: '40px', minWidth: '90px', minHeight: '40px' }} variant="contained" 
                onClick={async () => 
                { 
                    window.location.href = '/dashboard' 
                }}>
                 Dashboard
                </Button>
                <Button sx={{backgroundColor: 'rgb(0, 105, 62)', fontSize:'12px'}} style={{ maxWidth: '90px', maxHeight: '40px', minWidth: '90px', minHeight: '40px' }} variant="contained" 
                onClick={async () => 
                {
                    updateNodeAndChildren(data);
                }}>
                    Save
                </Button>
            </Stack>
            <Divider sx={{ color:'black', backgroundColor:'black', my: '10px' }} />

            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: "90%", flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
                onNodeSelect={(event, node) => {
                    setSelectedItemId(parseInt(node.id));
                }}
            >
                {spinTreeItems(Object.values(data))}
            </TreeView>
        </Container>
    );
}
