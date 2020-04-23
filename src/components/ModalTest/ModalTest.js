import React, {useState} from 'react';
import '../../components-style.css';



function ModalTest(){
    const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    function showModal(){
      console.log(">> setting modal show to true")
      setShow(true);
    };
    function hideModal(){
      console.log(">> setting modal show to false")
      setShow(false)
    }


    function handleClick(){
      console.log("modal clicked");
      showModal();
    };
    
    return (
        <>

        +++[MODAL]+++
        <button 
          type="button" 
          className="btn btn-danger"
          onClick={handleClick}
          >
            MODAL
        </button>
      { show ? (
        <div className="modal">This is the MODAL</div>
      ): null}

    
    </>
  
    );
};

export default ModalTest;