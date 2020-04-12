import React from 'react';
import TextArea from '../TextArea/TextArea';
import DueDate from '../DueDate/DueDate';

function Card(props) {
    console.log('logging props passed to Card', props);
    const style = {
        backgroundColor: 'yellow',
        color: 'blue',
        // height: '40px',
        padding: '5px',
        textAlign: 'center',
    };
    return (
        <div style={style} id={props.cardid}>
            {/* <textarea
                id={'title' + props.cardid}
                type="text"
                placeholder="Title"
                value={props.title}
            /> */}
            <TextArea
                id={'title' + props.cardid}
                value={props.title}
                placeholder="Title"
            />
            <hr></hr>
            <TextArea
                id={'desc' + props.cardid}
                placeholder="Description"
                value={props.description}
            />
            <hr></hr>
            {/* <input
                id={'date' + props.cardid}
                type="date"
                value={props.dueDate}
            /> */}
            <DueDate id={'date' + props.cardid} value={props.dueDate} />
        </div>
    );
}

export default Card;
