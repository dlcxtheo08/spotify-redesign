// src/components/Modals/CreateCollabModal.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateCollabModal.css';
import { useAppContext } from '../../context/AppContext';

const CreateCollabModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { currentUser, createCollabPlaylist } = useAppContext();
  const [playlistData, setPlaylistData] = useState({
    name: '',
    description: '',
    privacy: 'public',
    coverImage: '/images/default-playlist.jpg'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaylistData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPlaylistId = createCollabPlaylist({
      ...playlistData,
      owner: currentUser.name,
      ownerId: currentUser.id,
      contributors: [
        {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar
        }
      ],
      tracks: []
    });
    
    onClose();
    navigate(`/collaborative/${newPlaylistId}`);
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Créer un Playlist Collaborative</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Nom de la Playlist</label>
            <input
              type="text"
              id="name"
              name="name"
              value={playlistData.name}
              onChange={handleChange}
              placeholder="Give your playlist a name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={playlistData.description}
              onChange={handleChange}
              placeholder="What's this playlist about?"
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="privacy">Privacy Setting</label>
            <select
              id="privacy"
              name="privacy"
              value={playlistData.privacy}
              onChange={handleChange}
            >
              <option value="public">Public</option>
              <option value="friends">Amis uniquement</option>
              <option value="invite">Invitations uniquement</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="coverImage">Cover Image</label>
            <div className="cover-image-options">
              <div 
                className={`cover-option ${playlistData.coverImage === '/images/playlists/playlists3.jpg' ? 'selected' : ''}`}
                onClick={() => setPlaylistData(prev => ({ ...prev, coverImage: '/images/playlists/playlists3.jpg' }))}
              >
                <img src="/images/playlists/playlists3.jpg" alt="Cover 1" />
              </div>
              <div 
                className={`cover-option ${playlistData.coverImage === '/images/playlists/playlists6.jpg' ? 'selected' : ''}`}
                onClick={() => setPlaylistData(prev => ({ ...prev, coverImage: '/images/playlists/playlists6.jpg' }))}
              >
                <img src="/images/playlists/playlists6.jpg" alt="Cover 2" />
              </div>
              <div 
                className={`cover-option ${playlistData.coverImage === '/images/playlists/playlists8.jpg' ? 'selected' : ''}`}
                onClick={() => setPlaylistData(prev => ({ ...prev, coverImage: '/images/playlists/playlists8.jpg' }))}
              >
                <img src="/images/playlists/playlists8.jpg" alt="Cover 3" />
              </div>
              <div 
                className={`cover-option ${playlistData.coverImage === '/images/playlists/playlists9.jpg' ? 'selected' : ''}`}
                onClick={() => setPlaylistData(prev => ({ ...prev, coverImage: '/images/playlists/playlists9.jpg' }))}
              >
                <img src="/images/playlists/playlists9.jpg" alt="Default Cover" />
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="create-button">
              Créer une playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCollabModal;