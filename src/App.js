// src/App.jsx
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const handleClick = () => {
    new Audio('/click.mp3').play();
    setCountdown(3);
    setShowOverlay(true);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 700);
      return () => clearTimeout(t);
    } else {
      // Geri sayım bitti: konfeti + scream sesi
      confetti({ particleCount: 150, spread: 60, origin: { y: 0.2 } });
      new Audio('/scream.mp3').play();
      setCountdown(null);
    }
  }, [countdown]);

  const handleClose = () => setShowOverlay(false);

  return (
    <div className="app">
      <header className="app-header">
        ÇEKMECECİ KAAN
      </header>

      <div className="image-wrapper" onClick={handleClick}>
        <img
          src="/friend.jpg"
          alt="Arkadaşım"
          className="main-image"
        />
      </div>

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            {countdown > 0
              ? countdown
              : "monkeler gururla sunar"
            }
            {countdown === null && (
              <button className="close-btn" onClick={handleClose}>
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;