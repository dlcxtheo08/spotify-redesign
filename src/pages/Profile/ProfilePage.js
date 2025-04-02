// src/pages/Profile/ProfilePage.js
import React, { useState } from 'react';
import './ProfilePage.css';
import { useAppContext } from '../../context/AppContext';
import BadgeDisplay from '../../components/Badges/BadgeDisplay';
import LevelProgress from '../../components/Profile/LevelProgress';
import ProfileStats from '../../components/Profile/ProfileStats';
import ListeningHistory from '../../components/Profile/ListeningHistory';

const ProfilePage = () => {
  const { currentUser, userStats, badges, listeningHistory } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: 'Aperçu' },
    { id: 'badges', label: 'Badges' },
    { id: 'stats', label: 'Statistiques' },
    { id: 'history', label: 'Historique d\'écoute' }
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-cover-overlay"></div>
        </div>
        
        <div className="profile-info">
          <div className="profile-avatar-container">
            <img 
              src={currentUser.avatar || '/images/default-avatar.jpg'} 
              alt={currentUser.name} 
              className="profile-avatar"
            />
            <div className="level-indicator">{currentUser.level}</div>
          </div>
          
          <div className="profile-details">
            <h1 className="profile-name">{currentUser.name}</h1>
            <div className="profile-meta">
              <span className="profile-username">@{currentUser.username}</span>
              <span className="profile-separator">•</span>
              <span className="profile-followers">{userStats.followers} abonnés</span>
              <span className="profile-separator">•</span>
              <span className="profile-following">{userStats.following} abonnements</span>
            </div>
            
            <div className="profile-badges-preview">
              {badges.slice(0, 5).map(badge => (
                <div key={badge.id} className="badge-preview" title={badge.name}>
                  <img src={badge.icon} alt={badge.name} className="badge-icon" />
                </div>
              ))}
              {badges.length > 5 && (
                <div className="badge-preview more-badges">
                  +{badges.length - 5}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-level-section">
        <LevelProgress 
          currentLevel={currentUser.level}
          progress={userStats.levelProgress}
          pointsToNextLevel={userStats.pointsToNextLevel}
        />
        
        <div className="level-benefits">
          <h3>Avantages de votre niveau</h3>
          <ul className="benefits-list">
            <li>Accès exclusif aux événements virtuels</li>
            <li>Badges spéciaux débloqués</li>
            <li>Thèmes exclusifs pour votre profil</li>
          </ul>
        </div>
      </div>
      
      <div className="profile-tabs">
        <div className="tabs-container">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="profile-content">
        {activeTab === 'overview' && (
          <div className="profile-overview">
            <div className="profile-section top-artists">
              <h2>Artistes les plus écoutés</h2>
              <div className="artists-grid">
                {userStats.topArtists.map(artist => (
                  <div key={artist.id} className="artist-card">
                    <img src={artist.image} alt={artist.name} className="artist-image" />
                    <div className="artist-name">{artist.name}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="profile-section recently-earned-badges">
              <h2>Badges récemment débloqués</h2>
              <div className="recent-badges-grid">
                {badges.slice(0, 4).map(badge => (
                  <BadgeDisplay key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
            
            <div className="profile-section recent-activity">
              <h2>Activité récente</h2>
              <div className="activity-list">
                {userStats.recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'playlist' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15V6"></path>
                          <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
                          <path d="M12 12H3"></path>
                          <path d="M16 6H3"></path>
                          <path d="M12 18H3"></path>
                        </svg>
                      )}
                      {activity.type === 'badge' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="7"></circle>
                          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                        </svg>
                      )}
                      {activity.type === 'level' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="12 8 8 12 12 16"></polyline>
                          <polyline points="16 12 12 8 8 4"></polyline>
                        </svg>
                      )}
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">{activity.text}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'badges' && (
          <div className="profile-badges">
            <div className="badges-section">
              <h2>Tous vos badges</h2>
              <p className="badges-description">
                Les badges sont débloqués en atteignant certains objectifs et milestones. Continuez à écouter et partager pour en obtenir plus !
              </p>
              
              <div className="badges-categories">
                <div className="badge-category">
                  <h3>Écoute</h3>
                  <div className="badges-grid">
                    {badges.filter(b => b.category === 'listening').map(badge => (
                      <BadgeDisplay key={badge.id} badge={badge} />
                    ))}
                  </div>
                </div>
                
                <div className="badge-category">
                  <h3>Social</h3>
                  <div className="badges-grid">
                    {badges.filter(b => b.category === 'social').map(badge => (
                      <BadgeDisplay key={badge.id} badge={badge} />
                    ))}
                  </div>
                </div>
                
                <div className="badge-category">
                  <h3>Créativité</h3>
                  <div className="badges-grid">
                    {badges.filter(b => b.category === 'creative').map(badge => (
                      <BadgeDisplay key={badge.id} badge={badge} />
                    ))}
                  </div>
                </div>
                
                <div className="badge-category">
                  <h3>Événements</h3>
                  <div className="badges-grid">
                    {badges.filter(b => b.category === 'events').map(badge => (
                      <BadgeDisplay key={badge.id} badge={badge} />
                    ))}
                  </div>
                </div>
                
                <div className="badge-category">
                  <h3>Rares</h3>
                  <div className="badges-grid">
                    {badges.filter(b => b.category === 'rare').map(badge => (
                      <BadgeDisplay key={badge.id} badge={badge} />
                    ))}
                    {badges.filter(b => b.category === 'rare').length === 0 && (
                      <div className="no-badges-message">
                        <p>Vous n'avez pas encore débloqué de badges rares. Ces badges sont attribués pour des réalisations exceptionnelles !</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'stats' && (
          <ProfileStats userStats={userStats} />
        )}
        
        {activeTab === 'history' && (
          <ListeningHistory history={listeningHistory} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;