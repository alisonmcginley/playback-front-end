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
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false);
  const [selectedInstrument, setInstrument] = useState("drums");
  const [instruments, setInstruments] = useState([]);
  const [allNoteArrays, setAllNoteArrays] = useState();
  const [noteArray, setNoteArray] = useState();
  const [timeArray, setTimeArray] = useState();
  const [currentBeat, setBeat] = useState(1)

  const changeTempo = (e) => {
    const eValue = e.target.value;
    setTempo(parseInt(eValue));
}

  const togglePlay = () => {
    setIsPlaying(false)
    updateTimeArray(Date.now())
  }

  const toggleRecord = () => {
    setIsRecording(!isRecording);
    console.log(isRecording)
  }

  const updateInstrument = (form) => {
    let currInstrument = form.target.value;
    setInstrument(currInstrument);
  }

  const playArray = [];
  const updateArray = (note, timestamp) => {
    playArray.push(note);
    updateTimeArray(timestamp)
    setNoteArray(playArray);
  }

  const timeStampArray = [];
  const updateTimeArray = (timestamp) => {
    timeStampArray.push(timestamp);
    setTimeArray(timeStampArray);
  }

  let i = 0;
  const timer = ms => new Promise(res => setTimeout(res, ms))
  async function play(note, length) {
    note.play();
    await timer(length);
  }

  async function updateBeat() {
    while(isRecording){
    await timer(1000);
    if(currentBeat < 4){
      setBeat(+1)
    }
    else if(currentBeat === 4){
      setAllNoteArrays(allNoteArrays.push(noteArray));
      setNoteArray()
    } 
    updateBeat();}
  }

  async function playSounds(soundArray, timeArray) {
    let measureTime = (60000/tempo)*4;
    console.log(measureTime)
    for(let i = 0; i < soundArray.length; i++) {
      let timeToWait = (timeArray[i+1] - timeArray[i]);
      if((measureTime - timeToWait) >= 0){
        measureTime -=timeToWait;
        await play(soundArray[i], timeToWait)}
      else (await play(soundArray[i], (measureTime)))
    } measureTime = (60000/tempo)*4
    playSounds(soundArray, timeArray)
  }

  const loop = () => {
    playSounds(noteArray, timeArray);
  }

  useEffect(() => {
      axios.get(`${BASE_URL}`)
      .then((response) => {
        setInstruments(response.data)
      })
  }, [])

  const playNote = useCallback((key, note, name, timestamp) => {
    if(name === selectedInstrument){
      updateArray(note, timestamp)
      note.play();
    }
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
          <PlayButton onClick={loop} isPlaying={isPlaying} />
          <StopButton onClick={togglePlay} isPlaying={isPlaying} />
          <Tempo value={tempo} onTempoChange={(e) => changeTempo(e)} />
          <AllInstruments instrumentData={instruments} keyCallBack={playNote} selectedInstrument={selectedInstrument}/>
        
{/* instance of instruments passes down selected instrument array samples */}
        
        </main>
    </div>
  );
}

export default App;
