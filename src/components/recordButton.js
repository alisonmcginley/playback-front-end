import React from 'react';
import PropTypes from 'prop-types';

const RecordButton = (props) => {
    return(
        <button isRecording = {props.isRecording} onClick={props.onClick} >Record</button>
    )
}

export default RecordButton