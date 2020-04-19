import React from 'react';
import '../../components-style.css';
import TextArea from '../TextArea/TextArea';
import DueDate from '../DueDate/DueDate';
import AssignCard from '../AssignCard/AssignCard';

function Card(props) {
    console.log('logging props passed to Card', props);
    const style = {
        backgroundColor: 'grey',
        color: 'blue',
        // height: '40px',
        padding: '5px',
        textAlign: 'center',
        // width: '200px',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
        // position: 'fixed',
    };
    return (
        <>
            <div className="card">
                <div className="card-utility-header">
                    <button
                        type="button"
                        className="btn-sm btn-outline-secondary"
                        onClick={() =>
                            props.deleteCard(props.colIndex, props.cardIndex)
                        }
                    >
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
                <div className="card-header">
                    <TextArea
                        id={'title' + props.cardid}
                        value={props.title}
                        placeholder="Title"
                    />
                </div>
                <div className="card-body">
                    <TextArea
                        id={'desc' + props.cardid}
                        placeholder="Description"
                        value={props.description}
                    />
                    <DueDate id={'date' + props.cardid} value={props.dueDate} />
                    <AssignCard
                        id={'email' + props.cardid}
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
