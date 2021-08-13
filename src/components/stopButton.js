import React from 'react';
import PropTypes from 'prop-types';

const StopButton = (props) => {
    return(
        <button isPlaying = {props.isPlaying} onClick={props.onClick} >Stop</button>
    )
}

export default StopButton