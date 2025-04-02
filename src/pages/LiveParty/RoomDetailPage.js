// src/pages/LiveParty/RoomDetailPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RoomDetailPage.css';
import { useAppContext } from '../../context/AppContext';
import ShareTooltip from '../../components/Tooltip/ShareTooltip';

const RoomDetailPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { rooms, sendMessage, togglePlayPause, leaveRoom } = useAppContext();
  const [message, setMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(80);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const progressInterval = useRef(null);
  const chatEndRef = useRef(null);

  const room = rooms.find(r => r.id === roomId);

  const timeToSeconds = (timeString) => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!room) {
      navigate('/live-party');
    }
  }, [room, navigate]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [room?.messages]);

  useEffect(() => {
    return () => {
      if (roomId) {
        leaveRoom(roomId);
      }
    };
  }, [roomId, leaveRoom]);

  useEffect(() => {
    if (isPlaying && room) {
      const currentTrack = room.playlist.find(track => track.isPlaying) || room.playlist[0];
      const totalDuration = timeToSeconds(currentTrack.duration);

      progressInterval.current = setInterval(() => {
        setCurrentTime(prevTime => {
          if (prevTime >= totalDuration) {
            clearInterval(progressInterval.current);
            return 0;
          }
          const newTime = prevTime + 1;
          setProgress((newTime / totalDuration) * 100);
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(progressInterval.current);
    }

    return () => {
      clearInterval(progressInterval.current);
    };
  }, [isPlaying, room]);

  if (!room) {
    return <div className="loading">Chargement...</div>;
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(roomId, message);
      setMessage('');
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    const currentTrack = room.playlist.find(track => track.isPlaying) || room.playlist[0];
    togglePlayPause(roomId, currentTrack.id);
  };

  const currentTrack = room.playlist.find(track => track.isPlaying) || room.playlist[0];

  return (
    <div className="room-detail-page">
      <div className="room-main-content">
        <div className="room-header">
          <div className="room-info">
            <h1>{room.title}</h1>
            <p className="host-info">Animé par <span className="host-name">{room.host}</span></p>
            <div className="room-tags">
              {room.tags.map((tag, index) => (
                <span key={index} className="room-tag">{tag}</span>
              ))}
            </div>
            <p className="room-description">{room.description}</p>
          </div>
          <div className="listeners-info">
            <div className="listeners-count">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 9c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z"></path>
                <path d="M19 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"></path>
                <path d="M5 9c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"></path>
                <path d="M3 19c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"></path>
                <path d="M13 19c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"></path>
              </svg>
              <span>{room.listeners} à l’écoute</span>
            </div>
            <div className="invite-button-container">
              <button 
                className="invite-button"
                onClick={() => setShowShareTooltip(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                Inviter des amis
              </button>
              {showShareTooltip && (
                <ShareTooltip 
                  roomId={roomId} 
                  onClose={() => setShowShareTooltip(false)} 
                />
              )}
            </div>
          </div>
        </div>

        <div className="player-section">
          <div className="now-playing">
            <img src={room.coverImage} alt="Album cover" className="track-cover" />
            <div className="track-info">
              <h3 className="track-title">{currentTrack.title}</h3>
              <p className="track-artist">{currentTrack.artist}</p>
            </div>
          </div>
          
          <div className="player-controls">
            <button className="control-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="19 20 9 12 19 4 19 20"></polygon>
                <line x1="5" y1="19" x2="5" y2="5"></line>
              </svg>
            </button>
            
            <button className="control-button play-button" onClick={handlePlayPause}>
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>
            
            <button className="control-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 4 15 12 5 20 5 4"></polygon>
                <line x1="19" y1="5" x2="19" y2="19"></line>
              </svg>
            </button>
          </div>
          
          <div className="volume-control">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="volume-slider"
            />
          </div>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-filled" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-time">
            <span className="current-time">{formatTime(currentTime)}</span>
            <span className="total-time">{currentTrack.duration}</span>
          </div>
        </div>

        <div className="playlist-section">
          <h2>Playlist</h2>
          <ul className="playlist">
            {room.playlist.map((track) => (
              <li 
                key={track.id} 
                className={`playlist-item ${track.isPlaying ? 'playing' : ''}`}
                onClick={() => togglePlayPause(roomId, track.id)}
              >
                <div className="playlist-item-left">
                  {track.isPlaying && (
                    <div className="playing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  )}
                  <div className="track-details">
                    <span className="track-title">{track.title}</span>
                    <span className="track-artist">{track.artist}</span>
                  </div>
                </div>
                <span className="track-duration">{track.duration}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="room-sidebar">
        <div className="sidebar-section participants-section">
          <h3>Participants ({room.participants.length})</h3>
          <div className="participants-list">
            {room.participants.map((participant) => (
              <div key={participant.id} className="participant">
                <img 
                  src={participant.avatar || '/images/default-avatar.jpg'} 
                  alt={participant.name} 
                  className="participant-avatar"
                />
                <span className="participant-name">
                  {participant.name}
                  {participant.isHost && <span className="host-badge">Host</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-section chat-section">
          <h3>Chat</h3>
          <div className="chat-messages">
            {room.messages.map((message) => (
              <div key={message.id} className="chat-message">
                <img 
                  src={message.avatar || '/images/default-avatar.jpg'} 
                  alt={message.user} 
                  className="message-avatar"
                />
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-user">
                      {message.user}
                      {message.isHost && <span className="host-badge">Host</span>}
                    </span>
                    <span className="message-time">{message.time}</span>
                  </div>
                  <p className="message-text">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form className="chat-input-container" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="chat-input"
            />
            <button type="submit" className="send-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;