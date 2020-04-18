import React, { useState, useEffect } from 'react';
import '../../components-style.css';
import Column from '../Column/Column';
import ColumnTitle from '../ColumTitle/ColumnTitle';
import InviteCard from '../InviteCard/InviteCard';
import SharedWith from '../SharedWith/SharedWith';
import SwitchUser from '../SwitchUser/SwitchUser';
import DashboardControl from '../DashboardControl/DashboardControl';
import SharedDashboardInfoPanel from '../sharedDashboardInfoPanel/sharedDashboardInfoPanel';
import { v4 as uuidv4 } from 'uuid';

function MainPage(props) {
    const [user, setUser] = useState({ dashboards: [{ columns: [] }] });
    const [sharedToUser, setSharedToUser] = useState([]);
    // const [sharedFromUser, setSharedFromUser] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    // const [loop, setLoop] = useState(0);
    const [currentUser, setCurrentUser] = useState('user@user.com');
    const [currentDashboard, setCurrentDashboard] = useState(0);
    const shared = user.dashboards[currentDashboard].shared;
    const columnStyle = {
        backgroundColor: '#555',
        width: '250px',
        // height: '400px',
        margin: '32px',
    };
    function addColumn() {
        const newColumn = {
            name: '',
            id: uuidv4(),
            cards: [],
        };
        // columns.push(newColumn);
        user.dashboards[currentDashboard].columns.push(newColumn);
        setUser({ ...user });
        updateUserProfile(user);
    }
    function deleteDashboard() {
        if (user.dashboards.length === 1) {
            alert('Last dashboard cannot be deleted!');
            return;
        }

        user.dashboards.splice(currentDashboard, 1);
        setCurrentDashboard(0);
        setUser({ ...user });
        updateUserProfile(user);
    }
    function addDashboard(name) {
        const newDashboard = {
            name: name,
            id: uuidv4(),
            owner: user.email,
            shared: [],
            columns: [],
        };
        user.dashboards.unshift(newDashboard);
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
            id: uuidv4(),
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

        // const sharedRecord = {
        //     to: email,
        //     dashboards: user.sharedByUser.dashboards.push(currentDashboard),
        // };

        // user.sharedByUser.push(sharedRecord);

        const userIndex = user.sharedByUser.findIndex(
            (element) => element.to == `${email}`
        );
        if (userIndex > -1) {
            user.sharedByUser[userIndex].dashboards.push(currentDashboard);
            user.sharedByUser[userIndex].dashboards = [
                ...new Set(user.sharedByUser[userIndex].dashboards),
            ];
        } else {
            user.sharedByUser.push({
                to: email,
                dashboards: [currentDashboard.toString()],
            });
        }
        console.log(
            'loggin result from fiding user in shared array',
            userIndex
        );
        console.log(user.sharedByUser[userIndex]);

        await setUser({ ...user });
        await updateUserProfile(user);
        // await updateShared(user.email, email, currentDashboard);
    }

    async function uninviteUser(email) {
        console.log('uninviteUSer function called with email', email);
        const userIndex = user.sharedByUser.findIndex(
            (element) => element.to == `${email}`
        );
        if (userIndex > -1) {
            user.sharedByUser.splice(userIndex, 1);
            await setUser({ ...user });
            await updateUserProfile(user);
        }
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
        let title = document.getElementById('title' + cardid)
            ? document.getElementById('title' + cardid)
            : '';
        console.log('logging card title', title.value);
        let description = document.getElementById('desc' + cardid)
            ? document.getElementById('desc' + cardid)
            : '';
        console.log('logging card description', description.value);
        let date = document.getElementById('date' + cardid)
            ? document.getElementById('date' + cardid)
            : '';
        console.log('logging card date', date.value);
        console.log(title.value, description.value, date.value);
        const updatedCard = {
            title: title.value ? title.value : '',
            id: cardid,
            duedate: date.value ? date.value : '',
            lables: ['Important', 'Medium', 'Low'],
            description: description.value ? description.value : '',
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
        user.dashboards[currentDashboard].columns[columnIndex].cards.splice(
            cardIndex,
            1
        );
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
            id: uuidv4(),
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
        let updatedUser = { ...user };
        let filteredDashboards = updatedUser.dashboards.filter(
            (el) => el.owner == user.email
        );
        updatedUser.dashboards = filteredDashboards;
        const url = '/api/updateUserProfile';
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(updatedUser),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json());
        console.log(result);
    }

    async function getUser(email) {
        function populateShared() {
            // console.log('SHARED To USER LENGTH IS:', sharedTo.length);
            sharedTo.forEach((elem, index) => {
                elem.sharedByUser[0].dashboards.forEach((el, idx) => {
                    user.dashboards.push(elem.dashboards[el]);
                });
            });
            // setUser({ ...user });
        }
        const url = `/api/getUser/${email}`;
        const result = await fetch(url).then((response) => response.json());
        console.log('loggin getUser response from server: ', result);
        const user = result[0][0];
        const sharedTo = result[1];
        console.log('LOGGING getUSer call sharedTo', sharedTo);
        // const sharedFrom = result[2];
        // console.log('logging sharedTo', sharedTo);
        // console.log('logging sharedFrom', sharedFrom);
        populateShared();
        await setUser({ ...user });
        await setCurrentUser(user.email);
        await setCurrentDashboard(0);
        // setSharedFromUser([...sharedFrom]);
        await setSharedToUser([...sharedTo]);

        //adding shared dashboards to user dashboard list
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
            <div className="dashboard-header">
                <div className="header-dashAddNav">
                    <DashboardControl
                        dashboards={user.dashboards}
                        addDashboard={addDashboard}
                        switchDashboard={switchDashboard}
                        user={user}
                        currentDashboard={currentDashboard}
                    />
                </div>
                
                <div className="header-team">
                    <div className="teamTitle">Team Members</div>
                    <div className="invite-form">
                        <InviteCard
                            uninviteUser={uninviteUser}
                            inviteUser={inviteUser}
                            sharedByUser={user.sharedByUser}
                        />
                    </div>
                    <div className="addedUsers">
                        
                        <button type="button" class="btn btn-sm btn-primary user">Barrack X</button>
                        <button type="button" class="btn btn-sm btn-primary user">Donald X</button>
                        <button type="button" class="btn btn-sm btn-primary user">Hillary X</button>
                        <button type="button" class="btn btn-sm btn-primary user">Bernie X</button>
                        {/* {user.dashboards[currentDashboard].shared.map( (element) => {
                            return (
                                <button type="button" class="btn btn-sm btn-primary user">{element} X</button>
                            )
                        })} */}
                    
                    </div>
                    
                </div>
                <div className="dash-delete">
                    <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        onClick={deleteDashboard}
                    >
                        Delete
                    </button>
                </div>



            </div>
            
            {/**/}
            {/* <div style={dashboardControlStyle}>
                <SwitchUser
                    currentUser={currentUser}
                    switchUser={switchUser}
                    shared={allUsers ? allUsers : []}
                />
            </div> */}
            {/*
                <DashboardControl
                    dashboards={user.dashboards}
                    addDashboard={addDashboard}
                    switchDashboard={switchDashboard}
                    sharedDashboardsNum={sharedToUser.length}
                />
            
            
                <InviteCard
                    uninviteUser={uninviteUser}
                    inviteUser={inviteUser}
                    sharedByUser={user.sharedByUser}
                />
            </div> */}
            <div id={props.id} className="project-column-wrapper">
                {user.dashboards[currentDashboard].columns.map(
                    (element, index) => {
                        return (
                            <Column
                                // id={element.id}
                                key={uuidv4()}
                                style={columnStyle}
                                cards={element.cards}
                                colName={element.name}
                                colid={element.id}
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
                    <button
                        type="button"
                        className="btn-lg btn-outline-secondary"
                        onClick={addColumn}
                    >
                        Add column
                    </button>
                </div>
            </div>
            {/* <div>
                {sharedToUser.length > 0 ? (
                    <SharedDashboardInfoPanel sharedDashboards={sharedToUser} />
                ) : null}
            </div> */}
        </div>
    );
}

export default MainPage;
