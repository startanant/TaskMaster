import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

function Chat() {
    const [value, setValue] = useState('');

    useEffect(() => {
        socket.on('update', (msg) => {
            // document.getElementById('m').value = msg;
            setValue(msg);
        });
    }, []);
    return (
        <div>
            <p>{value}aaa</p>
        </div>
    );
}
export default Chat;
