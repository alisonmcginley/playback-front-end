import React from 'react';
import PropTypes from 'prop-types';

const StopButton = (props) => {
    return(
        <button isplaying = {props.isplaying} onClick={props.onClick} >Stop</button>
    )
}

export default StopButton