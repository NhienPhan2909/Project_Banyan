import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Container from "@mui/material/Container";

export default function List({ data }) {
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
          <TreeItem key={item.id} nodeId={item.id.toString()} label={item.name}>
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
    <Container style={{ border: "solid black", width: "20%" }}>
      <h2>List View</h2>

      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: "90%", flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {spinTreeItems(Object.values(data))}
      </TreeView>
    </Container>
  );
}
