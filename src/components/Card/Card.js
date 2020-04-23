import React, {useState} from 'react';
import ReactDOM from "react-dom";
import '../../components-style.css';
import TextArea from '../TextArea/TextArea';
import TextAreaDesc from '../TextAreaDesc/TextAreaDesc';
import DueDate from '../DueDate/DueDate';
import AssignCard from '../AssignCard/AssignCard';

import ModalTest from '../ModalTest/ModalTest';
// import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function Card(props) {
    // console.log('logging props passed to Card', props);

    const [ modal, setModal ] = useState(false);

    const showModal = () => {
        setModal(true);
      };

    // function showModal(){
    //     console.log("setting modal", modal)
    //     setModal(true)
    //     console.log("modal set", modal)
    // }

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
                        id={'title' + props.cardid}
                        value={props.title}
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
                        id={'desc' + props.cardid}
                        placeholder="Description"
                        value={props.description}
                    />
                    <DueDate id={'date' + props.cardid} value={props.dueDate} />
                    {/* <AssignCard
                        id={'email' + props.cardid}
                        shared={props.shared}
                        colIndex={props.colIndex}
                        cardIndex={props.cardIndex}
                        assignToCard={props.assignToCard}
                    /> */}
                </div>
                <ModalTest 
                    colNum={props.colIndex} 
                    cardNum={props.cardIndex}
                    id={'modal' + props.cardid}
                    titleValue={props.title}
                />
                <button onClick={showModal}type="button" className="btn btn-success">Show Modal</button>
                {/* <Modal show={modal}>
                    <h1>Here is the modal</h1>
                </Modal> */}

                
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
