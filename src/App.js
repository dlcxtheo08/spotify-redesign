// src/App.js (mise à jour)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navigation/NavigationBar';
import HomePage from './pages/Home/HomePage';
import LivePartyPage from './pages/LiveParty/LivePartyPage';
import RoomDetailPage from './pages/LiveParty/RoomDetailPage';
import CollaborativePage from './pages/Collaborative/CollaborativePage';
import PlaylistDetailPage from './pages/Collaborative/PlaylistDetailPage';
import MemoryPlaylistPage from './pages/Memory/MemoryPlaylistPage';
import MemoryDetailPage from './pages/Memory/MemoryDetailPage';
import AudioFingerprintPage from './pages/AudioFingerprint/AudioFingerprintPage';
import ProfilePage from './pages/Profile/ProfilePage';
import { AppProvider } from './context/AppContext';
import './styles/variables.css';
import './App.css';

// Pages vides pour la navigation
const SearchPage = () => <div className="page">Rechercher</div>;
const LibraryPage = () => <div className="page">Bibliothèque</div>;

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <NavigationBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/live-party" element={<LivePartyPage />} />
              <Route path="/live-party/room/:roomId" element={<RoomDetailPage />} />
              <Route path="/collaborative" element={<CollaborativePage />} />
              <Route path="/collaborative/:playlistId" element={<PlaylistDetailPage />} />
              <Route path="/memory" element={<MemoryPlaylistPage />} />
              <Route path="/memory/:memoryId" element={<MemoryDetailPage />} />
              <Route path="/audio-fingerprint" element={<AudioFingerprintPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;