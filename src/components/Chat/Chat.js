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
            // socket = openSocket(`https://taskmaster.kiterunner.usermd.net`, {
            //     query: `chatuser=chat_${props.user}&dash=${props.dashid}`,
            // });
            if (socket) {
                socket.emit('chatchange', props.user, oldDashID);
                console.log('sending chat message to:', props.dashid);
                socket.emit('chatopen', props.user, props.dashid);
            }
            // setSocket(socket);
            socket.on('chat', (user, msg) => {
                console.log('receiving chat message', user, msg);
                receiveMessage(user, msg);
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

        if (socket) {
            console.log('sending chat message to:', props.dashid);
            socket.emit('chat', props.user, value, props.dashid);
        }
    }
    function receiveMessage(user, msg) {
        if (!msg) {
            msg = '';
        }
        console.log('receive message called');
        const ul = document.getElementById('messages');
        let li = document.createElement('li');
        li.innerHTML =
            `${user}:</br>` + `<span style="color:white">${msg}</span>`;
        li.style = 'font-size:0.9rem;color:grey;padding:2px';
        // ul.appendChild(li);
        ul.insertBefore(li, ul.childNodes[0]);
    }

    return (
        <>
            <div
                style={{
                    color: 'white',
                    position: 'fixed',
                    bottom: '50px',
                    right: '40px',
                    border: '1px solid white',
                    height: '150px',
                    width: '250px',
                    overflow: 'hidden',
                    overflowY: 'scroll',
                }}
            >
                <ul
                    id="messages"
                    style={{
                        listStyle: 'none',
                        paddingLeft: '0.5rem',
                        margin: 0,
                        wordWrap: 'break-word',
                    }}
                ></ul>
            </div>
            <div
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '40px',
                    width: '250px',
                    height: '20px',
                    paddingLeft: '0px',
                    paddingTop: '5px',
                }}
            >
                <input
                    style={{ width: '70%' }}
                    onChange={handleInputChange}
                    type="text"
                    value={value}
                />
                <button style={{ width: '30%' }} onClick={handleNewMessage}>
                    Send
                </button>
            </div>
        </>
    );
}
export default Chat;
