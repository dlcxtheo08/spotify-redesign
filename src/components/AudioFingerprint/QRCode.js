// src/components/AudioFingerprint/QRCode.js
import React, { useEffect, useRef } from 'react';
import './QRCode.css';

const QRCode = ({ playlist }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current || !playlist) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Configuration du canvas
    const size = 250;
    canvas.width = size;
    canvas.height = size;
    
    // Fond blanc
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);
    
    // Bordure du QR code
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, size - 20, size - 20);
    
    // Dessiner les éléments du QR code
    drawQRElements(ctx, playlist, size);
    
    // Ajouter le logo Spotify au centre
    drawSpotifyLogo(ctx, size);
    
  }, [playlist]);
  
  // Fonction pour dessiner les éléments du QR code
  const drawQRElements = (ctx, playlist, size) => {
    // Convertir l'ID de la playlist en une série de points
    const playlistId = playlist.id;
    const seed = hashCode(playlistId + playlist.name);
    
    const cellSize = (size - 40) / 25; // 25x25 grille pour le QR
    
    // Générer une grille de points basée sur le hash
    let seedValue = seed;
    
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        // Sauter le centre pour le logo
        if (i > 8 && i < 16 && j > 8 && j < 16) continue;
        
        // Coins fixes pour les repères
        if ((i < 7 && j < 7) || (i < 7 && j > 17) || (i > 17 && j < 7)) {
          if (i === 0 || i === 6 || j === 0 || j === 6 || 
              (i > 1 && i < 5 && j > 1 && j < 5)) {
            ctx.fillStyle = 'black';
            ctx.fillRect(20 + j * cellSize, 20 + i * cellSize, cellSize, cellSize);
          }
          continue;
        }
        
        // Génération pseudo-aléatoire des points
        seedValue = (seedValue * 9301 + 49297) % 233280;
        if (seedValue / 233280 < 0.45) {
          ctx.fillStyle = 'black';
          // Formes variées pour un look plus organique
          if (seedValue % 3 === 0) {
            // Point rond
            ctx.beginPath();
            ctx.arc(20 + j * cellSize + cellSize/2, 20 + i * cellSize + cellSize/2, cellSize/2, 0, 2 * Math.PI);
            ctx.fill();
          } else {
            // Point carré
            ctx.fillRect(20 + j * cellSize, 20 + i * cellSize, cellSize, cellSize);
          }
        }
      }
    }
  };
  
  // Fonction pour dessiner le logo Spotify
  const drawSpotifyLogo = (ctx, size) => {
    const logoSize = size / 5;
    const x = size / 2 - logoSize / 2;
    const y = size / 2 - logoSize / 2;
    
    // Fond du logo
    ctx.fillStyle = '#1DB954'; // Vert Spotify
    ctx.beginPath();
    ctx.arc(size/2, size/2, logoSize/2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Simple représentation du logo (3 arcs)
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    
    // Premier arc
    ctx.beginPath();
    ctx.arc(size/2, size/2, logoSize/3, 0.3 * Math.PI, 2.7 * Math.PI);
    ctx.stroke();
    
    // Deuxième arc
    ctx.beginPath();
    ctx.arc(size/2, size/2, logoSize/4, 0.3 * Math.PI, 2.7 * Math.PI);
    ctx.stroke();
    
    // Troisième arc
    ctx.beginPath();
    ctx.arc(size/2, size/2, logoSize/6, 0.3 * Math.PI, 2.7 * Math.PI);
    ctx.stroke();
  };
  
  // Fonction de hachage simple
  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convertir en entier 32 bits
    }
    return hash;
  };

  return (
    <div className="qr-code">
      <canvas ref={canvasRef} className="qr-canvas"></canvas>
      <div className="audio-pattern-indicator">
        <div className="audio-dot"></div>
        <div className="audio-dot"></div>
        <div className="audio-dot"></div>
      </div>
    </div>
  );
};

export default QRCode;