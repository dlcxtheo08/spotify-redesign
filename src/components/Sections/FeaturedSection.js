import React from 'react';
import './FeaturedSection.css';

const FeaturedSection = ({ title, description, items, type }) => {
  return (
    <section className="featured-section">
      <div className="section-header">
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      <div className="featured-items">
        {items.map((item, index) => (
          <div key={index} className={`featured-item ${type}`}>
            <div className="item-image-container">
              <img src={item.imageUrl || '/placeholder-image.jpg'} alt={item.title} className="item-image" />
              <div className="item-overlay">
                {type === 'live-party' && (
                  <div className="live-badge">EN DIRECT</div>
                )}
              </div>
            </div>
            <div className="item-content">
              <h3 className="item-title">{item.title}</h3>
              {type === 'live-party' ? (
                <div className="item-details">
                  <p className="item-host">Animé par : {item.host}</p>
                  <p className="item-listeners">{item.listeners} à l’écoute</p>
                </div>
              ) : (
                <p className="item-description">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
