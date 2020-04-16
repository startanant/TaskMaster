import React, { useState } from 'react';
function InviteCard(props) {
    const [email, setEmail] = useState('');
    function handleInputChange(e) {
        setEmail(e.target.value);
    }
    return (
        
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="email" 
                    aria-label="invite email" 
                    aria-describedby="invite email"
                    value={email}
                    onChange={handleInputChange}
                />
                <div class="input-group-append">
                    <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => {
                            props.inviteUser(email);
                            setEmail('');
                        }}
                    >
                    Invite
                    </button>
                </div>
            </div>
        

        // <div style={{ margin: '10px' }}>
        //     <label>Invite user to Dashboard: </label>
        //     <br></br>
        //     <input
        //         type="text"
        //         placeholder="enter email"
        //         value={email}
        //         onChange={handleInputChange}
        //     />
        //     <button
        //         onClick={() => {
        //             props.inviteUser(email);
        //             setEmail('');
        //         }}
        //     >
        //         Invite
        //     </button>
        // </div>
        
    );
}

export default InviteCard;
