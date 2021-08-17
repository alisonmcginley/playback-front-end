import React from 'react';
import PropTypes from 'prop-types';

const RecordButton = (props) => {
    return(
        <button isrecording = {props.isrecording} onClick={props.onClick} >Record</button>
    )
}

export default RecordButton