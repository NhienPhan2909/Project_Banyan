import React, { useState, useRef } from "react";
import Tree from "react-d3-tree";
import { Popper, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import List from "./List";
import "./tree.css";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CustomNode from "./CustomNode";

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
  const [zoomLevel, setZoomLevel] = useState(0.3);
  const nodeData = useRef([]);

  const handleZoomIn = () => {
    if (zoomLevel < 10) {
      setZoomLevel(zoomLevel + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.1) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  const nodeClicked = (nodeDatum, toggleNode, setSelected) => {
    toggleNode();
    setSelected(nodeDatum);
  };

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
        zoom={zoomLevel}
        depthFactor={650}
        onNodeClick={(data) => {
          nodeClicked(data, setSelected);
        }}
        renderCustomNodeElement={(d3Props) => (
          <CustomNode
            d3Props={d3Props}
            setSelected={setSelected}
            setAnchor={setAnchor}
            setOptions={setOptions}
            nodeClicked={nodeClicked}
            nodeData={nodeData}
          />
        )}
        nodeSize={{ x: 250, y: 100 }}
        separation={{ nonSiblings: 4, siblings: 3 }}
      ></Tree>
      <div>
        <IconButton onClick={handleZoomIn}>
          <ZoomInIcon />
        </IconButton>
        <IconButton onClick={handleZoomOut}>
          <ZoomOutIcon />
        </IconButton>
      </div>
      <Popper open={options} anchorEl={anchor}>
        <Box
          sx={{ border: 1, bgcolor: "background.paper" }}
          onMouseLeave={() => setOptions(false)}
        >
          <IconButton title="Edit item" onClick={() => setOpenDialog(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            title="Expand item"
            onClick={() => setOpenExpandDialog(true)}
          >
            <ExpandCircleDownIcon fontSize="small" />
          </IconButton>
          <IconButton
            title="Add item"
            onClick={() => setOpenCreateDialog(true)}
          >
            <AddBoxIcon fontSize="small" />
          </IconButton>
          <IconButton
            title="Delete item"
            onClick={() => setOpenDeleteDialog(true)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Popper>
      <List
        data={data}
        setData={setData}
        nodeData={nodeData}
        nodeClicked={nodeClicked}
      />
    </div>
  );
}
