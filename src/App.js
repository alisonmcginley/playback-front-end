import React, { useState } from 'react';
import './App.css';

import Controls from './components/Controls';
import Instrument from './components/Instrument';


function App() {
  const [selectedInstrument, setInstrument] = useState('drums')
  const updateInstrument = (form) => {
    let currInstrument = form.target.value;
    setInstrument(currInstrument);
  }

// generate grid for visual display
  return (
    <div className="App">
        <header id="header">
          <h1>Playback</h1>
        </header>

        <main>
          <Controls />
          <Instrument instrument={selectedInstrument} />
          <div className="instrumentRadios">
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
