import React from 'react';
import '../../components-style.css';

function Header(){
  return (
    <div className="header">
      <div className="header-body">
       <div className="row">
        <div className="taskmaster-logo col-3">
          <h2>TaskMaster</h2>
        </div>
        <div className="header-project-title col-3">
          <h2>Project X</h2>
        </div>
        <div className="header-team-members col-6">
          <div className="row">
            <div className="col-6">
              <h4>team members</h4>
            </div>
            <div className="col-6">
              <button className="btn btn-primary">Invite</button>
            </div>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
};

export default Header;