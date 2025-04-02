// src/components/Modals/AddTrackModal.js
import React, { useState } from 'react';
import './AddTrackModal.css';
import { useAppContext } from '../../context/AppContext';

const AddTrackModal = ({ playlistId, onClose }) => {
  const { addTrackToPlaylist } = useAppContext();
  const [trackData, setTrackData] = useState({
    title: '',
    artist: '',
    duration: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrackData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateTime = (timeString) => {
    // Validation simple du format mm:ss
    return /^\d{1,2}:\d{2}$/.test(timeString);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation de la durée
    if (!validateTime(trackData.duration)) {
      alert('La durée doit être au format mm:ss (ex: 3:45)');
      return;
    }
    
    addTrackToPlaylist(playlistId, trackData);
    onClose();
  };
  
  // Suggestions de chansons (fictives, pour l'interface seulement)
  const suggestions = [
    { title: 'Dernière Danse', artist: 'Indila', duration: '3:32' },
    { title: 'Papaoutai', artist: 'Stromae', duration: '3:52' },
    { title: 'La Vie En Rose', artist: 'Édith Piaf', duration: '3:11' },
    { title: 'Je veux', artist: 'Zaz', duration: '3:38' },
    { title: 'Alors On Danse', artist: 'Stromae', duration: '4:16' }
  ];
  
  const usesuggestion = (suggestion) => {
    setTrackData({
      title: suggestion.title,
      artist: suggestion.artist,
      duration: suggestion.duration
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Ajouter un Titre</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              name="title"
              value={trackData.title}
              onChange={handleChange}
              placeholder="Nom du titre"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="artist">Artiste</label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={trackData.artist}
              onChange={handleChange}
              placeholder="Nom de l'artiste"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="duration">Durée (mm:ss)</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={trackData.duration}
              onChange={handleChange}
              placeholder="Ex: 3:45"
              required
            />
          </div>
          
          <div className="suggestions-section">
            <h3>Suggestions</h3>
            <div className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="suggestion-item"
                  onClick={() => usesuggestion(suggestion)}
                >
                  <div className="suggestion-info">
                    <span className="suggestion-title">{suggestion.title}</span>
                    <span className="suggestion-artist">{suggestion.artist}</span>
                  </div>
                  <span className="suggestion-duration">{suggestion.duration}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="add-button">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrackModal;