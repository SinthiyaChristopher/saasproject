import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebar-header">
        <h3>Hi WELCOME 👋</h3>
      </div>
      <h3>Dashboard</h3>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/users">Users</a></li>
        <li><a href="/plans">Plans</a></li>
        <li><a href="/subscriptions">Subscriptions</a></li>
        <li><a href="/revenue">Revenue</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;   // <-- IMPORTANT