import React, { useState, useEffect } from 'react';
import '../../components-style.css';
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

    const [show, setShow] = useState(false);

    function showModal() {
        console.log('showModal function called...');
        setShow(true);
    }

    function hideModal() {
        console.log('hideModal function called...');
        setShow(false);
    }

    function drop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('transfer');
        console.log('id of transferred element', data);
        // console.log(document.getElementById('abc'));
        let toDrop = document.getElementById(data);
        e.target.appendChild(toDrop);
        // console.log('dropped element', document.getElementById(data));
        let droppedCard = document.getElementById(data);
        console.log(
            'dropped card dataset',
            'colIndex: ',
            droppedCard.dataset.colindex,
            'cardIndex: ',
            droppedCard.dataset.cardindex
        );
        console.log(
            `dropped card content on column ${props.colIndex}`,
            'TITLE',
            droppedCard.children[1].children[0].value
        );
        console.log(
            'dropped card content DESCRIPTION',
            droppedCard.children[1].children[2].value
        );
        console.log(
            'dropped card content DUE DATE',
            droppedCard.children[1].children[4].value
        );
        // console.log('dropped card children', droppedCard.children[1].children);
        // document.removeChild(document.getElementById(data));
        let element = document.getElementById(data);
        element.parentNode.removeChild(element);
        // console.log('something dropped on me!');
        // addCard();
        let dataToPass = {
            toAdd: {
                colIndex: props.colIndex,
                title: droppedCard.children[1].children[0].value,
                description: droppedCard.children[1].children[2].value,
                duedate: droppedCard.children[1].children[4].value,
            },
            toRemove: {
                colIndex: droppedCard.dataset.colindex,
                cardIndex: droppedCard.dataset.cardindex,
            },
        };
        props.updateCardsOnDrop(dataToPass);
        // let col = document.getElementById('qaz');
        // console.log(col.childNodes);
        // console.log(col.childNodes[2].childNodes.length);

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
            className="project-column" 
            id={props.id}
            onDrop={drop}
            onDragOver={allowDrop}
            style={props.style}
            onDragEnd={dragEnd}
            key={Math.random()}
        >   
            <div className="column-header">
            <button
                type="button"
                className="btn-sm btn-dark"
                onClick={() => props.deleteColumn(props.colIndex)}
      >
        <i class="far fa-trash-alt"></i>
      </button>
      </div> 
            <div
                style={{
                    textAlign: 'center',
                    backgroundColor: 'grey',
                    color: 'blue',
                }}
            >
                {props.colTitle}
                <button
                    style={{ float: 'right', backgroundColor: 'grey' }}
                    onClick={() => props.deleteColumn(props.colIndex)}
                >
                    <i class="far fa-trash-alt"></i>
                </button>
                <hr></hr>
            </div>
            <div
                style={{
                    textAlign: 'center',
                    backgroundColor: 'grey',
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
                        cardIndex={index}
                        colIndex={props.colIndex}
                        deleteCard={props.deleteCard}
                        cardid={element.cardid}
                        saveCard={props.saveCard}
                        key={Math.random()}
                        show={show}
                        handleModalClose={hideModal}
                        handleModalOpen={showModal}
                    >
                        <Card
                            text={value}
                            title={element.title}
                            dueDate={element.duedate}
                            description={element.description}
                            cardid={element.cardid}
                            columnid={props.colid}
                            key={Math.random()}
                            shared={props.shared}
                            asignee={element.asignee}
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
