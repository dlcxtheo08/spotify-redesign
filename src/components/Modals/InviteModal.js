// src/components/Modals/InviteModal.js
import React, { useState } from 'react';
import './InviteModal.css';
import { useAppContext } from '../../context/AppContext';

const InviteModal = ({ playlistId, playlistName, onClose }) => {
  const { inviteToPlaylist } = useAppContext();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`Je t'invite à collaborer sur ma playlist "${playlistName}" sur Spotify !`);
  
  // Liste fictive d'amis
  const friends = [
    { id: 'friend1', name: 'Marie Dubois', avatar: '/images/avatar1.jpg', email: 'marie@exemple.fr' },
    { id: 'friend2', name: 'Pierre Martin', avatar: '/images/avatar2.jpg', email: 'pierre@exemple.fr' },
    { id: 'friend3', name: 'Sophie Bernard', avatar: '/images/avatar3.jpg', email: 'sophie@exemple.fr' },
    { id: 'friend4', name: 'Thomas Petit', avatar: '/images/avatar4.jpg', email: 'thomas@exemple.fr' }
  ];
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  
  const selectFriend = (friendEmail) => {
    setEmail(friendEmail);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      alert('Veuillez entrer une adresse email');
      return;
    }
    
    inviteToPlaylist(playlistId, email, message);
    onClose();
  };
  
  const inviteLink = `${window.location.origin}/collaborative/${playlistId}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Inviter à Collaborer</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="email">Adresse Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="exemple@email.com"
              required
            />
          </div>
          
          <div className="friends-section">
            <h3>Amis</h3>
            <div className="friends-list">
              {friends.map((friend) => (
                <div 
                  key={friend.id} 
                  className={`friend-item ${email === friend.email ? 'selected' : ''}`}
                  onClick={() => selectFriend(friend.email)}
                >
                  <img 
                    src={friend.avatar} 
                    alt={friend.name} 
                    className="friend-avatar" 
                  />
                  <div className="friend-info">
                    <span className="friend-name">{friend.name}</span>
                    <span className="friend-email">{friend.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message (Optionnel)</label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              rows="3"
            />
          </div>
          
          <div className="link-section">
            <label>Lien de Partage</label>
            <div className="link-container">
            <input 
            type="text" 
            value={inviteLink} 
            readOnly 
            className="invite-link"
            />
             <button 
               type="button" 
               className="copy-button"
               onClick={() => {
                 navigator.clipboard.writeText(inviteLink);
                 alert('Lien copié !');
               }}
             >
               Copier
             </button>
           </div>
         </div>
         
         <div className="form-actions">
           <button type="button" className="cancel-button" onClick={onClose}>
             Annuler
           </button>
           <button type="submit" className="invite-button">
             Envoyer l'Invitation
           </button>
         </div>
       </form>
     </div>
   </div>
 );
};

export default InviteModal;