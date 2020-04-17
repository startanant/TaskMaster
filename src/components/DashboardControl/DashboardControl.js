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
                                className="btn btn-secondary" 
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
            </button>
            <br></br>
            {/* <select
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
            <div class="btn-group">
                <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Action
                </button>
                <div class="dropdown-menu">
                    {dashboards.map((dash, index) => {
                        return (
                            <div>
                                <a
                                    value={index}
                                    data-index={index}
                                    href="#"
                                    onClick={(e) =>
                                        props.switchDashboard(
                                            e.target.dataset.index
                                        )
                                    }
                                >
                                    {dash.name}-{dash.owner}
                                </a>
                            </div>
                        );
                    })}


                </div>



            </div>
            <div>
                <h3>Your list of dashboards</h3>
                {dashboards.map((dash, index) => {
                    return (
                        <div>
                            <a
                                value={index}
                                data-index={index}
                                href="#"
                                onClick={(e) =>
                                    props.switchDashboard(
                                        e.target.dataset.index
                                    )
                                }
                            >
                                {dash.name}-{dash.owner}
                            </a>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
export default DashboardControl;
