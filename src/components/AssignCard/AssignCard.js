import React, { useState } from 'react';

function AssignCard(props) {
    const [email, setEmail] = useState(props.shared);
    
    return (
        <div>
            <select>
                {email.map(email=>{
                    return <option value={email}>{email}</option>
                })}
                
            </select>
            <button>Invite</button>
        </div>
    );
}

export default AssignCard;
