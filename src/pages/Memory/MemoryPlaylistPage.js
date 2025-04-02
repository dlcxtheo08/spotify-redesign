// src/pages/Memory/MemoryPlaylistPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MemoryPlaylistPage.css';
import { useAppContext } from '../../context/AppContext';
import MemoryCard from '../../components/Cards/MemoryCard';

const MemoryPlaylistPage = () => {
  const { memoriesData } = useAppContext();
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filtres pour les différents types de souvenirs
  const filters = [
    { id: 'all', name: 'Tous' },
    { id: 'locations', name: 'Lieux' },
    { id: 'seasons', name: 'Saisons' },
    { id: 'years', name: 'Années' },
    { id: 'events', name: 'Événements' }
  ];
  
  // Filtrer les souvenirs selon le filtre actif
  const filteredMemories = activeFilter === 'all' 
    ? memoriesData 
    : memoriesData.filter(memory => memory.type === activeFilter);

  return (
    <div className="memory-playlist-page">
      <header className="page-header">
        <div className="title-container">
          <h1>Playlists Souvenirs</h1>
          <p className="subtitle">Revivez vos moments musicaux préférés</p>
        </div>
      </header>
      
      <div className="filters-section">
        <div className="memory-filters">
          {filters.map((filter) => (
            <button 
              key={filter.id}
              className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>
      
      {filteredMemories.length > 0 ? (
        <div className="memories-grid">
          {filteredMemories.map((memory) => (
            <Link to={`/memory/${memory.id}`} key={memory.id}>
              <MemoryCard memory={memory} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-memories">
          <p>Aucun souvenir musical trouvé pour ce filtre.</p>
          <p>Continuez à écouter de la musique pour créer de nouveaux souvenirs!</p>
        </div>
      )}
    </div>
  );
};

export default MemoryPlaylistPage;