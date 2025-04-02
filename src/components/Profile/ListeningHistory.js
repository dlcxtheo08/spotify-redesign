// src/components/Profile/ListeningHistory.js
import React, { useState } from 'react';
import './ListeningHistory.css';

const ListeningHistory = ({ history }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filtrer l'historique en fonction du type sélectionné
  const filteredHistory = activeFilter === 'all' 
    ? history 
    : history.filter(item => item.type === activeFilter);
  
  return (
    <div className="listening-history">
      <div className="history-header">
        <h2>Votre historique d'écoute</h2>
        <div className="history-filters">
          <button 
            className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Tout
          </button>
          <button 
            className={`filter-button ${activeFilter === 'track' ? 'active' : ''}`}
            onClick={() => setActiveFilter('track')}
          >
            Titres
          </button>
          <button 
            className={`filter-button ${activeFilter === 'album' ? 'active' : ''}`}
            onClick={() => setActiveFilter('album')}
          >
            Albums
          </button>
          <button 
            className={`filter-button ${activeFilter === 'playlist' ? 'active' : ''}`}
            onClick={() => setActiveFilter('playlist')}
          >
            Playlists
          </button>
        </div>
      </div>
      
      <div className="history-list">
        {filteredHistory.map((item, index) => (
          <div key={index} className="history-item">
            <div className="history-time">
              <div className="time">{item.time}</div>
              <div className="date">{item.date}</div>
            </div>
            
            <div className="history-content">
              <img src={item.image} alt={item.title} className="history-image" />
              <div className="history-info">
                <div className="history-title">{item.title}</div>
                <div className="history-subtitle">{item.subtitle}</div>
                <div className="history-type-tag">
                  {item.type === 'track' && 'Titre'}
                  {item.type === 'album' && 'Album'}
                  {item.type === 'playlist' && 'Playlist'}
                  {item.type === 'artist' && 'Artiste'}
                </div>
              </div>
            </div>
            
            <div className="history-actions">
              <button className="history-action play-action">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
              <button className="history-action more-action">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="12" cy="5" r="1"></circle>
                  <circle cx="12" cy="19" r="1"></circle>
                </svg>
              </button>
            </div>
          </div>
        ))}
        
        {filteredHistory.length === 0 && (
          <div className="no-history">
            <p>Aucun élément trouvé dans l'historique pour ce filtre.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListeningHistory;