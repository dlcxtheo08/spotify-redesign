// src/components/Cards/PlaylistCard.js
import React from 'react';
import './PlaylistCard.css';

const PlaylistCard = ({ playlist, isMemory = false }) => {
  return (
    <div className={`playlist-card ${isMemory ? 'memory-card' : ''}`}>
      <div className="card-image-container">
        <img src={playlist.imageUrl} alt={playlist.title} className="card-image" />
        <div className="card-overlay">
        <button className="play-button">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
</button>
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{playlist.title}</h3>
        <p className="card-description">{playlist.description}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;