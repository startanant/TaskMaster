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


    return (
        <>
        <Modal show={props.cardModal} onHide={props.hideModal}>
            <Modal.Header>
                <Modal.Title>
                    {props.title}
                    <TextArea
                        id={'title' + props.cardid}
                        value={props.title}
                        placeholder="Title"
                    />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.description}</Modal.Body>
            <Modal.Footer>
            <button onClick={props.hideModal}>Cancel</button>
            <button>Save</button>
            </Modal.Footer>
        </Modal>
        </>
    );
};

export default CardModal;