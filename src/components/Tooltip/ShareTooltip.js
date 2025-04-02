// src/components/Tooltip/ShareTooltip.js
import React, { useState, useEffect } from 'react';
import './ShareTooltip.css';

const ShareTooltip = ({ roomId, onClose }) => {
  const [copied, setCopied] = useState(false);
  const inviteLink = `${window.location.origin}/live-party/room/${roomId}`;
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [onClose]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  
  return (
    <div className="share-tooltip">
      <p>Partage ce lien avec tes amis :</p>
      <div className="invite-link-container">
        <input type="text" value={inviteLink} readOnly className="invite-link" />
        <button onClick={handleCopy} className="copy-button">
          {copied ? 'Copié !' : 'Copier'}
        </button>
      </div>
    </div>
  );
};

export default ShareTooltip;
