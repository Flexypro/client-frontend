import React from "react";
import "./sidenav.css";
// import gigitise from '../../../../public/gigitise.svg';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdAdd,
  MdTaskAlt,
  MdPendingActions,
  MdAccessTime,
} from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { FaClockRotateLeft } from "react-icons/fa6";

const SideNav = () => {
  const navigate = useNavigate();
  const iconSize = 25;

  return (
    <div className="side-nav">
      <h1
        style={{ cursor: "pointer" }}
        className="heading-logo"
        onClick={() => navigate("./")}
      >
        {/* <img src={gigitise} style={{width:'3rem', color:'white'}} alt="" /> */}
        Gigitise
      </h1>
      <div className="actions">
        <NavLink to="/app" className="nav-item" activeClassName="active-link">
          <span>
            <FiMenu size={iconSize} />
          </span>
          Dashboard
        </NavLink>
        <NavLink
          to="./available"
          className="nav-item"
          activeClassName="active-link"
        >
          <span>
            <FaClockRotateLeft size={iconSize} />
          </span>
          Bidding
        </NavLink>
        <NavLink
          to="./in-progress"
          className="nav-item"
          activeClassName="active-link"
        >
          <span>
            <MdPendingActions size={iconSize} />
          </span>
          In Progress
        </NavLink>
        <NavLink
          to="./completed"
          className="nav-item"
          activeClassName="active-link"
        >
          <span>
            <MdTaskAlt size={iconSize} />
          </span>
          Completed
        </NavLink>
        <NavLink
          to="./solved"
          className="nav-item"
          activeClassName="active-link"
        >
          <span>
            <MdAccessTime size={iconSize} />
          </span>
          Solved
        </NavLink>
        <NavLink
          to="./create-task"
          className="nav-item"
          activeClassName="active-link"
        >
          <span>
            <MdAdd size={iconSize} />
          </span>
          Create
        </NavLink>
      </div>
    </div>
  );
};

export default SideNav;
