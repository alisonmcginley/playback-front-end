import SoundFontPlayer from "soundfont-player"
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import axios from 'axios'
import Tempo from './components/Tempo'
import AllInstruments from './components/AllInstruments'
import PlayButton from './components/playButton'
import StopButton from './components/stopButton'
import RecordButton from './components/recordButton'

const AudioContext = window.AudioContext || window.webkitAudioContext;
const ac = new AudioContext()


function App() {

  const BASE_URL = 'http://localhost:27017/instruments'
  // what if I edit to only pass down the selected instrument?
  const [tempo, setTempo] = useState(80)
  const changeTempo = (e) => {
    const eValue = e.target.value;
    setTempo(parseInt(eValue));
}

  const [isPlaying, setIsPlaying] = useState(false)
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }


  const [isRecording, setIsRecording] = useState(false)
  const toggleRecord = () => {
    setIsRecording(!isRecording)
  }

  const [selectedInstrument, setInstrument] = useState("drums")
  const updateInstrument = (form) => {
    let currInstrument = form.target.value;
    setInstrument(currInstrument);
  }

  const [instruments, setInstruments] = useState([])
  const [noteArray, setNoteArray] = useState()
  const playArray = [] 
  const updateArray = (note) => {
    playArray.push(note)
    setNoteArray(playArray)
  }

  let i = 0;

  const timer = ms => new Promise(res => setTimeout(res, ms))

  async function play(i) {
    i.play()
    await timer(tempo*16);
  }

  async function playSounds(array) {
    for(let i = 0; i < array.length; i++) {
      await play(array[i])
    }
    playSounds(array)
  }
  if(isPlaying){
    playSounds(noteArray)
  }

  useEffect(() => {
      axios.get(`${BASE_URL}`)
      .then((response) => {
        setInstruments(response.data)
      })
  }, [])

  const playNote = useCallback((key, note, name, timeStamp) => {
    if(name === selectedInstrument){
      updateArray(note)
      note.play();}
}, [selectedInstrument, noteArray])

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
          <RecordButton onClick={toggleRecord} isRecording ={isRecording} />
          <PlayButton onClick={togglePlay} isPlaying={isPlaying} />
          <StopButton onClick={togglePlay} isPlaying={isPlaying} />
          <Tempo value={tempo} onTempoChange={(e) => changeTempo(e)} />
          <AllInstruments instrumentData={instruments} keyCallBack={playNote} selectedInstrument={selectedInstrument}/>
        
{/* instance of instruments passes down selected instrument array samples */}
        
        </main>
    </div>
  );
}

export default App;
