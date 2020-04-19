import React, { useState } from 'react';
import '../../components-style.css';

function TextAreaDesc(props) {
    const [value, setValue] = useState(props.value);
    function handleInputChange(e) {
        setValue(e.target.value);
    }
    return (
        <form>
        <div className="form-row align-items-center">
          <div className="col-auto textArea">
            <textarea 
              type="text" 
              className="form-control mb-2 textAreaDesc" 
              id={props.id}
              onChange={handleInputChange} 
              value={value} 
              placeholder={props.placeholder}
              rows="3"
            />
          </div>
        </div>
      </form>
    );
}

export default TextAreaDesc;