import React, {useState, useEffect} from 'react';


function Modal(props){
    const [value, setValue] = useState(props.value);
    function handleInputChange(e) {
        setValue(e.target.value);
    }

    const colNum = props.colNum;
    const cardNum = props.cardNum;

    useEffect( function(){
        setValue(props.value);
        console.log("modal value >>>>", value)    
        console.log(`Button CLICKED === COL: ${colNum} CARD: ${cardNum}`)
    }, [])
    
    return (

        <>
    
            <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModal">
            Modal
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    

                    <div className="modal-header">
                        <button type="button" className="btn btn-outline-success btn-sm">Complete</button>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-header">
  
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="modal-title">Kickoff Meeting</h4>
                            </div>
                            <div className="col-md-12">
                                <h6 className="modal-title">This meeting is to kick off the upcoming development project with the client.</h6>
                            </div>
            
                            <div className="col-md-12">
                                Priority:
                                <div className="btn-group">
                                    <button type="button" className="btn-sm btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    High
                                    </button>
                                    <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">High</a>
                                    <a className="dropdown-item" href="#">Medium</a>
                                    <a className="dropdown-item" href="#">Low</a>
                                    </div>
                                </div>
                            </div>
            
                        </div>
                    </div> 



                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    
                        </button>
                   
                    <div className="modal-body">
                    <form>
                        <div className="form-row align-items-center">
                            <div className="col-auto textArea">
                                <input 
                                    type="text" 
                                    className="form-control mb-2" 
                                    id={props.id}
                                    onChange={handleInputChange} 
                                    value={value} 
                                    placeholder={props.placeholder}
                                />
                            </div>
                        </div>
                    </form>
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
            </div>



        </>
    )
}

export default Modal;