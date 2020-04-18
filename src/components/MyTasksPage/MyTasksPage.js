import React, { useState, useEffect } from 'react';

//import './components-style.css';

function MyTasksPage() {
    const [user, setUser] = useState({ dashboards: [{ columns: [] }] });
    const [sharedToUser, setSharedToUser] = useState([]);
    const [currentDashboard, setCurrentDashboard] = useState(0);
    const shared = user.dashboards[currentDashboard].shared;
    async function getUser(email) {
        function populateShared() {
            sharedTo.forEach((elem, index) => {
                elem.sharedByUser[0].dashboards.forEach((el, idx) => {
                    user.dashboards.push(elem.dashboards[el]);
                });
            });
        }
        const url = `/api/getUser/${email}`;
        const result = await fetch(url).then((response) => response.json());
        const user = result[0][0];
        const sharedTo = result[1];
        populateShared();
        await setUser({ ...user });
        await setSharedToUser([...sharedTo]);

        //adding shared dashboards to user dashboard list
    }
    useEffect(function () {
        getUser('user@user.com');
    }, []);
    return (
        <>
            <div className="mytasks-header">HEADER</div>
            <div className="mytasks-main">
                <div className="mytasks-dash">
                    {user.dashboards.map((dashboard) => {
                        return (
                            <>
                                <div>{dashboard.name}</div>
                                {dashboard.columns.map((column) => {
                                    return (
                                        <>
                                            <div>{column.name}</div>
                                            {column.cards.map((card) => {
                                                return (
                                                    <>
                                                        <p>
                                                            Card Title:{' '}
                                                            {card.title}
                                                        </p>
                                                        <p>
                                                            Card description:{' '}
                                                            {card.description}
                                                        </p>
                                                        <p>
                                                            Card due date:{' '}
                                                            {card.duedate}
                                                        </p>
                                                    </>
                                                );
                                            })}
                                        </>
                                    );
                                })}
                            </>
                        );
                    })}

                    <div className="mytasks-column">
                        Column
                        <div className="mytasks-column">Card</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyTasksPage;
