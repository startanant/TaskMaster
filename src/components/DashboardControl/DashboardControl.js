import React, { useRef } from 'react';
function DashboardControl(props) {
    const dashboards = props.dashboards;
    const dashboardName = useRef('');
    const dashboardIndex = useRef(null);
    return (
        <>
            <div className="dash-control-container row">
                <div className="dash-selector">
                    <div class="dropdown">
                        <button 
                            className="btn btn-secondary dropdown-toggle" 
                            type="button" 
                            id="dropdownMenuButton" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                            ref={dashboardIndex}
                            onChange={() =>
                            props.switchDashboard(dashboardIndex.current.value)
                            }
                        >
                            Dashboard
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                <div className="dash-add">
                    <div className="input-group mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="new dashboard" 
                            aria-label="dashboard add" 
                            aria-describedby="dashboard add"
                            ref={dashboardName}
                        />
                        <div class="input-group-append">
                            <button 
                                className="btn btn-outline-secondary" 
                                type="button"
                                onClick={() => {
                                    if (dashboardName.current.value != '') {
                                        props.addDashboard(dashboardName.current.value);
                                    } else {
                                        alert('Please add dashboard name');
                                    }
                                    console.log(dashboardName.current.value);
                                }}
                            >
                            Add
                            </button>
                        </div>
                       </div>
                </div>
            </div>

            {/* <input
                ref={dashboardName}
                type="text"
                placeholder="Dashboard name"
            />
            <button
                onClick={() => {
                    if (dashboardName.current.value != '') {
                        props.addDashboard(dashboardName.current.value);
                    } else {
                        alert('Please add dashboard name');
                    }
                    console.log(dashboardName.current.value);
                }}
            >
                Add
            </button> */}
            
            <select
                ref={dashboardIndex}
                onChange={() =>
                    props.switchDashboard(dashboardIndex.current.value)
                }
            >
                {dashboards.map((dash, index) => {
                    return <option value={index}>{dash.name}</option>;
                })}
            </select>
            {/* <button
                onClick={() =>
                    props.switchDashboard(dashboardIndex.current.value)
                }
            >
                Switch
            </button> */}
        </>
    );
}
export default DashboardControl;
