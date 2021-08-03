import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note'
// instruments should be a selector component that edits state
// pass down instrument selection to notes component
const setNotes = (notes) => {
    return (
        <Note />
    )
}
const Instrument = (notes) => {
    setNotes(notes);
};

Instrument.propTypes = {
    notes: PropTypes.string.isRequired
}

export default Instrument