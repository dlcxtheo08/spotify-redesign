// src/pages/LiveParty/LivePartyPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LivePartyPage.css';
import LiveRoomCard from '../../components/Cards/LiveRoomCard';
import CreateRoomModal from '../../components/Modals/CreateRoomModal';
import { useAppContext } from '../../context/AppContext';

const LivePartyPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState('popular');
  const [selectedTags, setSelectedTags] = useState([]);
  const { rooms, joinRoom } = useAppContext();
  const navigate = useNavigate();

  const allTags = [...new Set(rooms.flatMap(room => room.tags))];
  const trendingTags = [...allTags].sort(() => 0.5 - Math.random()).slice(0, 9);

  const filteredRooms = rooms.filter(room => {
    if (selectedTags.length === 0) return true;
    return selectedTags.some(tag => room.tags.includes(tag));
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (filter === 'popular') return b.listeners - a.listeners;
    if (filter === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  const handleTagClick = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleRoomSelect = (roomId) => {
    joinRoom(roomId);
    navigate(`/live-party/room/${roomId}`);
  };

  const recentRooms = [...rooms]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);

  return (
    <div className="live-party-page">
      <header className="page-header">
        <div className="title-container">
          <h1>Soirée en direct</h1>
          <p className="subtitle">Écoutez ensemble avec vos amis et d'autres personnes</p>
        </div>
        <button 
          className="create-room-button" 
          onClick={() => setShowCreateModal(true)}
        >
          Créer une salle
        </button>
      </header>

      <section className="section filter-section">
        <div className="trending-tags">
          <span className="tag-label">Tendance :</span>
          {trendingTags.map((tag, index) => (
            <button 
              key={index} 
              className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="filter-options">
          <select 
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="popular">Les plus populaires</option>
            <option value="newest">Les plus récentes</option>
          </select>
        </div>
      </section>

      <section className="section active-rooms">
        <h2>En direct maintenant {selectedTags.length > 0 && `• ${selectedTags.join(', ')}`}</h2>
        {sortedRooms.length > 0 ? (
          <div className="rooms-grid">
            {sortedRooms.map(room => (
              <div key={room.id} onClick={() => handleRoomSelect(room.id)}>
                <LiveRoomCard room={room} />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-rooms">
            <p>Aucune salle trouvée avec les filtres sélectionnés</p>
            <button 
              className="clear-filters-button"
              onClick={() => setSelectedTags([])}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </section>

      {recentRooms.length > 0 && (
        <section className="section your-history">
          <h2>Vos soirées récentes</h2>
          <div className="history-list">
            {recentRooms.map(room => (
              <div 
                key={room.id} 
                className="history-item"
                onClick={() => handleRoomSelect(room.id)}
              >
                <img src={room.coverImage} alt={room.title} className="history-image" />
                <div className="history-content">
                  <h3>{room.title}</h3>
                  <p>
                    {new Date(room.createdAt).toLocaleDateString()} • 
                    {room.listeners} auditeurs
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {showCreateModal && (
        <CreateRoomModal 
          onClose={() => setShowCreateModal(false)}
          onCreateRoom={(roomId) => {
            setShowCreateModal(false);
            navigate(`/live-party/room/${roomId}`);
          }}
        />
      )}
    </div>
  );
};

export default LivePartyPage;
