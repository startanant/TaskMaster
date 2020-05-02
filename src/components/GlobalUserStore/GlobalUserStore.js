import React, { useReducer, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UserData = React.createContext();

function Reducer(state, action) {
    console.log('Reducer function called...');
    console.log('state is', state);
    console.log('action is', action.type);
    let user = { ...state };
    switch (action.type) {
        case 'ADD_COLUMN':
            const newColumn = {
                name: '',
                id: uuidv4(),
                cards: [],
            };
            // columns.push(newColumn);
            user.dashboards[action.payload.currentDashboard].columns.push(
                newColumn
            );
            // updateUserProfile(user);
            // socket.emit('update', 'column added', newColumn.id);
            return user;
        case 'ADD_CARD':
            const newCard = {
                title: '',
                id: uuidv4(),
                duedate: '',
                lables: ['Important', 'Medium', 'Low'],
                description: '',
                asignee: [''],
            };
            user.dashboards[action.payload.currentDashboard].columns[
                action.payload.columnIndex
            ].cards.push(newCard);
            return user;
    }
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
    // useEffect();

    return <UserData.Provider value={[userProfile, dispatch]} {...props} />;
}

function useGlobalUserStore() {
    return useContext(UserData);
}

export { GlobalUserStore, useGlobalUserStore };
