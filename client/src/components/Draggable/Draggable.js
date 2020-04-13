import React from 'react';
import PropTypes from 'prop-types';

function Draggable(props) {
    function drag(e) {
        e.dataTransfer.setData('transfer', e.target.id);
    }

    function noAllowDrop(e) {
        e.stopPropagation();
    }
    return (
        <div
            data-colIndex={props.colIndex}
            data-cardIndex={props.cardIndex}
            id={props.id}
            draggable="true"
            onDragStart={drag}
            onDragOver={noAllowDrop}
            style={props.style}
            onBlur={() =>
                props.saveCard(props.cardid, props.colIndex, props.cardIndex)
            }
        >
            <button
                onClick={() =>
                    props.deleteCard(props.colIndex, props.cardIndex)
                }
            >
                <i class="far fa-trash-alt"></i>
            </button>
            {/* <button
                onClick={() =>
                    props.saveCard(props.cardid, props.colIndex, props.index)
                }
            >
                <i class="far fa-save"></i>
            </button> */}

            {props.children}
        </div>
    );
}

Draggable.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
};

export default Draggable;
