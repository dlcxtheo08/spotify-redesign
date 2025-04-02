// src/components/Cards/CollabPlaylistCard.js
import React from 'react';
import './CollabPlaylistCard.css';

const CollabPlaylistCard = ({ playlist, isOwner = false }) => {
  return (
    <div className="collab-playlist-card">
      <div className="card-image-container">
        <img 
          src={playlist.coverImage || '/images/default-playlist.jpg'} 
          alt={playlist.name} 
          className="card-image"
        />
        <div className="card-overlay">
          <button className="play-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
        
        {isOwner && <div className="owner-badge">Owner</div>}
        
        <div className="contributors-avatars">
          {playlist.contributors?.slice(0, 3).map((contributor, index) => (
            <img 
              key={contributor.id} 
              src={contributor.avatar || '/images/default-avatar.jpg'} 
              alt={contributor.name} 
              className="contributor-avatar"
              style={{ zIndex: 3 - index }}
            />
          ))}
          
          {playlist.contributors?.length > 3 && (
            <div className="more-contributors">
              +{playlist.contributors.length - 3}
            </div>
          )}
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{playlist.name}</h3>
        <p className="card-description">
          {playlist.tracks?.length || 0} tracks • {playlist.contributors?.length || 0} contributors
        </p>
      </div>
    </div>
  );
};

export default CollabPlaylistCard;