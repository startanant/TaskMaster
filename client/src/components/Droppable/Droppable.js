import React from 'react';
import PropTypes from 'prop-types';

function Droppable(props) {
    function drop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('transfer');
        console.log('transfer data', data);
        e.target.appendChild(document.getElementById(data));
        console.log('something dropped on me!', e.current.id);
    }

    function allowDrop(e) {
        e.preventDefault();
    }
    return (
        <div
            id={props.id}
            onDrop={drop}
            onDragOver={allowDrop}
            style={props.style}
        >
            {props.children}
        </div>
    );
}

Droppable.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
};

export default Droppable;
