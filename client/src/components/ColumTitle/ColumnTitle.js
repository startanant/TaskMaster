import React, { useState } from 'react';

function ColumnTitle(props) {
    const [title, setTitle] = useState(props.title);
    function handleInputChange(e) {
        setTitle(e.target.value);
    }
    return (
        <input
            style={{
                backgroundColor: 'yellow',
                border: 'none',
                textAlign: 'center',
            }}
            type="text"
            placeholder="Add column title"
            value={title}
            onChange={handleInputChange}
            onBlur={() => props.updateColumnTitle(props.index, title)}
        />
    );
}
export default ColumnTitle;
