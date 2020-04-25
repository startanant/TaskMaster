import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';

function Chat() {
    const [value, setValue] = useState('');
    // const socket = openSocket('http://localhost:8080');
    // socket.on('update', (msg) => {
    //     // document.getElementById('m').value = msg;
    //     setValue('s:' + socket.id + 'm:' + msg);
    // });
    return (
        <div>
            <p style={{ color: 'white' }}>{value}aaa</p>
        </div>
    );
}
export default Chat;
