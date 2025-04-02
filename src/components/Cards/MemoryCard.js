// src/components/Cards/MemoryCard.js
import React from 'react';
import './MemoryCard.css';

const MemoryCard = ({ memory }) => {
  // Définir des icônes selon le type de mémoire
  const getIcon = (type) => {
    switch(type) {
      case 'locations':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        );
      case 'seasons':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        );
      case 'years':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        );
      case 'events':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
    }
  };
  
  // Obtenir des couleurs de fond basées sur le type
  const getBackgroundStyle = (type) => {
    switch(type) {
      case 'locations':
        return { background: 'linear-gradient(45deg, #1E1E3F, #3498DB)' };
      case 'seasons':
        return { background: 'linear-gradient(45deg, #1E1E3F, #27AE60)' };
      case 'years':
        return { background: 'linear-gradient(45deg, #1E1E3F, #E74C3C)' };
      case 'events':
        return { background: 'linear-gradient(45deg, #1E1E3F, #F39C12)' };
      default:
        return { background: 'linear-gradient(45deg, #1E1E3F, #8A2BE2)' };
    }
  };

  return (
    <div className="memory-card" style={getBackgroundStyle(memory.type)}>
      <div className="memory-card-content">
        <div className="memory-icon">
          {getIcon(memory.type)}
        </div>
        <h3 className="memory-title">{memory.title}</h3>
        <p className="memory-description">{memory.description}</p>
        <div className="memory-details">
          <span className="memory-date">{memory.date}</span>
          <span className="memory-tracks">{memory.tracks.length} titres</span>
        </div>
      </div>
      <div className="memory-card-overlay">
        <span className="play-memory">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default MemoryCard;