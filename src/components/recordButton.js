import React from 'react';
import "./controlButtons.css"
import PropTypes from 'prop-types';

const RecordButton = (props) => {
    return(
        <button isrecording = {props.isrecording} onClick={props.onClick} className="controlButton">Record</button>
    )
}

export default RecordButton