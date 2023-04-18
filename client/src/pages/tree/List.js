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

    const getChildIDs = (node) => {
        const children = [];
        if (node.children && node.children.length > 0) {
            for (let i = 0; i < node.children.length; i++) {
                children.push(node.children[i].id)
            }
        }
        return children
    }

    const updateNodeAndChildren = async (node) => {
        //console.log(data);
        try {
            const childIdList = getChildIDs(node);

            // check if node has ID
            if (!node.id) {
                // add new node to database
                const response = await axios.post(`http://localhost:11000/nodes/add-node`, {
                    content: node.attributes.prompt,
                    agile_scope: node.attributes.type,
                    _childIdList: childIdList,
                    _parentId: null //TODO: Update
                });

                if (response.status !== 200) {
                    throw new Error(`Failed to add new node: ${response.status} ${response.statusText}`);
                }

                // get new ID from response
                const data = await response.json();
                node.id = data._id;
            } else {
                // TODO: Delete nodes in the DB that are not childIdList but are in node's _childIdList
                // Use `http://localhost:11000/nodes/${node.id}` to get the node
                // Use `http://localhost:11000/nodes/delete/${node.id}` to delete

                // update current node
                const response = await axios.patch(`http://localhost:11000/nodes/update/${node.id}`, {
                    content: node.attributes.prompt,
                    agile_scope: node.attributes.type,
                    _childIdList: childIdList,
                    _parentId: null //TODO: Update
                });

                if (response.status !== 200) {
                    throw new Error(`Failed to update node with ID ${node.id}: ${response.status} ${response.statusText}`);
                }
                //console.log(response);
            }

            // recursively update children
            if (node.children && node.children.length > 0) {
                for (let i = 0; i < node.children.length; i++) {
                    await updateNodeAndChildren(node.children[i]);
                }
            }
        } catch (error) {
            console.error(error);
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
