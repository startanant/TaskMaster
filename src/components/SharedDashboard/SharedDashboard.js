import React, { useState } from 'react';
function SharedDashboard(props) {
    const [show, setShow] = useState(false);
    const dashboardsObj = props.toRender;
    const indexesToRender = dashboardsObj.sharedByUser[0].dashboards;
    const dashboards = dashboardsObj.dashboards;
    function RenderSingleDashboard(props, el) {
        if (!props.show) {
            return null;
        }
        return <div>Dash will go here</div>;
    }
    if (!props.render) {
        return null;
    }
    return (
        <div>
            Click to see dashboards:
            <br></br>
            {indexesToRender.map((el) => {
                return (
                    <>
                        <button
                            onClick={() => {
                                setShow(!show);
                                RenderSingleDashboard(el);
                            }}
                        >
                            Dash:{el}
                        </button>
                    </>
                );
            })}
            <RenderSingleDashboard show={show} />
        </div>
    );
}
export default SharedDashboard;
