// src/pages/Memory/MemoryDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MemoryDetailPage.css';
import { useAppContext } from '../../context/AppContext';

const MemoryDetailPage = () => {
  const { memoryId } = useParams();
  const navigate = useNavigate();
  const { memoriesData } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Trouver le souvenir avec l'ID correspondant
  const memory = memoriesData.find(m => m.id === memoryId);
  
  // Si le souvenir n'existe pas, rediriger vers la page des souvenirs
  useEffect(() => {
    if (!memory) {
      navigate('/memory');
    }
  }, [memory, navigate]);
  
  if (!memory) {
    return <div className="loading">Chargement...</div>;
  }
  
  // Obtenir l'icône du contexte de mémoire
  const getContextIcon = (context) => {
    switch(context) {
      case 'Lieu':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        );
      case 'Saison':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      case 'Année':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        );
      case 'Événement':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
        );
      default:
        return null;
    }
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="memory-detail-page">
      <div className="memory-header" style={{ backgroundImage: `url(${memory.coverImage})` }}>
        <div className="memory-header-content">
          <div className="memory-type">
            {getContextIcon(memory.contextType)}
            <span>{memory.contextType}</span>
          </div>
          <h1 className="memory-title">{memory.title}</h1>
          <p className="memory-description">{memory.description}</p>
          <div className="memory-meta">
            <span className="memory-date">{memory.date}</span>
            <span className="memory-tracks-count">{memory.tracks.length} titres</span>
            <span className="memory-duration">{memory.duration}</span>
          </div>
        </div>
      </div>
      
      <div className="memory-actions">
        <button 
          className={`play-button ${isPlaying ? 'pause' : ''}`}
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Lire
            </>
          )}
        </button>
        
        <button className="save-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          Sauvegarder
        </button>
        
        <button className="share-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          Partager
        </button>
      </div>
      
      <div className="memory-context">
        <h2>Contexte</h2>
        <div className="context-cards">
          {memory.context.map((ctx, index) => (
            <div key={index} className="context-card">
              <div className="context-icon">
                {getContextIcon(ctx.type)}
              </div>
              <div className="context-info">
                <div className="context-type">{ctx.type}</div>
                <div className="context-value">{ctx.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="memory-tracks">
        <h2>Titres</h2>
        <div className="tracks-list">
          {memory.tracks.map((track, index) => (
            <div key={index} className="track-item">
              <div className="track-number">{index + 1}</div>
              <div className="track-play">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              <div className="track-info">
                <div className="track-title">{track.title}</div>
                <div className="track-artist">{track.artist}</div>
              </div>
              <div className="track-detail">
                {track.context ? (
                  <div className="track-context" title={track.context}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                ) : null}
                <div className="track-duration">{track.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="memory-similar">
        <h2>Souvenirs similaires</h2>
        <div className="similar-memories">
          {memory.similarMemories?.map((similarMemory, index) => (
            <div key={index} className="similar-memory-card">
              <img src={similarMemory.coverImage} alt={similarMemory.title} className="similar-memory-image" />
              <div className="similar-memory-info">
                <div className="similar-memory-title">{similarMemory.title}</div>
                <div className="similar-memory-tracks">{similarMemory.tracksCount} titres</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryDetailPage;