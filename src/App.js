import SoundFontPlayer from "soundfont-player"
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import axios from 'axios'
import Controls from './components/Controls';
import Tempo from './components/Tempo'
import Instrument from './components/Instrument';
import AllInstruments from './components/AllInstruments'
import PlayButton from './components/playButton'

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

  const [selectedInstrument, setInstrument] = useState("drums")
  const updateInstrument = (form) => {
    let currInstrument = form.target.value;
    setInstrument(currInstrument);
    console.log(selectedInstrument)
  }


  const [instruments, setInstruments] = useState([])

  useEffect(() => {
      axios.get(`${BASE_URL}`)
      .then((response) => {
        setInstruments(response.data)
      })
  }, [])

  console.log(selectedInstrument)
  const playNote = useCallback((key, note, name) => {
    console.log(name, selectedInstrument)
    if(name == selectedInstrument){
      note.play();}
}, [selectedInstrument])

  return (
    <div className="App">
        <header id="header">
          <h1>Playback</h1>
        </header>

        <main>
          <PlayButton onClick={togglePlay} isPlaying={isPlaying} />
          <Tempo value={tempo} onTempoChange={(e) => changeTempo(e)} />
          <AllInstruments instrumentData={instruments} keyCallBack={playNote} selectedInstrument={selectedInstrument}/>
        
{/* instance of instruments passes down selected instrument array samples */}
          <div className="instrumentRadios">
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
        </main>
    </div>
  );
}

export default App;
