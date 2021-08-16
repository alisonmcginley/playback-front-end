import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import axios from 'axios'
import Tempo from './components/Tempo'
import AllInstruments from './components/AllInstruments'
import PlayButton from './components/playButton'
import StopButton from './components/stopButton'
import RecordButton from './components/recordButton'
import Metronome from './components/metronome'

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
  const [allTimeArrays, setAllTimeArrays] = useState([]);
  const [noteArray, setNoteArray] = useState([]);
  const [timeArray, setTimeArray] = useState([]);
  const [currentBeat, setBeat] = useState(1)

  

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

  const updateArray = (note, timestamp) => {
    updateTimeArray(timestamp)
    setNoteArray((noteArray) => [...noteArray, note]);
  }
  console.log(noteArray)

  const updateTimeArray = (timestamp) => {
    setTimeArray((timeArray) => [...timeArray, timestamp])
  }

  let i = 0;
  const timer = ms => new Promise(res => setTimeout(res, ms))
  async function play(note, length) {
    note.play();
    await timer(length);
  }

  const testArray = {
    "drums": [[],[]],
    "leadSynth":[[],[]],
    "harmony":[[],[]],
    "bass":[[],[]]
  }

  const updateTestArray = (note, timestamp) => {
    testArray[selectedInstrument][0].push(note)
    testArray[selectedInstrument][1].push(timestamp);
    console.log(testArray)
    return testArray
  }

  async function metronome() {
    let currBeat = 1
    console.log(currentBeat)
    while(currBeat < 4){
      await timer(1000)
      currBeat += 1
      setBeat(currBeat)
    }
    setBeat(1)
  }

  const quantize = (times) => {
    let twoMeasures = 480000/tempo
    let sixteenthNote = 15000/tempo
    // calculate quarter notes
    let quantizedNote = 0
    let quantizedArray =[]
    for(let i=0; i< times.length-1;i++){
      let timeDifference = Math.round(times[i+1] - times[i]);
      let toSixteenth = timeDifference % sixteenthNote;
      if(toSixteenth > sixteenthNote/2){
          quantizedNote = timeDifference - toSixteenth
        }else {quantizedNote = timeDifference + toSixteenth}
      quantizedArray.push(quantizedNote)
    }
    const sum = quantizedArray.reduce((result,number) => result+number);
    quantizedArray.push(twoMeasures-sum)
    console.log(quantizedArray)
    return quantizedArray
  }

  async function playSounds(soundArray, timeArray) {
    console.log(timeArray)
    let timesToWait = quantize(timeArray)
    for(let i = 0; i < soundArray.length; i++) {
      let timeToWait = timesToWait[i];
        await play(soundArray[i], timeToWait)}
      playSounds(soundArray, timeArray);
    // how can i make this always listen for a soundarray update?
    }

  // const loop = () => {
  //   playSounds(testArray["drums"][0], testArray["drums"][1])    
  //   playSounds(testArray["harmony"][0], testArray["harmony"][1])    
  //   playSounds(testArray["leadSynth"][0], testArray["leadSynth"][1])    
  //   playSounds(testArray["bass"][0], testArray["bass"][1]);
  // }
  const loop = () => {
    if(isPlaying){
      playSounds(noteArray, timeArray)
    } 
  }
  loop()

  useEffect(() => {
      axios.get(`${BASE_URL}`)
      .then((response) => {
        setInstruments(response.data)
      })
  }, [])

  const playNote = (key, note, name, timestamp) => {
    if(name === selectedInstrument){
      updateArray(note, timestamp)
      note.play();
    } 
    // if diff key, trigger update
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
          <RecordButton onClick={toggleRecord} isRecording ={isRecording} />
          <PlayButton onClick={togglePlay} isPlaying={isPlaying} />
          <StopButton onClick={togglePlay} isPlaying={isPlaying} />
          <Metronome  onClick={metronome} />
          <Tempo value={tempo} onTempoChange={(e) => changeTempo(e)} />
          <AllInstruments instrumentData={instruments} keyCallBack={playNote} selectedInstrument={selectedInstrument}/>
        
{/* instance of instruments passes down selected instrument array samples */}
        
        </main>
    </div>
  );
}

export default App;
