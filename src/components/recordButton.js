import React from 'react';
import PropTypes from 'prop-types';

const RecordButton = (props) => {
    return(
        <button isRecording = {props.isRecording} onClick={props.onClick} >Loop</button>
    )
}

export default RecordButton