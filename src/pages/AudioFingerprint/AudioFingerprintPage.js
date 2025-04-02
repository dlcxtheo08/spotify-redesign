// src/pages/AudioFingerprint/AudioFingerprintPage.js
import React, { useState } from 'react';
import './AudioFingerprintPage.css';
import { useAppContext } from '../../context/AppContext';
import QRCode from '../../components/AudioFingerprint/QRCode';
import Scanner from '../../components/AudioFingerprint/Scanner';

const AudioFingerprintPage = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const { playlists } = useAppContext();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [qrGenerated, setQrGenerated] = useState(false);

  // Filtrer les playlists qui appartiennent à l'utilisateur
  const userPlaylists = playlists.filter(playlist => !playlist.isCollaborative || playlist.ownerId === 'user1');

  const handleSelectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setQrGenerated(false);
  };

  const handleGenerateQR = () => {
    if (selectedPlaylist) {
      setQrGenerated(true);
    }
  };

  return (
    <div className="audio-fingerprint-page">
      <header className="page-header">
        <h1>Audio Fingerprint</h1>
        <p className="subtitle">Partagez vos playlists avec un code unique ou scannez-en un pour découvrir de nouvelles musiques</p>
      </header>

      <div className="tabs-section">
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'generate' ? 'active' : ''}`}
            onClick={() => setActiveTab('generate')}
          >
            Générer un code
          </button>
          <button 
            className={`tab-button ${activeTab === 'scan' ? 'active' : ''}`}
            onClick={() => setActiveTab('scan')}
          >
            Scanner un code
          </button>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 'generate' ? (
          <div className="generate-section">
            {!qrGenerated ? (
              <>
                <h2>Sélectionnez une playlist</h2>
                <div className="playlists-grid">
                  {userPlaylists.map(playlist => (
                    <div 
                      key={playlist.id} 
                      className={`playlist-item ${selectedPlaylist?.id === playlist.id ? 'selected' : ''}`}
                      onClick={() => handleSelectPlaylist(playlist)}
                    >
                      <img 
                        src={playlist.coverImage || '/images/default-playlist.jpg'} 
                        alt={playlist.name} 
                        className="playlist-image"
                      />
                      <div className="playlist-info">
                        <h3 className="playlist-name">{playlist.name}</h3>
                        <p className="playlist-tracks">{playlist.tracks?.length || 0} titres</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  className="generate-button"
                  disabled={!selectedPlaylist}
                  onClick={handleGenerateQR}
                >
                  Générer le code Audio
                </button>
              </>
            ) : (
              <div className="qr-result">
                <h2>Votre Audio Fingerprint est prêt!</h2>
                <div className="qr-container">
                  <QRCode playlist={selectedPlaylist} />
                </div>
                <div className="qr-info">
                  <h3>{selectedPlaylist.name}</h3>
                  <p>{selectedPlaylist.tracks?.length || 0} titres</p>
                </div>
                <div className="qr-actions">
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
                  <button className="download-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Télécharger
                  </button>
                  <button 
                    className="back-button"
                    onClick={() => setQrGenerated(false)}
                  >
                    Retour
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="scan-section">
            <h2>Scannez un Audio Fingerprint</h2>
            <p className="scan-instructions">Positionnez le code QR audio devant votre caméra</p>
            <div className="scanner-container">
              <Scanner />
            </div>
            <div className="scan-history">
              <h3>Récemment scannés</h3>
              <div className="scan-history-list">
                <div className="scan-history-item">
                  <img src="/images/playlist1.jpg" alt="Playlist scannée" className="scan-image" />
                  <div className="scan-info">
                    <h4 className="scan-title">Summer Vibes</h4>
                    <p className="scan-date">Scanné le 28/03/2023</p>
                  </div>
                  <button className="scan-action">Ouvrir</button>
                </div>
                <div className="scan-history-item">
                  <img src="/images/playlist2.jpg" alt="Playlist scannée" className="scan-image" />
                  <div className="scan-info">
                    <h4 className="scan-title">Jazz Collection</h4>
                    <p className="scan-date">Scanné le 15/03/2023</p>
                  </div>
                  <button className="scan-action">Ouvrir</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioFingerprintPage;