import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import axios from 'axios';

// instruments should be a selector component that edits state
// pass down instrument selection to notes component


const setNotes = (keyAssignments, playNote) => {
    const noteComponents = keyAssignments.map(note => {
    return (
        <Note keyEvent={note} key = {note._id} keyCallBack = {playNote}/>
    )

});
    return (
        <div class="notes">
           {noteComponents} 
        </div>
    )

};
const Instrument = ({ keyAssignments, playNote}) => {
    const noteList = setNotes(keyAssignments, playNote);
    console.log(noteList)
    return <div>
        {noteList}
    </div>

};

Instrument.propTypes = {
    keyAssignments: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        AUDIO_URI: PropTypes.string
    })),
    playNote: PropTypes.func
}
// response from API should return an array of entire objects
// so that I can pass in entire object props here

export default Instrument