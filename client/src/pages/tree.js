import React, { Component } from "react";
import { useParams } from "react-router-dom";
import "./globals.css";
import TreeContainer from "../components/tree/container";

// this is quite inconsistent from other pages, because useParams requires a functional component
// need to work on making the pages more uniform in the future
export default function Tree() {
  return (
    <div className="page">
      <header className="header">
        <div style={{ backgroundColor: "white" }}>
          <TreeContainer project={useParams()._projectId}></TreeContainer>
        </div>
      </header>
    </div>
  )
};