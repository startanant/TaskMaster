import React, { useContext, useReducer, useEffect } from "react";
import * as SecureStorage from "secure-web-storage";
import * as CryptoJS from 'crypto-js';

var SECRET_KEY = 'S3cr@7!';

var secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, SECRET_KEY);

        return key.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);

        data = data.toString();

        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);

        data = data.toString(CryptoJS.enc.Utf8);

        return data;
    }
});

const GlobalData = React.createContext();
const localState = JSON.parse(secureStorage.getItem("info"));

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
    const initialState = { messageType: '', message: '', loggedIn: false };
    // const [globalData, dispatch] = useReducer(dispatcher,
    //     { messageType: '', message: '', loggedIn: false});
    const [globalData, dispatch] = useReducer(dispatcher,
        localState || initialState);
    
    useEffect(() => {
        secureStorage.setItem("info", JSON.stringify(globalData));
    }, [globalData]);
    

    return (
        <GlobalData.Provider value={[globalData, dispatch]} {...props} />
    )
}

function useGlobalStore() {
    return useContext(GlobalData);
}

export { GlobalStore, useGlobalStore };