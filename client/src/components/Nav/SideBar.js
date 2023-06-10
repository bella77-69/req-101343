import React from "react";
import { Nav } from "react-bootstrap";
import "./sidebar.css";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/inventory">Inventory</Nav.Link>
      <Nav.Link href="/update">Paint Update</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
    </div>
  );
}

export default Sidebar;