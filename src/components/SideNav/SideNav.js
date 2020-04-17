import React from 'react';
import '../../components-style.css';
import { Link } from "react-router-dom";

function SideNav(){
  return (
    <div className="sideNav">
      <div className="taskmaster-logo">
          TaskMaster
        </div>
      

      <Link to="/projectdashboard" className="nav-item">
          <div className="nav-icon">
            <i class="fas fa-columns"></i>
          </div>
          <div className="nav-heading">
            Dashboards
          </div>
      </Link>

      <Link to="/mytasks" className="nav-item">
          <div className="nav-icon">
            <i className="fas fa-list"></i>
          </div>
          <div className="nav-heading">
            My Tasks
          </div>
      </Link>

      <Link to="/settings" className="nav-item">
          <div className="nav-icon">
            <i class="fas fa-cog"></i>
          </div>
          <div className="nav-heading">
            Settings
          </div>
      </Link>
      

      



      





    </div>
  );
}; 

export default SideNav;