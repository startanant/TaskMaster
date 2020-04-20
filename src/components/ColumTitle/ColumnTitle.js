import React, { useState } from 'react';

function ColumnTitle(props) {
    const [title, setTitle] = useState(props.title);
    function handleInputChange(e) {
        setTitle(e.target.value);
    }
    return (
        <form>
            <div className="form-row align-items-center col-title">
                <div className="col-auto">
                    <input 
                        type="text" 
                        className="form-control mb-2" 
                        id={props.id}
                        onChange={handleInputChange} 
                        value={title} 
                        placeholder="Add column title"
                        onBlur={() => props.updateColumnTitle(props.index, title)}
                    />
                </div>
            </div>
        </form>
    );
}
export default ColumnTitle;
