import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import axios from 'axios';

// instruments should be a selector component that edits state
// pass down instrument selection to notes component
const keyAssignments =[
    {"q": ""},    
    {"w": ""},
    {"e": ""},
    {"r": ""},
    {"t": ""},
    {"y": ""},
    {"u": ""},
    {"i": ""},
    {"o": ""},
    {"p": ""}
  ]

const setNotes = (instrument, playNote) => {
    for(let i =0; i< instrument.length; i++){
        keyAssignments[i] = instrument[i]["AUDIO_URI"]
    }
    console.log(keyAssignments)
    const noteComponents = instrument.map(note => {
    return (
        <Note id={note.AUDIO_URI} key = {note._id} keyCallBack = {playNote}/>
    )

});
    return (
        <div class="notes">
           {noteComponents} 
        </div>
    )

};
const Instrument = ({ instrument, playNote}) => {
    const noteList = setNotes(instrument, playNote);
    console.log(noteList)
    return <div>
        {noteList}
    </div>

};

Instrument.propTypes = {
    instrument: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        index: PropTypes.number,
        name: PropTypes.string,
        AUDIO_URI: PropTypes.string
    })),
    playNote: PropTypes.func
}
// response from API should return an array of entire objects
// so that I can pass in entire object props here

export default Instrument