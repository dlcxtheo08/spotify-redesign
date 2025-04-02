// src/pages/Collaborative/PlaylistDetailPage.js
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PlaylistDetailPage.css';
import { useAppContext } from '../../context/AppContext';
import AddTrackModal from '../../components/Modals/AddTrackModal';
import InviteModal from '../../components/Modals/InviteModal';

const PlaylistDetailPage = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { playlists, currentUser, voteTrack, removeTrack } = useAppContext();
  const [showAddTrackModal, setShowAddTrackModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [activeSort, setActiveSort] = useState('recent');
  const [filter, setFilter] = useState('');
  
  // Trouve la playlist avec l'ID correspondant
  const playlist = playlists.find(p => p.id === playlistId);
  
  // Si la playlist n'existe pas, rediriger vers la page des playlists collaboratives
  useEffect(() => {
    if (!playlist) {
      navigate('/collaborative');
    }
  }, [playlist, navigate]);
  
  if (!playlist) {
    return <div className="loading">Loading...</div>;
  }
  
  // Vérifie si l'utilisateur actuel est le propriétaire
  const isOwner = playlist.ownerId === currentUser.id;
  
  // Vérifie si l'utilisateur actuel est un contributeur
  const isContributor = isOwner || playlist.contributors?.some(c => c.id === currentUser.id);
  
  // Filtre et trie les pistes
  let displayTracks = [...playlist.tracks || []];
  
  // Filtre
  if (filter) {
    const filterLower = filter.toLowerCase();
    displayTracks = displayTracks.filter(track => 
      track.title.toLowerCase().includes(filterLower) || 
      track.artist.toLowerCase().includes(filterLower)
    );
  }
  
  // Tri
  if (activeSort === 'recent') {
    displayTracks.sort((a, b) => new Date(b.addedAt || 0) - new Date(a.addedAt || 0));
  } else if (activeSort === 'popular') {
    displayTracks.sort((a, b) => (b.votes || 0) - (a.votes || 0));
  } else if (activeSort === 'title') {
    displayTracks.sort((a, b) => a.title.localeCompare(b.title));
  }
  
  const handleVote = (trackId, direction) => {
    voteTrack(playlistId, trackId, direction);
  };
  
  const handleRemoveTrack = (trackId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce titre ?')) {
        removeTrack(playlistId, trackId);
    }
  };
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="playlist-detail-page">
      <div className="playlist-header">
        <div className="playlist-cover-container">
          <img 
            src={playlist.coverImage || '/images/playlists/playlists14.jpg'} 
            alt={playlist.name} 
            className="playlist-cover"
          />
        </div>
        <div className="playlist-info">
          <div className="playlist-type">Playlist Collaborative</div>
          <h1 className="playlist-name">{playlist.name}</h1>
          <p className="playlist-description">{playlist.description}</p>
          <div className="playlist-meta">
            <span className="playlist-owner">
              Créée par {playlist.owner}
            </span>
            <span className="playlist-tracks">
              {playlist.tracks?.length || 0} titres
            </span>
            <span className="playlist-contributors">
              {playlist.contributors?.length || 0} contributeurs
            </span>
          </div>
          <div className="contributors-avatars">
            {playlist.contributors?.map((contributor) => (
              <div key={contributor.id} className="contributor-item">
                <img 
                  src={contributor.avatar || '/images/avatars/avatar6.jpg'} 
                  alt={contributor.name} 
                  className="contributor-avatar"
                />
                <span className="contributor-name">{contributor.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="playlist-actions">
        <button className="play-all-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Tout Lire
        </button>
        
        {isContributor && (
          <button 
            className="add-track-button"
            onClick={() => setShowAddTrackModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Ajouter un Titre
          </button>
        )}
        
        <button 
          className="invite-button"
          onClick={() => setShowInviteModal(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          Inviter
        </button>
      </div>
      
      <div className="tracks-container">
        <div className="tracks-header">
          <div className="tracks-filter">
            <input 
              type="text" 
              placeholder="Filtrer les titres..."
              value={filter}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>
          
          <div className="tracks-sort">
            <span className="sort-label">Trier par:</span>
            <button 
              className={`sort-button ${activeSort === 'recent' ? 'active' : ''}`}
              onClick={() => setActiveSort('recent')}
            >
              Récents
            </button>
            <button 
              className={`sort-button ${activeSort === 'popular' ? 'active' : ''}`}
              onClick={() => setActiveSort('popular')}
            >
              Populaires
            </button>
            <button 
              className={`sort-button ${activeSort === 'title' ? 'active' : ''}`}
              onClick={() => setActiveSort('title')}
            >
              Titre
            </button>
          </div>
        </div>
        
        <div className="tracks-list">
          {displayTracks.length === 0 ? (
            <div className="no-tracks">
              <p>Aucun titre pour le moment. 
                {isContributor ? (
                  "Soyez le premier à ajouter un titre à cette playlist !"
                ) : (
                  "Les titres apparaîtront ici une fois que les contributeurs en auront ajouté."
                )}
              </p>
              
              {isContributor && (
                <button 
                  className="add-first-track-button"
                  onClick={() => setShowAddTrackModal(true)}
                >
                  Ajouter un Titre
                </button>
              )}
            </div>
          ) : (
            displayTracks.map((track) => (
              <div key={track.id} className="track-item">
                <div className="track-main">
                  <div className="track-play">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                  <div className="track-info">
                    <div className="track-title">{track.title}</div>
                    <div className="track-artist">{track.artist}</div>
                  </div>
                </div>
                
                <div className="track-details">
                  <div className="track-added-by">
                    Ajouté par {track.addedBy || 'Inconnu'}
                  </div>
                  
                  <div className="track-added-at">
                    {track.addedAt ? new Date(track.addedAt).toLocaleDateString() : 'Date inconnue'}
                  </div>
                  
                  <div className="track-duration">
                    {track.duration || '0:00'}
                  </div>
                </div>
                
                <div className="track-actions">
                  <div className="vote-buttons">
                    <button 
                      className="vote-up"
                      onClick={() => handleVote(track.id, 'up')}
                      disabled={!isContributor}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </button>
                    <span className="vote-count">{track.votes || 0}</span>
                    <button 
                      className="vote-down"
                      onClick={() => handleVote(track.id, 'down')}
                      disabled={!isContributor}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>
                  
                  {(isOwner || track.addedById === currentUser.id) && (
                    <button 
                      className="remove-track"
                      onClick={() => handleRemoveTrack(track.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {showAddTrackModal && (
        <AddTrackModal 
          playlistId={playlistId}
          onClose={() => setShowAddTrackModal(false)}
        />
      )}
      
      {showInviteModal && (
        <InviteModal 
          playlistId={playlistId}
          playlistName={playlist.name}
          onClose={() => setShowInviteModal(false)}
        />
      )}
    </div>
  );
};

export default PlaylistDetailPage;