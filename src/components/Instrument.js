import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note'
// instruments should be a selector component that edits state
// pass down instrument selection to notes component
const setNotes = (instrument) => {
    let currentId = 0;
    let notes = {};
    notes[instrument] = []

    for (let i = 0; i < 10; i ++){
      notes[instrument].push({
        id: currentId
      });
      currentId++;
    };

    const noteComponents = notes[instrument].map(note => {
    return (
        <Note instrument={instrument} id={note.id} key = {note.id}/>
    )

});
    return (
        <div class="notes">
           {noteComponents} 
        </div>
    )

};
const Instrument = (props) => {
    const noteList = setNotes(props.instrument);
    console.log(noteList)
    return <div>
        {noteList}
    </div>

};

Instrument.propTypes = {
    instrument: PropTypes.string.isRequired
}

export default Instrument