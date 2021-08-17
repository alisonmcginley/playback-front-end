import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import axios from 'axios';
import Tempo from './components/Tempo';
import AllInstruments from './components/AllInstruments';
import PlayButton from './components/playButton';
import StopButton from './components/stopButton';
import RecordButton from './components/recordButton';
const Scheduler = require('./components/scheduler');
console.log(Scheduler)

const AudioContext = window.AudioContext || window.webkitAudioContext;
const ac = new AudioContext()

function App() {

  const BASE_URL = 'http://localhost:27017/instruments'
  // what if I edit to only pass down the selected instrument?
  const [tempo, setTempo] = useState(80)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false);
  const [selectedInstrument, setInstrument] = useState("drums");
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
  const [mergedArray, setMergedArrays] = useState({})
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

  let i = 0;
  const timer = ms => new Promise(res => setTimeout(res, ms))
  async function play(note, length) {
    console.log(note)
    note.play();
    await timer(length);
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

  useEffect(() => {
      if(isPlaying == 1){
      playSounds(allNoteArrays, allTimeArrays)
    }
}, [isPlaying])

  useEffect(() => {
      axios.get(`${BASE_URL}`)
      .then((response) => {
        setInstruments(response.data)
      })
  }, [])

  const playNote = (key, note, name, timestamp) => {
    if(name === selectedInstrument){
      console.log(note)
      updateAllNoteArrays(note, timestamp)
      note.play();
    } 
}

  
  return (
    <div className="App">
        <header id="header">
          <h1>Playback</h1>
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
          <RecordButton onClick={toggleRecord} isrecording ={isRecording ? 1 : 0} />
          <PlayButton onClick={togglePlay} isplaying={isPlaying ? 1: 0} />
          <StopButton onClick={togglePlay} isplaying={isPlaying ? 1: 0} />
          <Tempo value={tempo} onTempoChange={(e) => changeTempo(e)} />
          <AllInstruments instrumentData={instruments} keyCallBack={playNote} selectedInstrument={selectedInstrument}/>
        
{/* instance of instruments passes down selected instrument array samples */}
        
        </main>
    </div>
  );
}

export default App;
