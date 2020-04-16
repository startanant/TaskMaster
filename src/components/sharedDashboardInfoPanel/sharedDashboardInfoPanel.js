import React from 'react';

function sharedDashboardInfoPanel(props) {
    const sharedDashboards = props.sharedDashboards;
    function showDashboard() {}
    return (
        <div>
            Shared Dahsboards<br></br>
            You have {sharedDashboards.length} dashboards shared with you!
            <br></br>
            <select onChange={showDashboard}>
                <option></option>
                {sharedDashboards.map((element) => {
                    return <option>{element.email}</option>;
                })}
            </select>
        </div>
    );
}

export default sharedDashboardInfoPanel;
