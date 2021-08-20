import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Tempo from './components/Tempo';
import AllInstruments from './components/AllInstruments';
import PlayButton from './components/playButton';
import StopButton from './components/stopButton';
import ClearButton from './components/Clear';
import RecordButton from './components/recordButton';
const Scheduler = require('./components/scheduler');

function App() {

  const BASE_URL = 'http://localhost:27017/instruments'
  const [tempo, setTempo] = useState(80)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false);
  const [selectedInstrument, setInstrument] = useState();
  const [instruments, setInstruments] = useState([]);
  const [allNoteArrays, setAllNoteArrays] = useState({
    "drums": [],
    "leadSynth":[],
    "harmony":[],
    "bass":[]
  });
  const [allTimeArrays, setAllTimeArrays] = useState({
    "drums": [],
    "leadSynth":[],
    "harmony":[],
    "bass":[]
  });

  let sixteenthNote = 15000/tempo
  let twoMeasures = 480000/tempo

  const changeTempo = (e) => {
    const eValue = e.target.value;
    setTempo(parseInt(eValue));
}

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  }

  const toggleRecord = () => {
    setIsRecording(!isRecording);
    console.log(isRecording)
  }

  const updateInstrument = (form) => {
    let currInstrument = form.target.value;
    setInstrument(currInstrument);
  }

  const clearNotes = () => {
    setAllNoteArrays({})
    setAllTimeArrays({})
  }
 
  const updateAllNoteArrays = (note, timestamp) => {
    setAllNoteArrays((allNoteArrays) => 
    ({...allNoteArrays, [selectedInstrument]:[...allNoteArrays[selectedInstrument], note]})
    )
    updateAllTimeArrays(timestamp)
}

  const updateAllTimeArrays = (timestamp) => {
    setAllTimeArrays((allTimeArrays) => 
    ({...allTimeArrays, [selectedInstrument]:[...allTimeArrays[selectedInstrument], timestamp]})
    )
    }

  // async helper promise, sets await on a ms timer
  const timer = ms => new Promise(res => setTimeout(res, ms))

  // plays audio and waits for ms provided
  async function play(note, length) {
    note.play();
    await timer(length);
  }

// schedules notes then plays them, using the async play function
async function playSounds(allNoteArrays, allTimeArrays) {
    let schedule = Scheduler.scheduleNotes(allNoteArrays, allTimeArrays, twoMeasures, sixteenthNote)
    for(let i =0; i < twoMeasures; i+=sixteenthNote){
      if(schedule[i].length > 0){
        for(let note in schedule[i]){
          let newNote = schedule[i][note]
          await play(newNote,0) 
        }  
      }await timer(sixteenthNote)    
    }
    playSounds(allNoteArrays, allTimeArrays)
  }

  // if playing == true, loop will start
  useEffect(() => {
      if(isPlaying == true){
      playSounds(allNoteArrays, allTimeArrays)
    }
}, [isPlaying])

// initial API call
  useEffect(() => {
      axios.get(`${BASE_URL}`)
      .then((response) => {
        setInstruments(response.data)
      })
  }, [])

  // accepts note from note.js, playing if it matches the selected instrument and updates note array
  const playNote = (key, note, name, timestamp) => {
    if(name === selectedInstrument){
      note.play();
      if(isRecording == true){
        console.log('called')
        updateAllNoteArrays(note, timestamp);
      }
    } 
}

  return (
    <div className="App">
        <header id="header">
          <div class="p">P</div>
          <div class="l">l</div>
          <div class="a">a</div>
          <div class="y">y</div>
          <div class="b">b</div>
          <div class="a">a</div>
          <div class="c">c</div>
          <div class="k">k</div>
        </header>

        <main>
       < div className="instrumentRadios">
          <h3 id="instrumentHeader">Choose an Instrument</h3>
            <input name = "instrumentChoice" type="radio" value="drums" id="drums" onChange={updateInstrument}></input>
            <label for="drums">Drums</label>            
            <input name = "instrumentChoice" type="radio" value="bass" id="bass" onChange={updateInstrument}></input>
            <label for="bass">Bass</label>            
            <input name = "instrumentChoice" type="radio" value="harmony" id="harmony" onChange={updateInstrument}></input>
            <label for="harmony">Harmony</label>            
            <input name = "instrumentChoice" type="radio" value="leadSynth" id="leadSynth" onChange={updateInstrument}></input>
            <label for="leadSynth">Lead</label>
          </div>
          <div className="controls">
          <Tempo value={tempo} onTempoChange={(e) => changeTempo(e)} />
          <RecordButton isrecording={isRecording} onClick={toggleRecord} />
          <PlayButton onClick={togglePlay} isplaying={isPlaying ? 1: 0} />
          <StopButton onClick={togglePlay} isplaying={isPlaying ? 1: 0} />
          <ClearButton onClick={clearNotes} />
          </div>
          <AllInstruments instrumentData={instruments} keyCallBack={playNote} selectedInstrument={selectedInstrument}/>
        
        </main>
    </div>
  );
}

export default App;
