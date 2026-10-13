import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h3 className="logo">SaaS Dashboard</h3>
      <ul className="nav-links">
        <li><NavLink to="/" end activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/users" activeClassName="active">Users</NavLink></li>
        <li><NavLink to="/plans" activeClassName="active">Plans</NavLink></li>
        <li><NavLink to="/subscriptions" activeClassName="active">Subscriptions</NavLink></li>
        <li><NavLink to="/revenue" activeClassName="active">Revenue</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;