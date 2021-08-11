import React from 'react';
import PropTypes from 'prop-types';
import './note.css';


const Note = (props) => {

    return <span onKeyPress={props.keyCallBack(props.keyAssignment)} key = {props.key} keyAssignment= {props.keyAssignment} className ="note" tabindex="0">Note</span>   
};

Note.propTypes = {
    keyCallBack: PropTypes.func,
    keyAssignment: PropTypes.string,

};
// write api call based on Note.instrument
export default Note