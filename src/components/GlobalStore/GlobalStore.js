import React, { useContext, useReducer } from "react";
const GlobalData = React.createContext();

function dispatcher(state, action) {
    let newState = { ...state };
    switch (action.do) {
        case 'setMessage':
            newState.messageType = action.type;
            newState.message = action.message;
            console.log(`[GlobalStore:setMessage] set our message: ${action.message}`);
            return newState;

        case 'clearMessage':
            newState.messageType = ''; newState.message = '';
            return newState;

        case 'loginState':
            newState.loggedIn = action.loggedIn;
            return newState;

        case 'setUserData':
            newState = { ...newState, ...action.data };
            return newState;

        default:
            console.log(`[ERROR] Sorry, unknown do-action: ${action.do}`);
            break;
    }
}

function GlobalStore(props) {
    const [globalData, dispatch] = useReducer(dispatcher,
        { messageType: '', message: '', loggedIn: false});

    return (
        <GlobalData.Provider value={[globalData, dispatch]} {...props} />
    )
}

function useGlobalStore() {
    return useContext(GlobalData);
}

export { GlobalStore, useGlobalStore };