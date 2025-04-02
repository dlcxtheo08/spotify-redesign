// src/pages/Collaborative/CollaborativePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CollaborativePage.css';
import { useAppContext } from '../../context/AppContext';
import CollabPlaylistCard from '../../components/Cards/CollabPlaylistCard';
import CreateCollabModal from '../../components/Modals/CreateCollabModal';

const CollaborativePage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { playlists, currentUser } = useAppContext();
  
  // Filtrer les playlists pour montrer uniquement les collaboratives
  const collaborativePlaylists = playlists.filter(playlist => playlist.isCollaborative);
  
  // Playlists où l'utilisateur est contributeur
  const myCollaborations = collaborativePlaylists.filter(
    playlist => playlist.contributors?.some(c => c.id === currentUser.id)
  );
  
  // Playlists où l'utilisateur est propriétaire
  const myPlaylists = collaborativePlaylists.filter(
    playlist => playlist.ownerId === currentUser.id
  );
  
  // Autres playlists collaboratives publiques
  const discoverPlaylists = collaborativePlaylists.filter(
    playlist => playlist.ownerId !== currentUser.id && 
                !playlist.contributors?.some(c => c.id === currentUser.id) &&
                playlist.privacy === 'public'
  );

  return (
    <div className="collaborative-page">
      <header className="page-header">
        <div className="title-container">
          <h1>Playlists Collaborative</h1>
          <p className="subtitle">Créez et partagez des playlists avec vos amis et la communauté</p>
        </div>
        <button 
          className="create-playlist-button" 
          onClick={() => setShowCreateModal(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Créer une playlist
        </button>
      </header>
      
      {myCollaborations.length > 0 && (
        <section className="section">
          <h2>Mes collaborations</h2>
          <div className="playlists-grid">
            {myCollaborations.map(playlist => (
              <Link to={`/collaborative/${playlist.id}`} key={playlist.id}>
                <CollabPlaylistCard playlist={playlist} />
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {myPlaylists.length > 0 && (
        <section className="section">
          <h2>Mes playlists</h2>
          <div className="playlists-grid">
            {myPlaylists.map(playlist => (
              <Link to={`/collaborative/${playlist.id}`} key={playlist.id}>
                <CollabPlaylistCard playlist={playlist} isOwner={true} />
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {discoverPlaylists.length > 0 && (
        <section className="section">
          <h2>Découvrir des playlists collaboratives</h2>
          <div className="playlists-grid">
            {discoverPlaylists.map(playlist => (
              <Link to={`/collaborative/${playlist.id}`} key={playlist.id}>
                <CollabPlaylistCard playlist={playlist} />
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {showCreateModal && (
        <CreateCollabModal 
          onClose={() => setShowCreateModal(false)} 
        />
      )}
    </div>
  );
};

export default CollaborativePage;