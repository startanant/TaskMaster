import React, { useState, useRef } from 'react';

function AssignCard(props) {
    const [email, setEmail] = useState(props.shared);
    const [shared, setShared] = useState([]);
    const selected = useRef(null);

    return (
        <>
            <div>
                <select ref={selected} id={props.id}>
                    {email.map((email) => {
                        return <option>{email.email}</option>;
                    })}
                </select>
                <button
                    onClick={() =>
                        props.assignToCard(
                            props.id,
                            props.colIndex,
                            props.cardIndex
                        )
                    }
                >
                    Assign
                </button>
            </div>
            {shared.map((email) => {
                return <div>{email.email}</div>;
            })}
        </>
    );
}

export default AssignCard;
