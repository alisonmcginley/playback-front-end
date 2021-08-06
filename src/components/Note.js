import React from 'react';
import PropTypes from 'prop-types';
import './note.css';


const Note = (props) => {
    return <button instrument = {props.instrument} id = {props.id} className ="note">Note</button>   
};

Note.propTypes = {
    id: PropTypes.number.isRequired,
    instrument: PropTypes.string.isRequired
};
// write api call based on Note.instrument
export default Note