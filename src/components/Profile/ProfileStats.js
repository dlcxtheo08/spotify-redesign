// src/components/Profile/ProfileStats.js
import React from 'react';
import './ProfileStats.css';

const ProfileStats = ({ userStats }) => {
  return (
    <div className="profile-stats">
      <div className="stats-section overview-stats">
        <h2>Statistiques d'écoute</h2>
        
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{userStats.minutesListened}</div>
              <div className="stat-label">Minutes d'écoute ce mois-ci</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="19" x2="8" y2="21"></line>
                <line x1="8" y1="13" x2="8" y2="17"></line>
                <line x1="16" y1="19" x2="16" y2="21"></line>
                <line x1="16" y1="13" x2="16" y2="17"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="12" y1="15" x2="12" y2="19"></line>
                <path d="M20 8h-9l-2-3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z"></path>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{userStats.songsPlayed}</div>
              <div className="stat-label">Titres écoutés</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{userStats.averageDailyTime}</div>
              <div className="stat-label">Temps d'écoute quotidien moyen</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{userStats.differentArtists}</div>
              <div className="stat-label">Artistes différents écoutés</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="stats-section genres-section">
        <h2>Genres préférés</h2>
        <div className="genres-chart">
          {userStats.topGenres.map((genre, index) => (
            <div key={index} className="genre-item">
              <div className="genre-name">{genre.name}</div>
              <div className="genre-bar-container">
                <div 
                  className="genre-bar" 
                  style={{ 
                    width: `${genre.percentage}%`,
                    background: genre.color
                  }}
                ></div>
                <span className="genre-percentage">{genre.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="stats-section listening-pattern-section">
        <h2>Habitudes d'écoute</h2>
        <div className="listening-pattern">
          <div className="days-header">
            {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day, index) => (
              <div key={index} className="day-label">{day}</div>
            ))}
          </div>
          
          <div className="hours-container">
            {Array.from({ length: 24 }).map((_, hourIndex) => (
              <div key={hourIndex} className="hour-row">
                <div className="hour-label">{hourIndex}h</div>
                <div className="day-cells">
                  {Array.from({ length: 7 }).map((_, dayIndex) => (
                    <div 
                      key={dayIndex} 
                      className="activity-cell"
                      style={{ 
                        opacity: getRandomOpacity(hourIndex, dayIndex),
                        background: 'var(--color-vert)'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="stats-section social-impact-section">
        <h2>Impact social</h2>
        <div className="impact-stats">
          <div className="impact-stat">
            <div className="impact-value">{userStats.playlistsCreated}</div>
            <div className="impact-label">Playlists créées</div>
          </div>
          <div className="impact-stat">
            <div className="impact-value">{userStats.playlistsFollowed}</div>
            <div className="impact-label">Playlists suivies</div>
          </div>
          <div className="impact-stat">
          <div className="impact-value">{userStats.tracksSuggested}</div>
            <div className="impact-label">Titres suggérés</div>
          </div>
          <div className="impact-stat">
            <div className="impact-value">{userStats.livePartiesJoined}</div>
            <div className="impact-label">Soirées live rejointes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fonction auxiliaire pour générer des données aléatoires pour la démo
function getRandomOpacity(hour, day) {
  // Générer une valeur entre 0 et 1 basée sur les paramètres
  // Pour une vraie application, cela viendrait des données utilisateur
  const seed = (hour * 7 + day) % 24;
  
  if (hour >= 22 || hour < 6) {
    // Nuit - peu d'activité
    return Math.max(0.1, Math.sin(seed) * 0.3);
  }
  
  if ((day === 5 || day === 6) && hour >= 10 && hour < 22) {
    // Weekend jour/soir - activité élevée
    return Math.max(0.3, Math.sin(seed * 2) * 0.7 + 0.3);
  }
  
  if (hour >= 17 && hour < 22) {
    // Soir en semaine - activité moyenne à élevée
    return Math.max(0.2, Math.sin(seed) * 0.6 + 0.2);
  }
  
  // Autres périodes - activité variable
  return Math.max(0.1, Math.sin(seed) * 0.4 + 0.1);
}

export default ProfileStats;