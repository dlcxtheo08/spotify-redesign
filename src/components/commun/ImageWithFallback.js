// src/components/common/ImageWithFallback.js
import React, { useState } from 'react';

const ImageWithFallback = ({ src, alt, className, ...props }) => {
  const [error, setError] = useState(false);
  
  const fallbackSrc = src.includes('avatar') 
    ? '/images/avatars/default-avatar.jpg'
    : src.includes('badge')
    ? '/images/badges/default-badge.png'
    : '/images/default-image.jpg';
  
  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt || 'Image'}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default ImageWithFallback;