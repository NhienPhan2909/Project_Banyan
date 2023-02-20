import React, { useState, useEffect } from "react";
import { Container, Stack, Button } from "@mui/material";
import PMTree from "./PMTree";
import EditDialog from "./EditDialog";
import CreateDialog from "./CreateDialog";

const getData = {
  name: "ECOMMERCE PROJECT",
  children: [
    {
      name: "Epic 1",
      attributes: {
        type: "Epic",
        prompt: "Homepage and Navigation Design",
      },
      children: [
        {
          name: "User Story 1",
          attributes: {
            type: "Story",
            prompt:
              "As a user, I want to be able to easily navigate the website so that I can find what I am looking for quickly.Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "User Story 2",
          attributes: {
            type: "Story",
            prompt:
              "As a user, I want the homepage to have a visually appealing design and layout so that I am attracted to explore the website.Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "User Story 3",
          attributes: {
            type: "Story",
            prompt:
              "As a user, I want to be able to access important functions like searching, logging in/signing up, and viewing my cart quickly and easily.",
          },
        },
      ],
    },
    {
      name: "Epic 2",
      attributes: {
        type: "Epic",
        prompt: "Product Catalog DesignHomepage and Navigation Design",
      },
      children: [
        {
          name: "User Story 1",
          attributes: {
            type: "Story",
            prompt:
              "As a user, I want to be able to easily navigate the website so that I can find what I am looking for quickly.FabricationAs a user, I want to see all the available products clearly and easily so that I can make informed decisions.",
          },
        },
        {
          name: "User Story 2",
          attributes: {
            type: "Story",
            prompt:
              "As a user, I want the homepage to have a visually appealing design and layout so that I am attracted to explore the website.AssemblyAs a user, I want to be able to sort and filter products based on various criteria such as price, popularity, and category so that I can find what I am looking for quickly.",
          },
        },
        {
          name: "User Story 3",
          attributes: {
            type: "Story",
            prompt:
              "As a user, I want to be able to access important functions like searching, logging in/signing up, and viewing my cart quickly and easily.As a user, I want to see detailed information about each product including images, description, and specifications so that I can make informed decisions.",
          },
        },
        {
          name: "User Story 4",
          attributes: {
            type: "Story",
            prompt:
              "As a user, I want to be able to access important functions like searching, logging in/signing up, and viewing my cart quickly and easily.As a user, I want to see detailed information about each product including images, description, and specifications so that I can make informed decisions.As a user, I want to be able to add items to my cart and view the total cost so that I can make a purchase.",
          },
        },
      ],
    },
  ],
};
export default function Dashboard() {
  const [selected, setSelected] = useState("");
  const [data, setData] = useState(getData);

  const [openDialog, setOpenDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleClickOpen = () => {
    if (selected) setOpenDialog(true);
  };

  return (
    // <Container>
    <div>
      <EditDialog
        open={openDialog}
        setOpen={setOpenDialog}
        data={data}
        setData={setData}
        selected={selected}
      />
      <CreateDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        data={data}
        setData={setData}
        selected={selected}
      />
      {/* <Stack direction="row">
        <div style={{ marginRight: "20%" }}>
          <h2>Selected: {selected.name}</h2>
          <Button variant="outlined" onClick={handleClickOpen}>
            Edit Node
          </Button>
        </div> */}
      <PMTree
        data={data}
        selected={selected}
        setSelected={setSelected}
        setOpenDialog={setOpenDialog}
        setOpenCreateDialog={setOpenCreateDialog}
      />
      {/* </Stack> */}
      {/* // </Container> */}
    </div>
  );
}
