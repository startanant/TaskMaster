import React from 'react';
import '../../components-style.css';
import TextArea from '../TextArea/TextArea';
import TextAreaDesc from '../TextAreaDesc/TextAreaDesc';
import DueDate from '../DueDate/DueDate';
import AssignCard from '../AssignCard/AssignCard';

function Card(props) {
    // console.log('logging props passed to Card', props);
    const card = props.card;
    function setAccordShow(id) {
        console.log('Btn clicked -- card ID:', id);
    }

    return (
        <>
            <div className="card">
                <div className="card-utility-header">
                    <button
                        type="button"
                        className="btn-sm btn-outline-secondary cardDelBtn"
                        onClick={() =>
                            props.deleteCard(props.colIndex, props.cardIndex)
                        }
                    >
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
                <div className="card-header">
                    <TextArea
                        id={'title' + card.id}
                        value={card.title}
                        placeholder="Title"
                    />
                </div>
                <div className="card-body">
                    {/* <TextArea
                        id={'desc' + props.cardid}
                        placeholder="Description"
                        value={props.description}
                    /> */}
                    <TextAreaDesc
                        id={'desc' + card.id}
                        placeholder="Description"
                        value={card.description}
                    />
                    <DueDate id={'date' + card.id} value={card.dueDate} />
                    <AssignCard
                        id={'email' + card.id}
                        shared={props.shared}
                        colIndex={props.colIndex}
                        cardIndex={props.cardIndex}
                        assignToCard={props.assignToCard}
                    />
                </div>
            </div>

            {/* <div style={style} id={props.cardid}> */}
            {/* <textarea
                id={'title' + props.cardid}
                type="text"
                placeholder="Title"
                value={props.title}
            /> */}
            {/* <TextArea
                id={'title' + props.cardid}
                value={props.title}
                placeholder="Title"
            /> */}

            {/* <input
                id={'date' + props.cardid}
                type="date"
                value={props.dueDate}
            /> */}

            {/* <button>Close</button> */}
        </>
    );
}

export default Card;
