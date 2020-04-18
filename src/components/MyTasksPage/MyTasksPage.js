import React, { useState, useEffect } from 'react';

const testData = [
    {
        user: {
            dashTitle: 'Dashboard A',
            columns: [
                {
                    colTitle: 'Column X',
                    cards: [
                        {
                            cardTitle: 'Card X 1',
                            cardDesc: 'This is the description for card X 1',
                            cardDueDate: 'April 19/20',
                        },
                        {
                            cardTitle: 'Card X 2',
                            cardDesc: 'This is the description for card X 2',
                            cardDueDate: 'April 19/20',
                        },
                        {
                            cardTitle: 'Card X 1',
                            cardDesc: 'This is the description for card X 3',
                            cardDueDate: 'April 19/20',
                        },
                    ],
                },
                {
                    colTitle: 'Column Y',
                    cards: [
                        {
                            cardTitle: 'Card Y 1',
                            cardDesc: 'This is the description for card Y 1',
                            cardDueDate: 'April 19/20',
                        },
                        {
                            cardTitle: 'Card X 2',
                            cardDesc: 'This is the description for card Y 2',
                            cardDueDate: 'April 19/20',
                        },
                        {
                            cardTitle: 'Card X 1',
                            cardDesc: 'This is the description for card Y 3',
                            cardDueDate: 'April 19/20',
                        },
                    ],
                },
            ],
        },
    },
];

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
                                                <p>Card Title: {card.title}</p>
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
                <div className="mytasks-dash">
                    <div className="mytasks-dash-title">
                        <h4>Dashboard A</h4>
                    </div>
                    <div className="mytasks-column">
                        <div className="mytasks-column-title">
                            <h6>Column X</h6>
                        </div>
                        <div className="mytasks-card">
                            <div className="cardTitle">Card 1</div>
                            <div className="cardDesc">
                                description description description{' '}
                            </div>
                            <div className="cardDueDate">April 20/20</div>
                        </div>
                        <div className="mytasks-card">
                            <div className="cardTitle">Card 2</div>
                            <div className="cardDesc">
                                description description description{' '}
                            </div>
                            <div className="cardDueDate">April 21/20</div>
                        </div>
                    </div>

                    <div className="mytasks-column">
                        <div className="mytasks-column-title">
                            <h6>Column Y</h6>
                        </div>
                        <div className="mytasks-card">
                            <div className="cardTitle">Card 1</div>
                            <div className="cardDesc">
                                description description description{' '}
                            </div>
                            <div className="cardDueDate">April 20/20</div>
                        </div>
                        <div className="mytasks-card">
                            <div className="cardTitle">Card 2</div>
                            <div className="cardDesc">
                                description description description{' '}
                            </div>
                            <div className="cardDueDate">April 21/20</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyTasksPage;
