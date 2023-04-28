import React, { useEffect } from "react";

export default function CustomNode({
  d3Props,
  setSelected,
  setAnchor,
  setOptions,
  nodeClicked,
  nodeData,
}) {
  const { nodeDatum, toggleNode } = { ...d3Props };
  const addNode = () => {
    const currentNodeData = nodeData.current;

    nodeData.current = [
      ...currentNodeData,
      { nodeDatum, toggleNode, setSelected },
    ];
  };
  useEffect(addNode);

  const getColor = (data) => {
    return data?.attributes?.type === "Epic" ? "blue" : "green";
  };

  const mouseOver = (nodeDatum, e, setAnchor, setOptions, setSelected) => {
    setSelected(nodeDatum);
    setAnchor(e.target);
    setOptions(true);
  };
  return (
    <g
      fill={getColor(nodeDatum)}
      onClick={() => nodeClicked(nodeDatum, toggleNode, setSelected)}
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
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
}
