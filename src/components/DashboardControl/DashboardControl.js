import React, { useRef } from 'react';
function DashboardControl(props) {
    const dashboards = props.dashboards;
    const dashboardName = useRef('');
    const dashboardIndex = useRef(null);
    const user = props.user;
    const currentDashboard = props.currentDashboard;
    
    return (
        <>
            <div className="dash-control-container">
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

            <div class="btn-group">
                <button 
                    type="button" 
                    class="btn btn-danger dropdown-toggle" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                >
                   {user.dashboards[currentDashboard].name}
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
            
        </>
    );
}
export default DashboardControl;
