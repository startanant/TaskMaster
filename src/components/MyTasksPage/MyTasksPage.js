import React, { useState, useEffect } from 'react';
import { secureStorage } from '../../utils';

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
    let userEmail = secureStorage.getItem('email')
        ? secureStorage.getItem('email')
        : 'user@user.com';
    useEffect(function () {
        getUser(userEmail);
    }, []);
    return (
        <>
            <div className="mytasks-header">My Tasks</div>

            <div className="mytasks-container">
                {user.dashboards.map((dashboard) => {
                    return (
                        <>
                            <div className="mytasks-dash">
                                <div className="mytasks-dash-title">
                                    <h4>{dashboard.name}</h4>
                                </div>
                                {dashboard.columns.map((column) => {
                                    return (
                                        <div className="mytasks-column">
                                            <div className="mytasks-column-title">
                                                <h6>{column.name}</h6>
                                            </div>
                                            {column.cards.map((card) => {
                                                return (
                                                    <div className="mytasks-card">
                                                        <div className="cardTitle">
                                                            {card.title}
                                                        </div>
                                                        <div className="cardDesc">
                                                            {card.description}{' '}
                                                        </div>
                                                        <div className="cardDueDate">
                                                            {card.duedate}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    );
}

export default MyTasksPage;
