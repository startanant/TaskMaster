import React, { useState } from 'react';
import '../../components-style.css';

function TextArea(props) {
    const [value, setValue] = useState(props.value);
    function handleInputChange(e) {
        setValue(e.target.value);
    }
    return (
        <form>
        <div className="form-row align-items-center">
          <div className="col-auto textArea">
            <input 
              type="text" 
              className="form-control mb-2 textAreaCardTitle" 
              id={props.id}
              onChange={handleInputChange} 
              value={value} 
              placeholder={props.placeholder}
            />
          </div>
        </div>
      </form>
    );
}

export default TextArea;
