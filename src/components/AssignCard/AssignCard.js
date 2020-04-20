import React, { useState, useRef } from 'react';

function AssignCard(props) {
    const [email, setEmail] = useState(props.shared);
    const [shared, setShared] = useState([]);
    const selected = useRef(null);

    function testAssign(){
        console.log("Assign to card")
    }

    return (
        <>
            {/* <div>
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
            })} */}

            <div>
                {/* <select ref={selected} id={props.id}>
                    {email.map((email) => {
                        return <option>{email.email}</option>;
                    })}
                </select> */}

                <div className="btn-group">
                    <button 
                        type="button"
                        className="btn btn-sm btn-primary dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false"
                        id={props.id}
                    >
                        Team Members
                    </button>
                    <div className="dropdown-menu">
                        {email.map( (element) => {
                            return (
                            <div>
                                <a 
                                    className="dropdown-item" 
                                    onClick={testAssign}
                                    href="#"
                                    >
                                        {element.name} - {element.email}
                                </a>
                            </div> 
                            )
                        })}
                    </div>
                </div>
                
                <button
                    className="btn btn-sm btn-secondary"
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
