import React, { useState } from 'react';

function DueDate(props) {
    const [value, setValue] = useState(props.value);
    function handleInputChange(e) {
        setValue(e.target.value);
    }
    return (
        <div className="dueDate-cal">
            <input
                id={props.id}
                type="date"
                value={value}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default DueDate;
