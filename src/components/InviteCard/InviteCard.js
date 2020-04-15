import React, { useState } from 'react';
function InviteCard(props) {
    const [email, setEmail] = useState('');
    function handleInputChange(e) {
        setEmail(e.target.value);
    }
    return (
        <div style={{ margin: '10px' }}>
            <label>Invite user to Dashboard: </label>
            <br></br>
            <input
                type="text"
                placeholder="enter email"
                value={email}
                onChange={handleInputChange}
            />
            <button
                onClick={() => {
                    props.inviteUser(email);
                    setEmail('');
                }}
            >
                Invite
            </button>
        </div>
    );
}

export default InviteCard;
