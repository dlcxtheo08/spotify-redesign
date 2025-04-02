// src/components/Banners/NewFeaturesBanner.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NewFeaturesBanner.css';

const NewFeaturesBanner = ({ title, description }) => {
  return (
    <div className="new-features-banner">
      <div className="banner-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="features-buttons">
          <Link to="/live-party" className="feature-button">
            <span className="feature-icon live-icon"></span>
            <span className="feature-name">Soirée en direct</span>
          </Link>
          <Link to="/collaborative" className="feature-button">
            <span className="feature-icon collab-icon"></span>
            <span className="feature-name">Collaboratif</span>
          </Link>
          <Link to="/audio-fingerprint" className="feature-button">
            <span className="feature-icon fingerprint-icon"></span>
            <span className="feature-name">Empreinte audio</span>
          </Link>
          <Link to="/voice-comments" className="feature-button">
            <span className="feature-icon voice-icon"></span>
            <span className="feature-name">Notes vocales</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewFeaturesBanner;
