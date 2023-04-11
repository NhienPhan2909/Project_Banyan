import * as React from "react";
import { Box } from '@mui/material';
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

    const getTreeItem = (itemName, itemId) => {
        return <TreeItem nodeId={itemId} label={itemName} />;
    };

    return (

        <Container style={{ border: "solid black", width: "20%", paddingTop: '10px' }}>
            <img id='treeLogo' src="/BanyanText_Transparent.png" />

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
                    
                }}>
                    Save
                </Button>
            </Stack>
            <Divider sx={{ color:'black', backgroundColor:'black', my: '10px' }} />


            <h2>List View</h2>

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
