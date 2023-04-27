import React, { useState } from "react";
import Tree from "react-d3-tree";
import { Popper, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import List from "./List";
import "./tree.css";

// This defines the node
const customNode = ({
    nodeDatum,
    toggleNode,
    setSelected,
    setAnchor,
    setOptions,
}) => (
    // Group changes
    <g
        fill={getColor(nodeDatum)}
        onClick={() => nodeClicked(nodeDatum, toggleNode, setSelected, setOptions)}
        transform="scale(0.8)"
    >
        <rect
            width="800"
            height="120"
            x="-400"
            y="-140"
            style={{ fill: "#00693e", stroke: "#00693e", strokeWidth: "2" }}
        />

        <rect
            width="800"
            height="380"
            x="-400"
            y="-20"
            style={{
                fill: "white",
                stroke: "#00693e",
                strokeWidth: "2",
                zIndex: 1,
            }}
        />

        <foreignObject
            x="-400"
            y="-140"
            width="800"
            height="120"
            onMouseOver={(e) =>
                mouseOver(nodeDatum, e, setAnchor, setOptions, setSelected)
            }
        >
            <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h2 style={{ color: "white", fontSize: "50px" }}>{nodeDatum.name}</h2>
            </div>
        </foreignObject>
        {nodeDatum.attributes?.prompt && (
            <foreignObject x="-380" width="760" height="380">
                <textbox style={{ color: "black", fontSize: "44px" }}>
                    {nodeDatum.attributes?.prompt}
                </textbox>
            </foreignObject>
        )}
    </g>
);

const wrappedText = (text) => {
    const split = text.split(" ");

    for (let i = 0; i < split.length; i += 5) { }
    return text;
};

const getColor = (data) => {
    return data?.attributes?.type === "Epic" ? "blue" : "green";
};

const nodeClicked = (nodeDatum, toggleNode, setSelected) => {
    toggleNode();
    setSelected(nodeDatum);
};

const mouseOver = (nodeDatum, e, setAnchor, setOptions, setSelected) => {
    setSelected(nodeDatum);
    setAnchor(e.target);
    setOptions(true);
};

export default function PMTree({
    data,
    setData,
    selected,
    setSelected,
    setOpenDialog,
    setOpenCreateDialog,
    setOpenDeleteDialog,
    setOpenExpandDialog,
}) {
    const [options, setOptions] = useState(false);
    const [anchor, setAnchor] = useState(null);

    return (
        // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
        <div id="tree-wrapper" onClick={() => setOptions(false)}>
            <Tree
                data={data}
                orientation="vertical"
                pathFunc="step"
                dimensions={{
                    width: (window.innerWidth / 2) * 1.6,
                    height: (window.innerHeight / 2) * 1.4,
                }}
                translate={{
                    x: ((window.innerWidth / 2) * 1.6) / 2,
                    y: ((window.innerHeight / 2) * 1.4) / 2,
                }}
                zoom={0.3}
                depthFactor={650}
                onNodeClick={(data) => {
                    nodeClicked(data, setSelected);
                }}
                renderCustomNodeElement={(d3Props) =>
                    customNode({ ...d3Props, setSelected, setAnchor, setOptions })
                }
                nodeSize={{ x: 250, y: 100 }}
                separation={{ nonSiblings: 4, siblings: 3 }}
            ></Tree>
            <Popper open={options} anchorEl={anchor}>
                <Box
                    sx={{ border: 1, bgcolor: "background.paper" }}
                    onMouseLeave={() => setOptions(false)}
                >
                    <IconButton title="Edit item" onClick={() => setOpenDialog(true)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton title="Expand item" onClick={() => setOpenExpandDialog(true)}>
                        <ExpandCircleDownIcon fontSize="small" />
                    </IconButton>
                    <IconButton title="Add item" onClick={() => setOpenCreateDialog(true)}>
                        <AddBoxIcon fontSize="small" />
                    </IconButton>
                    <IconButton title="Delete item" onClick={() => setOpenDeleteDialog(true)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Popper>
            <List data={data} setData={setData} />
        </div>
    );
}
