import React, { useReducer, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UserData = React.createContext();

function Reducer(state, action) {
    console.log('Reducer function called...');
    console.log('state is', state);
    console.log('action is', action.type);
    console.log('payload is', action.payload);
    const newState = { ...state };
    switch (action.type) {
        case 'ADD_COLUMN':
            const newColumn = {
                name: '',
                id: uuidv4(),
                cards: [],
            };
            // columns.push(newColumn);
            newState.dashboards[action.payload.currentDashboard].columns.push(
                newColumn
            );
            // updateUserProfile(user);
            // socket.emit('update', 'column added', newColumn.id);
            return newState;
        case 'ADD_CARD':
            const currentDashboard = action.payload.currentDashboard;
            const columnIndex = action.payload.columnIndex;
            const newCard = {
                title: '',
                id: uuidv4(),
                duedate: '',
                lables: ['Important', 'Medium', 'Low'],
                description: '',
                asignee: [''],
            };
            newState.dashboards[currentDashboard].columns[
                columnIndex
            ].cards.push(newCard);
            return newState;
        case 'SET_USER':
            return action.payload.user;
        case 'SET_CURRENT_USER':
            return action.payload.email;
        case 'CHANGE_DASHBOARD':
            return action.payload.currentDash;
    }
    return state;
}
function GlobalUserStore(props) {
    const userInitialState = {
        email: 'hello',
        name: '',
        firstname: '',
        lastname: '',
        dashboards: [{ columns: [], shared: [] }],
    };
    const [userProfile, dispatch] = useReducer(Reducer, userInitialState);
    const [currentDash, setCurrentDash] = useReducer(Reducer, 0);
    const [currentUser, setCurrentUser] = useReducer(Reducer, '');

    async function getUser(email) {
        // function populateShared() {
        //     // console.log('SHARED To USER LENGTH IS:', sharedTo.length);
        //     sharedTo.forEach((elem, index) => {
        //         elem.sharedByUser[0].dashboards.forEach((el, idx) => {
        //             user.dashboards.push(elem.dashboards[el]);
        //         });
        //     });
        //     // setUser({ ...user });
        // }
        const url = `/api/getUser/${email}`;
        const result = await fetch(url).then((response) => response.json());
        console.log('loggin getUser response from server: ', result);
        const user = result[0][0];
        const sharedTo = result[1];
        // console.log('LOGGING getUSer call sharedTo', sharedTo);
        // const sharedFrom = result[2];
        // console.log('logging sharedTo', sharedTo);
        // console.log('logging sharedFrom', sharedFrom);
        // populateShared();
        dispatch({ type: 'SET_USER', payload: { user: user } });
        // await setUser({ ...user });
        setCurrentUser({
            type: 'SET_CURRENT_USER',
            payload: { email: user.email },
        });
        // await setCurrentUser(user.email);
        // await setCurrentDashboard(0);
        // setSharedFromUser([...sharedFrom]);
        // await setSharedToUser([...sharedTo]);
        // socket.emit('username', user.email);
        //adding shared dashboards to user dashboard list
        // await socketOpen();
    }
    useEffect(function () {
        getUser('irek@irek.com');
    }, []);

    return (
        <UserData.Provider
            value={[
                userProfile,
                dispatch,
                currentDash,
                setCurrentDash,
                currentUser,
                setCurrentUser,
            ]}
            {...props}
        />
    );
}

function useGlobalUserStore() {
    return useContext(UserData);
}

export { GlobalUserStore, useGlobalUserStore };
