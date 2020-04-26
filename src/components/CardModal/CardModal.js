import React from 'react';
import Modal from 'react-bootstrap/Modal';
import TextArea from '../TextArea/TextArea';

function CardModal(props){

    // const [cardModal, setCardModal] = useState(false);

    // function showModal() {
    //     setCardModal(true);
    // }

    // function hideModal() {
    //     setCardModal(false);
    // }
    function modalSave(){
        console.log("saving modal card")
        console.log("cardid, colIndex, cardIndex", props.cardid, props.colIndex, props.cardIndex)
        props.saveCard(props.cardid, props.colIndex, props.cardIndex)
    }

    return (
        
        <Modal 
            show={props.cardModal} 
            onHide={props.hideModal}
            id={'modal' + props.modalid}
            >
            <Modal.Header>
                <Modal.Title>
                    {props.title}
                    <TextArea
                        id={'title' + props.modalid}
                        value={props.title}
                        placeholder="Title"
                    />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.description}</Modal.Body>
            <Modal.Footer>
                <button
                    onClick={modalSave}
                    type="button"
                    className="btn btn-primary"
                    >
                    Save
                </button>
            </Modal.Footer>
        </Modal>
        
    );
};

export default CardModal;