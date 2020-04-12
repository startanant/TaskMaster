import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import Draggable from '../Draggable/Draggable';
import styled from 'styled-components';
import ColumnTitle from '../ColumTitle/ColumnTitle';

function Column(props) {
    const cardStyle = styled.div`
        padding: 8px;
        color: #555;
        background-color: white;
        border-radius: 3px;
    `;
    console.log('showing props.columns from column component', props.cards);
    const [cards, setCard] = useState(props.cards ? props.cards : []);
    // const [id, setId] = useState(props.id);

    function drop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('transfer');
        console.log(data);
        // console.log(document.getElementById('abc'));
        let toDrop = document.getElementById(data);
        e.target.appendChild(toDrop);
        console.log('dropped element', document.getElementById(data));
        // document.removeChild(document.getElementById(data));
        let element = document.getElementById(data);
        element.parentNode.removeChild(element);
        console.log('something dropped on me!');
        addCard();
        let col = document.getElementById('qaz');
        console.log(col.childNodes);
        console.log(col.childNodes[2].childNodes.length);

        // addCard();
    }

    function allowDrop(e) {
        e.preventDefault();
    }

    function addCard() {
        cards.push({ title: 'new card', duedate: Date.now() });
        setCard([...cards]);
    }

    // function deleteCard(e) {
    //     console.log('delete card clicked', e.target);
    // }
    function dragEnd() {
        console.log('drag ended');
    }
    return (
        <div
            id={props.id}
            onDrop={drop}
            onDragOver={allowDrop}
            style={props.style}
            onDragEnd={dragEnd}
        >
            <div
                style={{
                    textAlign: 'center',
                    backgroundColor: 'yellow',
                    color: 'blue',
                }}
            >
                {props.colTitle}
                <button
                    style={{ float: 'right', backgroundColor: 'yellow' }}
                    onClick={() => props.deleteColumn(props.colIndex)}
                >
                    <i class="far fa-trash-alt"></i>
                </button>
                <hr></hr>
            </div>
            <div
                style={{
                    textAlign: 'center',
                    backgroundColor: 'yellow',
                    color: 'blue',
                }}
            >
                <button onClick={() => props.addCard(props.colIndex)}>
                    Add New Card
                </button>
            </div>

            {cards.map((element, index) => {
                let value = Math.random().toString();
                return (
                    <Draggable
                        id={value}
                        style={{ margin: '8px' }}
                        index={index}
                        colIndex={props.colIndex}
                        deleteCard={props.deleteCard}
                        cardid={element.cardid}
                        saveCard={props.saveCard}
                    >
                        <Card
                            text={value}
                            title={element.title}
                            dueDate={element.duedate}
                            description={element.description}
                            cardid={element.cardid}
                            columnid={props.colid}
                        />
                    </Draggable>
                );
            })}

            {props.children}
        </div>
    );
}

Column.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
};

export default Column;
