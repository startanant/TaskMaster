import React, { useState, useEffect, useRef } from 'react';
import openSocket from 'socket.io-client';
let socket;
function Chat(props) {
    const [value, setValue] = useState('');
    // const [socket, setSocket] = useState(false);
    const [dashID, setDashID] = useState(props);
    const [oldDashID, setOldDashId] = useState(false);
    useEffect(() => {
        console.log('useEffect for SetDashID called!');
        setDashID(props.dashid);
        openChatSocket();
    }, [props.dashid]);
    useEffect(() => {
        setOldDashId(props.dashid);
    }, [props.dashid]);
    function openChatSocket() {
        if (props.dashid) {
            if (socket) {
                socket.disconnect(true);
            }
            console.log('opening socket for chat in chat component!');
            socket = openSocket(`http://localhost:8080`, {
                query: `chatuser=chat_${props.user}&dash=${props.dashid}`,
            });
            if (socket) {
                socket.emit('chatchange', props.user, oldDashID);
                console.log('sending chat message to:', props.dashid);
                socket.emit('chatopen', props.user, props.dashid);
            }
            // setSocket(socket);
            socket.on('chat', (msg) => {
                console.log('receiving chat message');
                receiveMessage(msg);
            });
        }
        return false;
    }
    // useEffect(() => {
    //     console.log('setting listener!');
    //     socket.on('chat', (msg) => {
    //         console.log('receiving chat message');
    //         receiveMessage(msg);
    //     });
    // }, [socket]);
    // useEffect(() => {
    //     setDashID(props.dashid);
    // }, []);
    // useEffect(() => {
    //     openChatSocket();
    // }, [dashID]);

    function handleInputChange(e) {
        setValue(e.target.value);
    }
    function handleNewMessage() {
        if (value == '') {
            return;
        }
        // const ul = document.getElementById('messages');
        // let li = document.createElement('li');
        // li.innerText = value;
        // ul.appendChild(li);
        if (socket) {
            console.log('sending chat message to:', props.dashid);
            socket.emit('chat', props.user, value, props.dashid);
        }
    }
    function receiveMessage(msg) {
        console.log('receive message called');
        const ul = document.getElementById('messages');
        let li = document.createElement('li');
        li.innerText = msg;
        ul.appendChild(li);
    }
    // useEffect(() => {
    //     if (socket) {
    //         socket.on('chat', (msg) => receiveMessage(msg));
    //     }
    // }, []);
    return (
        <div
            style={{
                color: 'white',
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                border: '1px solid white',
            }}
        >
            <ul id="messages" style={{}}></ul>
            <input onChange={handleInputChange} type="text" value={value} />
            <button onClick={handleNewMessage}>Send</button>
        </div>
    );
}
export default Chat;
