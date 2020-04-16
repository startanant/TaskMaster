import React from 'react';
import '../../components-style.css';
import { Link } from "react-router-dom";

function SideNav(){
  return (
    <div className="sideNav">
      <div className="icon-project-dashboard">
        <Link to="/projectdashboard">Project</Link>
      </div>
      <div className="icon-mytasks">
        <Link to="/mytasks" className="sidebar-icon">My Tasks</Link>
      </div>
      <div className="icon-settings">
        <Link to="/settings" className="sidebar-icon">Settings</Link>
      </div>
    </div>
  );
}; 

export default SideNav;