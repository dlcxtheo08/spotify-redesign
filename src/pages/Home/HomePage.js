// src/pages/Home/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Ajout de l'import Link
import './HomePage.css';
import PlaylistCard from '../../components/Cards/PlaylistCard';
import FeaturedSection from '../../components/Sections/FeaturedSection';
import NewFeaturesBanner from '../../components/Banners/NewFeaturesBanner';
import MemoryCard from '../../components/Cards/MemoryCard'; // Ajout de l'import MemoryCard
import { useAppContext } from '../../context/AppContext'; // Ajout de l'import context

const HomePage = () => {
  // Récupérer memoriesData du contexte
  const { memoriesData } = useAppContext();

  const recentPlaylists = [
    { id: 1, title: 'Titres Likés', imageUrl: '/images/playlists/playlists1.jpg', description: 'Tes titres favoris' },
    { id: 2, title: 'Découverte de la semaine', imageUrl: '/images/playlists/playlists2.jpg', description: 'Tes recommandations hebdomadaires' },
    { id: 3, title: 'Hits de l été', imageUrl: '/images/playlists/playlists3.jpg', description: 'Les meilleurs titres de l été' },
    { id: 4, title: 'Mix Chill', imageUrl: '/images/playlists/playlists4.jpg', description: 'Musique relaxante pour toi' }
  ];

  const memoryPlaylists = [
    { id: 5, title: 'Été 2023', imageUrl: '/images/memories/ete.jpg', description: 'Tes souvenirs d été' },
    { id: 6, title: 'Voyage à Paris', imageUrl: '/images/memory-paris.jpg', description: 'La musique de ton voyage à Paris' },
    { id: 7, title: 'Classiques Workout', imageUrl: '/images/memory-workout.jpg', description: 'Tes morceaux préférés pour le sport' }
  ];

  const liveParties = [
    { id: 8, title: 'Soirée du vendredi soir', host: 'DJ Mike', listeners: 253, imageUrl: '/images/playlists/playlists5.jpg' },
    { id: 9, title: 'Découvertes Indie', host: 'MusicExplorer', listeners: 124, imageUrl: '/images/playlists/playlists6.jpg' }
  ];

  return (
    <div className="home-page">
      <header className="page-header">
        <h1>Bonsoir</h1>
        <div className="user-level">
          <span className="level-badge">Niveau 12</span>
          <span className="level-progress">Auditeur Élite</span>
        </div>
      </header>

      <NewFeaturesBanner 
        title="Nouveautés sur Spotify" 
        description="Découvrez nos nouvelles fonctionnalités sociales et outils collaboratifs" 
      />

      <section className="section">
        <h2>Écoutés récemment</h2>
        <div className="cards-grid">
          {recentPlaylists.map(playlist => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      

      {/* Section conditionnelle qui n'apparaît que si memoriesData existe */}
      {memoriesData && memoriesData.length > 0 && (
        <section className="section">
          <h2>Nouveaux Souvenirs Musicaux</h2>
          <p className="section-description">Revivez vos moments musicaux avec notre nouvelle fonctionnalité</p>
          <div className="cards-grid">
            {memoriesData.slice(0, 4).map(memory => (
              <Link to={`/memory/${memory.id}`} key={memory.id}>
                <MemoryCard memory={memory} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <h2>Audio Fingerprint</h2>
        <p className="section-description">Partagez vos playlists avec un code audio unique</p>
        <div className="feature-banner">
          <div className="feature-banner-content">
            <div className="feature-banner-info">
              <h3>Nouveau ! Partagez vos playlists facilement</h3>
              <p>Générez un code audio unique pour partager instantanément vos playlists préférées avec vos amis.</p>
              <Link to="/audio-fingerprint" className="feature-banner-button">
                Essayer maintenant
              </Link>
            </div>
            <div className="feature-banner-image">
              <img src="/images/Cómo montar tu estudio de audio en casa _ Blog _ Domestika.jpg" alt="Audio Fingerprint" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Invitations collaboratives</h2>
          <p className="section-description">Créez la playlist parfaite avec vos amis</p>
        </div>
        <div className="collab-invites">
          <div className="collab-invite-card">
            <div className="invite-header">
              <img src="/images/avatars/avatar1.jpg" alt="Sarah" className="inviter-avatar" />
              <div className="inviter-info">
                <h3 className="inviter-name">Sarah t'a invité(e)</h3>
                <p className="invite-time">Il y a 2 heures</p>
              </div>
            </div>
            <div className="invite-content">
              <p className="invite-text">Rejoins ma playlist "Road Trip d'été" et ajoute tes titres préférés !</p>
              <div className="playlist-preview">
                <img src="/images/memories/ete.jpg" alt="Road Trip d'été" className="playlist-image" />
                <div className="playlist-info">
                  <h4 className="playlist-title">Road Trip d'été</h4>
                  <p className="playlist-details">12 titres • 3 contributeurs</p>
                </div>
              </div>
            </div>
            <div className="invite-actions">
              <button className="accept-button">Rejoindre la playlist</button>
              <button className="decline-button">Refuser</button>
            </div>
          </div>

          <div className="collab-invite-card">
            <div className="invite-header">
              <img src="/images/avatars/avatar4.jpg" alt="Alex" className="inviter-avatar" />
              <div className="inviter-info">
                <h3 className="inviter-name">Alex t'a invité(e)</h3>
                <p className="invite-time">Hier</p>
              </div>
            </div>
            <div className="invite-content">
              <p className="invite-text">Aide-moi à créer la playlist sportive ultime !</p>
              <div className="playlist-preview">
                <img src="/images/playlists/playlists11.jpg" alt="Workout ultime" className="playlist-image" />
                <div className="playlist-info">
                  <h4 className="playlist-title">Workout ultime</h4>
                  <p className="playlist-details">28 titres • 5 contributeurs</p>
                </div>
              </div>
            </div>
            <div className="invite-actions">
              <button className="accept-button">Rejoindre la playlist</button>
              <button className="decline-button">Refuser</button>
            </div>
          </div>
        </div>
      </section>

      <FeaturedSection 
        title="Soirées en direct" 
        description="Participez à des soirées musicales avec vos amis et d'autres fans"
        items={liveParties}
        type="live-party"
      />
    </div>
  );
};

export default HomePage;