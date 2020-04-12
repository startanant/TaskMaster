import React, { useState } from 'react';

function TextArea(props) {
    const [value, setValue] = useState(props.value);
    function handleInputChange(e) {
        setValue(e.target.value);
    }
    return (
        <textarea
            id={props.id}
            onChange={handleInputChange}
            value={value}
            placeholder={props.placeholder}
        />
    );
}

export default TextArea;
