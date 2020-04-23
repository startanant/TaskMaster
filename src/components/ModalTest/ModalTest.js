import React, {useState, useEffect} from 'react';
// import TextArea from '../TextArea/TextArea';


function ModalTest(props){
    const [value, setValue] = useState(props.value);
    const [titleValue, setTitleValue ] = useState(props.titleValue)


    function handleInputChange(e) {
        setValue(e.target.value);
    }
    function handleClick(e){
        e.preventDefault()
        console.log("button click", props.id, props.titleValue)
        // setTitleValue(props.titleValue)
    }
    const colNum = props.colNum;
    const cardNum = props.cardNum;

    // useEffect( function(){
    //     setValue(props.value);
    //     console.log("modal value >>>>", value)    
    //     console.log(`Button CLICKED === COL: ${colNum} CARD: ${cardNum}`)
    // }, [])
    
    return (

        <>
    
            <button id={props.id} onClick={handleClick}type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModal">
            Modal
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">

            <h1>Title: {titleValue}</h1>
                
        
                    

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
                                {props.ModalTitle}
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

                    <div class="modal-body">
                        <div class="row">
                            <div class="assign col-md-6">
                            <div class="row">
                                <div class="assigned-title col-md-6">
                                <h5>Assigned</h5>
                                {props.assignTeam}
                                </div>
                                <div class="plus-icon col-md-6">
                                <i class="fas fa-plus fa-1x"></i>
                                </div>
                            </div>
                            <div class="assignees-container">
                                <div class="assignee-icon">JC</div>
                                <div class="assignee-icon">PR</div>
                            </div>
                            </div>
            
                            <div class="dueDate col-md-6">
                            <div class="row">
                                <div class="date-title col-md-6">
                                <h5>Due Date</h5>
                                </div>
                                <div class="calendar-icon col-md-6">
                                <i class="far fa-calendar-times fa-2x"></i>
                                </div>
                            </div>
                            <div class="date-container">
                                <h5>April 15/20</h5>  
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

export default ModalTest;