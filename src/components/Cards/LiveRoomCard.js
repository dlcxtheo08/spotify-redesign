// src/components/Cards/LiveRoomCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LiveRoomCard.css';

const LiveRoomCard = ({ room }) => {
  return (
    <Link to={`/live-party/room/${room.id}`} className="live-room-card">
      <div className="room-image-container">
        <img 
          src={room.coverImage || '/placeholder-image.jpg'} 
          alt={room.title} 
          className="room-image" 
        />
        <div className="room-overlay">
          <div className="live-badge">EN DIRECT</div>
          <div className="listeners-count">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 9c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z"></path>
              <path d="M19 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"></path>
              <path d="M5 9c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"></path>
              <path d="M3 19c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"></path>
              <path d="M13 19c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"></path>
            </svg>
            <span>{room.listeners}</span>
          </div>
        </div>
      </div>
      <div className="room-content">
        <h3 className="room-title">{room.title}</h3>
        <p className="room-host">Animé par {room.host}</p>
        <p className="current-track">
          <span className="playing-icon"></span>
          {room.currentTrack}
        </p>
        <div className="room-tags">
          {room.tags.map((tag, index) => (
            <span key={index} className="room-tag">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default LiveRoomCard;
