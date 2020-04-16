import React, { useState, useRef } from 'react';
function InviteCard(props) {
    const [email, setEmail] = useState('');
    const sharedDashboards = props.sharedByUser ? props.sharedByUser : [];
    function handleInputChange(e) {
        setEmail(e.target.value);
    }

    function RenderList(props) {
        const select = useRef(null);
        if (!props.render) {
            return <div>You are not sharing any dashboards</div>;
        }
        return (
            <div>
                You are sharing your dashbords<br></br>
                <select ref={select}>
                    <option></option>
                    {sharedDashboards.map((dash) => {
                        return (
                            <>
                                <option>{dash.to}</option>
                            </>
                        );
                    })}
                </select>
                <button
                    onClick={() => props.uninviteUser(select.current.value)}
                >
                    Del
                </button>
            </div>
        );
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
            <br></br>
            {sharedDashboards.length > 0 ? (
                <RenderList uninviteUser={props.uninviteUser} render={true} />
            ) : (
                <RenderList render={false} />
            )}
        </div>
    );
}

export default InviteCard;
