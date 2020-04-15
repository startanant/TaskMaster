import React, { useState, useRef } from 'react';

function SwitchUser(props) {
    // const [email, setEmail] = useState(props.shared);
    console.log('loggin props from SwitchUserComponent', props);
    const email = props.shared;
    const selection = useRef(null);

    return (
        <div style={{ margin: '10px' }}>
            <select
                ref={selection}
                onChange={() => props.switchUser(selection.current.value)}
            >
                {email.map((element) => {
                    return (
                        <option value={element.email}>{element.email}</option>
                    );
                })}
            </select>
            <button onClick={() => props.switchUser(selection.current.value)}>
                Switch User
            </button>
        </div>
    );
}
export default SwitchUser;
