// src/components/AudioFingerprint/Scanner.js
import React, { useEffect, useRef, useState } from 'react';
import './Scanner.css';

const Scanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  
  useEffect(() => {
    initCamera();
    
    return () => {
      // Nettoyer la caméra lors du démontage du composant
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);
  
  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasCameraPermission(true);
        setScanning(true);
      }
    } catch (error) {
      console.error('Erreur d\'accès à la caméra:', error);
      setHasCameraPermission(false);
    }
  };
  
  const toggleScanning = () => {
    if (scanning) {
      // Arrêter la caméra
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    } else {
      // Redémarrer la caméra
      initCamera();
    }
    
    setScanning(!scanning);
  };
  
  // Simulation: dans une application réelle, on analyserait les frames vidéo
  // pour détecter et décoder les QR codes
  
  return (
    <div className="scanner">
      {hasCameraPermission === false ? (
        <div className="camera-permission-error">
          <p>Accès à la caméra refusé. Veuillez autoriser l'accès à la caméra pour scanner les codes.</p>
          <button className="retry-button" onClick={initCamera}>
            Réessayer
          </button>
        </div>
      ) : (
        <>
          <div className={`video-container ${scanning ? 'scanning' : ''}`}>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className="scanner-video"
            />
            <div className="scanner-overlay">
              <div className="scan-area"></div>
            </div>
          </div>
          
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          
          <button 
            className={`scan-toggle-button ${scanning ? 'stop' : 'start'}`}
            onClick={toggleScanning}
          >
            {scanning ? 'Arrêter le scan' : 'Démarrer le scan'}
          </button>
        </>
      )}
    </div>
  );
};

export default Scanner;