// src/components/Profile/LevelProgress.js
import React from 'react';
import './LevelProgress.css';

const LevelProgress = ({ currentLevel, progress, pointsToNextLevel }) => {
  return (
    <div className="level-progress">
      <div className="level-header">
        <div className="current-level">
          <div className="level-label">Niveau actuel</div>
          <div className="level-value">{currentLevel}</div>
        </div>
        <div className="next-level">
          <div className="level-label">Prochain niveau</div>
          <div className="level-value">{currentLevel + 1}</div>
        </div>
      </div>
      
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-details">
          <span className="progress-percentage">{progress}% complété</span>
          <span className="points-to-next">{pointsToNextLevel} points pour atteindre le niveau {currentLevel + 1}</span>
        </div>
      </div>
      
      <div className="level-info">
        <h3>Comment gagner des points ?</h3>
        <ul className="points-list">
          <li>
            <span className="points-value">+5</span>
            <span className="points-action">Découvrir un nouvel artiste</span>
          </li>
          <li>
            <span className="points-value">+10</span>
            <span className="points-action">Créer une nouvelle playlist</span>
          </li>
          <li>
            <span className="points-value">+15</span>
            <span className="points-action">Participer à une écoute en direct</span>
          </li>
          <li>
            <span className="points-value">+20</span>
            <span className="points-action">Partager une playlist via Audio Fingerprint</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LevelProgress;