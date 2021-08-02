import React, { useState } from 'react';
import './App.css';

import Controls from './components/Controls';

function App() {
  return (
    <div className="App">
        <header id="header">
          <h1>Playback</h1>
        </header>
        <main>
          <Controls />
        </main>
    </div>
  );
}

export default App;
