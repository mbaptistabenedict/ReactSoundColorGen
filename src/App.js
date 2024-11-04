import React, { useState } from 'react';
import './App.css';

function App() {
  const [gradient, setGradient] = useState('');

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to generate a gradient with two random colors
  const generateGradient = () => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  };

  // Function to create and play a two-tone sound wave
  const playTwoToneSound = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Create two oscillators
    const oscillator1 = audioCtx.createOscillator();
    const oscillator2 = audioCtx.createOscillator();

    // Set random frequencies for each tone
    oscillator1.frequency.setValueAtTime(200 + Math.random() * 600, audioCtx.currentTime); // Tone 1
    oscillator2.frequency.setValueAtTime(200 + Math.random() * 600, audioCtx.currentTime + 3.0); // Tone 2

    // Connect oscillators to the audio context destination
    oscillator1.connect(audioCtx.destination);
    oscillator2.connect(audioCtx.destination);

    // Play tones in sequence
    oscillator1.start();
    oscillator1.stop(audioCtx.currentTime + 3.0); // First tone duration
    oscillator2.start(audioCtx.currentTime + 3.0); // Second tone starts after the first tone ends
    oscillator2.stop(audioCtx.currentTime + 3.0); // Second tone duration

    // Clean up after playback
    oscillator1.onended = () => {
      oscillator1.disconnect();
      oscillator2.disconnect();
      audioCtx.close();
    };
  };

  // Function to replace the current gradient with a new one and play sound
  const handleGenerateGradient = () => {
    setGradient(generateGradient());
    playTwoToneSound();
  };

  return (
    <div className="App">
      <h1>Gradient & Sound Generator</h1>
      <button onClick={handleGenerateGradient}>Generate Gradient & Sound</button>
      <div className="gradient-box" style={{ background: gradient }}>
        {gradient}
      </div>
    </div>
  );
}

export default App;




// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
