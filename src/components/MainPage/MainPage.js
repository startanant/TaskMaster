import React, { useState, useEffect } from 'react';
import '../../components-style.css';
import Column from '../Column/Column';
import ColumnTitle from '../ColumTitle/ColumnTitle';
import InviteCard from '../InviteCard/InviteCard';
import SwitchUser from '../SwitchUser/SwitchUser';
import DashboardControl from '../DashboardControl/DashboardControl';

function MainPage(props) {
    const [user, setUser] = useState({ dashboards: [{ columns: [] }] });
    const [sharedToUser, setSharedToUser] = useState([]);
    const [sharedFromUser, setSharedFromUser] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    // const [loop, setLoop] = useState(0);
    const [currentUser, setCurrentUser] = useState('user@user.com');
    const [currentDashboard, setCurrentDashboard] = useState(0);
    const columnStyle = {
        backgroundColor: '#555',
        width: '250px',
        // height: '400px',
        margin: '32px',
    };
    function addColumn() {
        const newColumn = {
            name: '',
            columnid: user.dashboards[currentDashboard].columns.length + 1,
            cards: [],
            //     {
            //         title: 'Card1',
            //         cardid: Math.random(),
            //         duedate: '',
            //         lables: ['Important', 'Medium', 'Low'],
            //         description: 'some text',
            //         asignee: ['', ''],
            //     },
            // ],
        };
        // columns.push(newColumn);
        user.dashboards[currentDashboard].columns.push(newColumn);
        setUser({ ...user });
        updateUserProfile(user);
    }
    function addDashboard(name) {
        const newDashboard = {
            name: name,
            shared: [],
            columns: [],
        };
        user.dashboards.push(newDashboard);
        setUser({ ...user });
        updateUserProfile(user);
    }
    function switchDashboard(dashboardIndex) {
        setCurrentDashboard(dashboardIndex);
    }

    function updateDashboard(dashboardIndex) {}
    function deleteColumn(colIndex) {
        console.log('function deleteColumn called', colIndex);
        user.dashboards[currentDashboard].columns.splice(colIndex, 1);
        setUser({ ...user });
        updateUserProfile(user);
    }
    function addCard(columnIndex) {
        const newCard = {
            title: '',
            cardid: Math.random(),
            duedate: '',
            lables: ['Important', 'Medium', 'Low'],
            description: '',
            asignee: [''],
        };
        user.dashboards[currentDashboard].columns[columnIndex].cards.push(
            newCard
        );
        setUser({ ...user });
        updateUserProfile(user);
    }

    async function switchUser(email) {
        await setCurrentDashboard(0);
        await setCurrentUser(email);
        await getUser(email);
    }

    async function inviteUser(email) {
        user.dashboards[currentDashboard].shared.push(email.toLowerCase());
        user.dashboards[currentDashboard].shared = [
            ...new Set(user.dashboards[currentDashboard].shared),
        ];
        await setUser({ ...user });
        await updateUserProfile(user);
        await updateShared(user.email, email, currentDashboard);
    }

    async function updateShared(from, to, index) {
        console.log('upateShared function called: ', from, to, index);
        const data = {
            sharedFrom: from,
            sharedTo: to,
            dashboards: [index.toString()],
        };
        const url = '/api/insertShared';
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json());
        console.log(
            'loggin response from server for /api/insertShared: ',
            result
        );
    }

    async function saveCard(cardid, colIndex, cardIndex) {
        console.log('function saveCard called', cardid, colIndex, cardIndex);
        let title = document.getElementById('title' + cardid);
        console.log('logging card title', title.value);
        let description = document.getElementById('desc' + cardid);
        console.log('logging card description', description.value);
        let date = document.getElementById('date' + cardid);
        console.log('logging card date', date.value);
        console.log(title.value, description.value, date.value);
        const updatedCard = {
            title: title.value,
            cardid: cardid,
            duedate: date.value,
            lables: ['Important', 'Medium', 'Low'],
            description: description.value,
            asignee: [''],
        };
        user.dashboards[currentDashboard].columns[colIndex].cards[
            cardIndex
        ] = updatedCard;
        await setUser({ ...user });
        await updateUserProfile(user);
    }

    function deleteCard(columnIndex, cardIndex) {
        console.log('function deleteCard called!', columnIndex, cardIndex);
        console.log(
            'displaying user object before deletetion',
            JSON.stringify(
                user.dashboards[currentDashboard].columns[columnIndex].cards
            )
        );
        user.dashboards[0].columns[columnIndex].cards.splice(cardIndex, 1);
        console.log(
            'displaying user object after deletetion',
            JSON.stringify(
                user.dashboards[currentDashboard].columns[columnIndex].cards
            )
        );
        setUser({ ...user });
        updateUserProfile(user);
    }
    function updateColumnTitle(index, title) {
        console.log('function updateColumnTitle called', index, title);
        user.dashboards[currentDashboard].columns[index].name = title;
        setUser({ ...user });
        updateUserProfile(user);
    }

    async function updateCardsOnDrop(data) {
        console.log('updateCardsOnDrop function called...', data);
        user.dashboards[currentDashboard].columns[
            data.toRemove.colIndex
        ].cards.splice(data.toRemove.cardIndex, 1);
        const movedCard = {
            title: data.toAdd.title,
            // cardid: cardid,
            duedate: data.toAdd.duedate,
            lables: ['Important', 'Medium', 'Low'],
            description: data.toAdd.description,
            asignee: [''],
        };
        user.dashboards[currentDashboard].columns[
            data.toAdd.colIndex
        ].cards.push(movedCard);
        setUser({ ...user });
        updateUserProfile(user);
    }

    async function updateUserProfile(user) {
        const url = '/api/updateUserProfile';
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json());
        console.log(result);
    }

    async function getUser(email) {
        const url = `/api/getUser/${email}`;
        const result = await fetch(url).then((response) => response.json());
        console.log('loggin getUser response from server: ', result);
        const user = result[0][0];
        const sharedTo = result[1];
        const sharedFrom = result[2];
        console.log('logging sharedTo', sharedTo);
        console.log('logging sharedFrom', sharedFrom);
        setUser({ ...user });
        setCurrentDashboard(0);
        setSharedFromUser([...sharedFrom]);
        setSharedToUser([...sharedTo]);
    }
    async function getAllUsers() {
        const url = '/api/getAllUsers';
        const result = await fetch(url).then((response) => response.json());
        console.log('logging response from server for getAllUsers', result);
        setAllUsers([...result]);
    }

    useEffect(function () {
        getUser(currentUser);
        getAllUsers();
    }, []);
    const mainPageStyle = {
        width: '80%',
        padding: '32px',
        display: 'flex',
        justifyContent: 'center',
    };
    const dashboardControlStyle = {
        width: '80%',
        padding: '32px',
    };
    return (
        <div className="dashboard-main">
            <div style={dashboardControlStyle}>
                <SwitchUser
                    switchUser={switchUser}
                    shared={allUsers ? allUsers : []}
                />
                <DashboardControl
                    dashboards={user.dashboards}
                    addDashboard={addDashboard}
                    switchDashboard={switchDashboard}
                />
                <InviteCard inviteUser={inviteUser} />
            </div>
            <div id={props.id} className="project-column-wrapper">
                {user.dashboards[currentDashboard].columns.map(
                    (element, index) => {
                        return (
                            <Column
                                id={Math.random().toString()}
                                key={Math.random()}
                                style={columnStyle}
                                cards={element.cards}
                                colName={element.name}
                                colid={element.columnid}
                                addCard={addCard}
                                deleteCard={deleteCard}
                                colIndex={index}
                                deleteColumn={deleteColumn}
                                saveCard={saveCard}
                                updateCardsOnDrop={updateCardsOnDrop}
                                shared={
                                    user.dashboards[currentDashboard].shared
                                }
                                colTitle={
                                    <ColumnTitle
                                        title={element.name}
                                        index={index}
                                        updateColumnTitle={updateColumnTitle}
                                    />
                                }
                            />
                        );
                    }
                )}

                <div style={{ margin: '32px' }}>
                    <button type="button" className="btn-lg btn-outline-secondary"onClick={addColumn}>Add column</button>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
