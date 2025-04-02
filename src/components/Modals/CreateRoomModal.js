// src/components/Modals/CreateRoomModal.js
import React, { useState } from 'react';
import './CreateRoomModal.css';
import { useAppContext } from '../../context/AppContext';

const CreateRoomModal = ({ onClose, onCreateRoom }) => {
  const { playlists, createRoom } = useAppContext();
  const [roomData, setRoomData] = useState({
    title: '',
    description: '',
    privacy: 'public',
    playlistId: '',
    tags: []
  });

  const popularTags = ['Pop', 'Rock', 'Hip-Hop', 'Électronique', 'Indie', 'Jazz', 'R&B', 'Latine', 'Metal'];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prev => ({ ...prev, [name]: value }));
  };
  
  const toggleTag = (tag) => {
    setRoomData(prev => {
      const current = [...prev.tags];
      if (current.includes(tag)) {
        return { ...prev, tags: current.filter(t => t !== tag) };
      } else {
        if (current.length < 3) {
          return { ...prev, tags: [...current, tag] };
        }
        return prev;
      }
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const selectedPlaylist = playlists.find(p => p.id === roomData.playlistId);
    
    if (!selectedPlaylist) {
      alert('Veuillez sélectionner une playlist');
      return;
    }
    
    const newRoomData = {
      title: roomData.title,
      description: roomData.description,
      privacy: roomData.privacy,
      tags: roomData.tags,
      host: 'Utilisateur actuel', // À remplacer par l'utilisateur connecté dans l'app réelle
      coverImage: selectedPlaylist.coverImage,
      playlist: selectedPlaylist.tracks.map((track, index) => ({
        ...track,
        isPlaying: index === 0
      }))
    };
    
    const newRoomId = createRoom(newRoomData);
    
    if (onCreateRoom) {
      onCreateRoom(newRoomId);
    } else {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Créer une salle de Live Party</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Titre de la salle</label>
            <input
              type="text"
              id="title"
              name="title"
              value={roomData.title}
              onChange={handleChange}
              placeholder="Donne un titre accrocheur à ta salle"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description (optionnelle)</label>
            <textarea
              id="description"
              name="description"
              value={roomData.description}
              onChange={handleChange}
              placeholder="De quoi parle cette soirée ?"
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="privacy">Confidentialité</label>
            <select
              id="privacy"
              name="privacy"
              value={roomData.privacy}
              onChange={handleChange}
            >
              <option value="public">Publique – Tout le monde peut rejoindre</option>
              <option value="friends">Amis uniquement</option>
              <option value="invite">Sur invitation</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="playlistId">Choisir une playlist</label>
            <select
              id="playlistId"
              name="playlistId"
              value={roomData.playlistId}
              onChange={handleChange}
              required
            >
              <option value="">-- Sélectionne une playlist --</option>
              {playlists.map(playlist => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Tags (max 3)</label>
            <div className="tags-container">
              {popularTags.map(tag => (
                <button
                  type="button"
                  key={tag}
                  className={`tag-selector ${roomData.tags.includes(tag) ? 'selected' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="create-button">
              Créer la salle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;
