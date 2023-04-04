import React, { useState } from "react";
import Tree from "react-d3-tree";
import { Popper, Box, Popover, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpandIcon from "@mui/icons-material/Expand";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import List from "../list/List";

import "./tree.css";

const customNode = ({
  nodeDatum,
  toggleNode,
  setSelected,
  setAnchor,
  setOptions,
}) => (
  <g
    fill={getColor(nodeDatum)}
    onClick={() => nodeClicked(nodeDatum, toggleNode, setSelected, setOptions)}
  >
    <rect
      width="800"
      height="40"
      x="-400"
      y="-40"
      style={{ fill: "skyblue", stroke: "cadetblue", strokeWidth: "2" }}
    />

    <rect
      width="800"
      height="300"
      x="-400"
      style={{
        fill: "white",
        stroke: "cadetblue",
        strokeWidth: "2",
        zIndex: 1,
      }}
    />

    <foreignObject
      x="-380"
      y="-50"
      width="500"
      height="200"
      onMouseOver={(e) =>
        mouseOver(nodeDatum, e, setAnchor, setOptions, setSelected)
      }
    >
      <h2 style={{ color: "black" }}>{nodeDatum.name}</h2>
    </foreignObject>
    {/* <text fill="black" strokeWidth="0" x="20">
      {nodeDatum.name}
    </text> */}
    {nodeDatum.attributes?.prompt && (
      // <text
      //   fill="white"
      //   x="20"
      //   y="20"
      //   dy="20"
      //   wordSpacing="0.1em"
      //   strokeWidth="1"
      //   textLength="400"
      //   lengthAdjust="spacingAndGlyphs"
      // >
      //   {nodeDatum.attributes?.prompt}
      // </text>
      <foreignObject x="-380" y="20" width="800" height="300">
        <textbox style={{ color: "black" }}>
          {nodeDatum.attributes?.prompt}
        </textbox>
      </foreignObject>
    )}
  </g>
);

const wrappedText = (text) => {
  const split = text.split(" ");

  for (let i = 0; i < split.length; i += 5) {}
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

// const onHover = (data, setOpen, setHover) => {
//   console.log(data);
//   setHover(data);
//   setOpen(true);
// };

// const onHoverOut = (data, setOpen) => {
//   console.log(data);
//   setOpen(false);
// };

export default function PMTree({
  data,
  selected,
  setSelected,
  setOpenDialog,
  setOpenCreateDialog,
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
        depthFactor={1000}
        onNodeClick={(data) => {
          nodeClicked(data, setSelected);
        }}
        // onNodeMouseOver={(data) => onHover(data, setOptions, setHover, setAnchor)}
        // onNodeMouseOut={(data) => onHoverOut(data, setOptions)}
        renderCustomNodeElement={(d3Props) =>
          customNode({ ...d3Props, setSelected, setAnchor, setOptions })
        }
        nodeSize={{ x: 500, y: 200 }}
        separation={{ nonSiblings: 3, siblings: 3 }}
      ></Tree>
      <Popper open={options} anchorEl={anchor}>
        <Box
          sx={{ border: 1, bgcolor: "background.paper" }}
          onMouseLeave={() => setOptions(false)}
        >
          <IconButton onClick={() => setOpenDialog(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <ExpandCircleDownIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <AddBoxIcon
              onClick={() => {
                setOpenCreateDialog(true);
              }}
              fontSize="small"
            />
          </IconButton>
          <IconButton>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Popper>
      <List data={data} />
    </div>
  );
}
