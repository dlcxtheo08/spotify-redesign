// src/components/Badges/BadgeDisplay.js
import React, { useState } from 'react';
import './BadgeDisplay.css';

const BadgeDisplay = ({ badge }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div 
      className={`badge-display ${badge.earned ? 'earned' : 'locked'}`}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="badge-icon-container">
        <img 
          src={badge.icon} 
          alt={badge.name} 
          className="badge-icon"
        />
        {!badge.earned && (
          <div className="badge-lock">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        )}
      </div>
      
      <div className="badge-info">
        <h3 className="badge-name">{badge.name}</h3>
        <p className="badge-description">{badge.description}</p>
        
        {badge.earned ? (
          <div className="badge-earned-date">
            Obtenu le {badge.earnedDate}
          </div>
        ) : (
          <div className="badge-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${badge.progress}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {badge.progress}% complété
            </div>
          </div>
        )}
      </div>
      
      {showDetails && (
        <div className="badge-details">
          <h4>Comment obtenir ce badge :</h4>
          <p>{badge.howToEarn}</p>
          
          {badge.reward && (
            <div className="badge-reward">
              <h4>Récompense :</h4>
              <p>{badge.reward}</p>
            </div>
          )}
          
          {badge.rareness && (
            <div className="badge-rareness">
              <span className="rareness-label">Rareté :</span>
              <div className="rareness-indicator">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span 
                    key={index} 
                    className={`rareness-star ${index < badge.rareness ? 'active' : ''}`}
                  >★</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;