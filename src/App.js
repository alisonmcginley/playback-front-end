import React, { useState } from 'react';
import './App.css';

import Controls from './components/Controls';
import Instruments from './components/Instruments';

function App() {
  return (
    <div className="App">
        <header id="header">
          <h1>Playback</h1>
        </header>
        <main>
          <Controls />
          <Instruments />
        </main>
    </div>
  );
}

export default App;
