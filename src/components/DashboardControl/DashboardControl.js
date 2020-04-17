import React, { useRef } from 'react';
function DashboardControl(props) {
    const dashboards = props.dashboards;
    const dashboardName = useRef('');
    const dashboardIndex = useRef(null);
    return (
        <>
            <input
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
            <button
                onClick={() =>
                    props.switchDashboard(dashboardIndex.current.value)
                }
            >
                Switch
            </button> */}
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
