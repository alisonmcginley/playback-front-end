
import React from 'react';
import PropTypes from 'prop-types';
import './note.css';


const Note = (props) => {

    const playCallBack = (e) => {
        props.keyCallBack(e, props.keyAssignment)
    }
    return <button onKeyPress={(e) => playCallBack(e)} key = {props.key} keyAssignment= {props.keyAssignment} className ="note" tabindex="0">Note</button>   
};

Note.propTypes = {
    keyCallBack: PropTypes.func,
    keyAssignment: PropTypes.string,

};
// write api call based on Note.instrument
export default Note