// src/context/AppContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { initialRooms, initialPlaylists } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem('spotifyRooms');
    return savedRooms ? JSON.parse(savedRooms) : initialRooms;
  });
  

  
  const [playlists, setPlaylists] = useState(() => {
    const savedPlaylists = localStorage.getItem('spotifyPlaylists');
    return savedPlaylists ? JSON.parse(savedPlaylists) : initialPlaylists;
  });

  // Simuler la persistance des données
  useEffect(() => {
    localStorage.setItem('spotifyRooms', JSON.stringify(rooms));
    localStorage.setItem('spotifyPlaylists', JSON.stringify(playlists));
  }, [rooms, playlists]);

  // Fonctions pour manipuler les données
  const createRoom = (roomData) => {
    const newRoom = {
      id: `room-${Date.now()}`,
      createdAt: new Date().toISOString(),
      listeners: 1,
      messages: [],
      participants: [
        { 
          id: currentUser.id, 
          name: currentUser.name, 
          avatar: currentUser.avatar, 
          isHost: true 
        }
      ],
      ...roomData
    };
    
    setRooms([newRoom, ...rooms]);
    return newRoom.id;
  };

  const joinRoom = (roomId) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        // Vérifier si l'utilisateur n'est pas déjà dans la salle
        if (!room.participants.some(p => p.id === currentUser.id)) {
          return {
            ...room,
            listeners: room.listeners + 1,
            participants: [...room.participants, {
              id: currentUser.id,
              name: currentUser.name,
              avatar: currentUser.avatar,
              isHost: false
            }]
          };
        }
      }
      return room;
    }));
  };

  const leaveRoom = (roomId) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          listeners: Math.max(0, room.listeners - 1),
          participants: room.participants.filter(p => p.id !== currentUser.id)
        };
      }
      return room;
    }));
  };

  const sendMessage = (roomId, text) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      user: currentUser.name,
      userId: currentUser.id,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: currentUser.avatar,
      isHost: rooms.find(r => r.id === roomId)?.participants.find(p => p.id === currentUser.id)?.isHost || false
    };
    
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          messages: [...room.messages, newMessage]
        };
      }
      return room;
    }));
  };

  const togglePlayPause = (roomId, trackId) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          playlist: room.playlist.map(track => ({
            ...track,
            isPlaying: track.id === trackId
          }))
        };
      }
      return room;
    }));
  };

  const createCollabPlaylist = (playlistData) => {
    const newPlaylistId = `playlist-${Date.now()}`;
    const newPlaylist = {
      id: newPlaylistId,
      isCollaborative: true,
      createdAt: new Date().toISOString(),
      ...playlistData,
      tracks: []
    };
    
    setPlaylists(prev => [newPlaylist, ...prev]);
    return newPlaylistId;
  };
  
  const addTrackToPlaylist = (playlistId, trackData) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        const newTrack = {
          id: `track-${Date.now()}`,
          addedBy: currentUser.name,
          addedById: currentUser.id,
          addedAt: new Date().toISOString(),
          votes: 0,
          ...trackData
        };
        
        return {
          ...playlist,
          tracks: [...(playlist.tracks || []), newTrack]
        };
      }
      return playlist;
    }));
  };
  
  const voteTrack = (playlistId, trackId, direction) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          tracks: playlist.tracks.map(track => {
            if (track.id === trackId) {
              return {
                ...track,
                votes: track.votes + (direction === 'up' ? 1 : -1)
              };
            }
            return track;
          })
        };
      }
      return playlist;
    }));
  };
  
  const removeTrack = (playlistId, trackId) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          tracks: playlist.tracks.filter(track => track.id !== trackId)
        };
      }
      return playlist;
    }));
  };
  
  const inviteToPlaylist = (playlistId, email, message) => {
    // Simulation d'envoi d'invitation
    console.log(`Invitation envoyée à ${email} pour la playlist ${playlistId} avec le message: ${message}`);
    // Dans une application réelle, cela déclencherait un appel API
  };

  const [memoriesData, setMemoriesData] = useState([
    {
      id: 'memory1',
      type: 'locations',
      title: 'Paris 2023',
      description: 'Les chansons que vous avez écoutées lors de votre voyage à Paris',
      date: 'Juin 2023',
      coverImage: '/images/memories/paris.jpg',
      contextType: 'Lieu',
      duration: '1h 47min',
      context: [
        { type: 'Lieu', value: 'Paris, France' },
        { type: 'Saison', value: 'Été' },
        { type: 'Année', value: '2023' }
      ],
      tracks: [
        { title: 'La Vie En Rose', artist: 'Édith Piaf', duration: '3:11', context: 'Écouté près de la Tour Eiffel' },
        { title: 'Non, Je Ne Regrette Rien', artist: 'Édith Piaf', duration: '2:21' },
        { title: 'Sous le Ciel de Paris', artist: 'Yves Montand', duration: '2:48', context: 'Pendant une balade sur les Champs-Élysées' },
        { title: 'Je T\'aime', artist: 'Lara Fabian', duration: '4:36' },
        { title: 'Alors On Danse', artist: 'Stromae', duration: '3:28', context: 'Dans un café du Marais' }
      ],
      similarMemories: [
        { title: 'Londres 2022', coverImage: '/images/memories/londres.jpg', tracksCount: 12 },
        { title: 'Rome 2023', coverImage: '/images/memories/rome.jpg', tracksCount: 8 }
      ]
    },
    {
      id: 'memory2',
      type: 'seasons',
      title: 'Été 2023',
      description: 'Votre bande-son de l\'été 2023',
      date: 'Juin - Août 2023',
      coverImage: '/images/memories/ete.jpg',
      contextType: 'Saison',
      duration: '2h 32min',
      context: [
        { type: 'Saison', value: 'Été' },
        { type: 'Année', value: '2023' }
      ],
      tracks: [
        { title: 'Flowers', artist: 'Miley Cyrus', duration: '3:21' },
        { title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' },
        { title: 'As It Was', artist: 'Harry Styles', duration: '2:47', context: 'Souvent écouté à la plage' },
        { title: 'Calm Down', artist: 'Rema & Selena Gomez', duration: '3:40' },
        { title: 'Die For You', artist: 'The Weeknd & Ariana Grande', duration: '3:20', context: 'Pendant vos soirées d\'été' },
        { title: 'Unholy', artist: 'Sam Smith & Kim Petras', duration: '2:36' }
      ],
      similarMemories: [
        { title: 'Printemps 2023', coverImage: '/images/memories/printemps.jpg', tracksCount: 14 },
        { title: 'Noel 2023', coverImage: '/images/memories/hiver.jpg', tracksCount: 10 }
      ]
    },
    {
      id: 'memory3',
      type: 'years',
      title: '2022 en musique',
      description: 'Vos titres les plus écoutés en 2022',
      date: 'Janvier - Décembre 2022',
      coverImage: '/images/memories/2022.jpg',
      contextType: 'Année',
      duration: '3h 45min',
      context: [
        { type: 'Année', value: '2022' }
      ],
      tracks: [
        { title: 'Heat Waves', artist: 'Glass Animals', duration: '3:59' },
        { title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', duration: '2:21', context: 'Votre titre le plus écouté de l\'année' },
        { title: 'Easy On Me', artist: 'Adele', duration: '3:45' },
        { title: 'Ghost', artist: 'Justin Bieber', duration: '2:33' },
        { title: 'abcdefu', artist: 'GAYLE', duration: '2:48' },
        { title: 'INDUSTRY BABY', artist: 'Lil Nas X & Jack Harlow', duration: '3:32', context: 'Très écouté au printemps' },
        { title: 'Cold Heart', artist: 'Elton John & Dua Lipa', duration: '3:23' }
      ],
      similarMemories: [
        { title: '2021 en musique', coverImage: '/images/memories/2021.jpg', tracksCount: 20 },
        { title: '2023 jusqu\'à présent', coverImage: '/images/memories/2023.jpg', tracksCount: 15 }
      ]
    },
    {
      id: 'memory4',
      type: 'events',
      title: 'Soirée d\'anniversaire',
      description: 'Les titres joués lors de votre anniversaire',
      date: '15 Juillet 2023',
      coverImage: '/images/memories/anniversaire.jpg',
      contextType: 'Événement',
      duration: '1h 15min',
      context: [
        { type: 'Événement', value: 'Anniversaire' },
        { type: 'Lieu', value: 'Maison' },
        { type: 'Date', value: '15 Juillet 2023' }
      ],
      tracks: [
        { title: 'Happy', artist: 'Pharrell Williams', duration: '3:53', context: 'Joué au début de la soirée' },
        { title: 'Celebration', artist: 'Kool & The Gang', duration: '3:40' },
        { title: 'I Gotta Feeling', artist: 'Black Eyed Peas', duration: '4:50' },
        { title: 'Don\'t Stop Me Now', artist: 'Queen', duration: '3:30', context: 'Moment fort de la soirée' },
        { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', duration: '4:30' }
      ],
      similarMemories: [
        { title: 'Fête de Noël 2022', coverImage: '/images/memories/noel.jpg', tracksCount: 8 },
        { title: 'Nouvel An 2023', coverImage: '/images/memories/nouvelan.jpg', tracksCount: 10 }
      ]
    }
  ]);

  const [currentUser, setCurrentUser] = useState({
    id: 'user1',
    name: 'Thomas Martin',
    username: 'thomas_music',
    avatar: '/images/avatars/user-avatar.jpg',
    level: 12
  });
  
  const [userStats, setUserStats] = useState({
    followers: 127,
    following: 89,
    levelProgress: 65,
    pointsToNextLevel: 350,
    minutesListened: 4230,
    songsPlayed: 847,
    averageDailyTime: '2h 15min',
    differentArtists: 183,
    playlistsCreated: 24,
    playlistsFollowed: 37,
    tracksSuggested: 53,
    livePartiesJoined: 12,
    topArtists: [
      { id: 'artist1', name: 'The Weeknd', image: '/images/artists/theweeknd.jpg' },
      { id: 'artist2', name: 'Daft Punk', image: '/images/artists/daftpunk.jpg' },
      { id: 'artist3', name: 'Kendrick Lamar', image: '/images/artists/kendrick.jpg' },
      { id: 'artist4', name: 'Billie Eilish', image: '/images/artists/Billie Eilish.jpg' },
      { id: 'artist5', name: 'Queen', image: '/images/artists/Queen.jpg' },
      { id: 'artist6', name: 'Stromae', image: '/images/artists/stromae.jpg' }
    ],
    topGenres: [
      { name: 'Pop', percentage: 32, color: '#1ED760' },
      { name: 'Hip-Hop', percentage: 28, color: '#8A2BE2' },
      { name: 'Rock', percentage: 18, color: '#E74C3C' },
      { name: 'Électronique', percentage: 15, color: '#3498DB' },
      { name: 'Jazz', percentage: 7, color: '#F39C12' }
    ],
    recentActivity: [
      { type: 'playlist', text: 'Vous avez créé la playlist "Summer Vibes 2023"', time: 'Il y a 2 heures' },
      { type: 'badge', text: 'Vous avez débloqué le badge "Explorateur Musical"', time: 'Hier' },
      { type: 'level', text: 'Vous avez atteint le niveau 12', time: 'Il y a 3 jours' },
      { type: 'playlist', text: 'Vous avez participé à une écoute en direct "Friday Night Party"', time: 'Il y a 4 jours' }
    ]
  });
  
  const [badges, setBadges] = useState([
    {
      id: 'badge1',
      name: 'Explorateur Musical',
      description: 'Découvrez 100 nouveaux artistes',
      icon: '/images/badges/badge-explorer.png',
      category: 'listening',
      earned: true,
      earnedDate: '15/03/2023',
      rareness: 2,
      howToEarn: 'Écoutez de la musique de 100 artistes différents que vous n\'avez jamais écoutés auparavant.',
      reward: 'Débloquez la génération automatique de playlists de découverte personnalisées'
    },
    {
      id: 'badge2',
      name: 'DJ Social',
      description: 'Organisez 10 écoutes en direct',
      icon: '/images/badges/badge-dj.png',
      category: 'social',
      earned: true,
      earnedDate: '02/04/2023',
      rareness: 3,
      howToEarn: 'Créez et hébergez 10 sessions d\'écoute en direct "Live Party" avec au moins 5 participants.',
      reward: 'Débloquez des options supplémentaires pour personnaliser vos sessions d\'écoute en direct'
    },
    {
      id: 'badge3',
      name: 'Marathonien Musical',
      description: 'Écoutez de la musique pendant 24h cumulées',
      icon: '/images/badges/badge-marathon.png',
      category: 'listening',
      earned: true,
      earnedDate: '22/02/2023',
      rareness: 2,
      howToEarn: 'Accumulez 24 heures d\'écoute de musique sur une période de 7 jours.',
      reward: 'Débloquez des statistiques d\'écoute avancées'
    },
    {
      id: 'badge4',
      name: 'Créateur de Tendances',
      description: 'Créez une playlist suivie par 50 personnes',
      icon: '/images/badges/badge-trendsetter.png',
      category: 'creative',
      earned: true,
      earnedDate: '10/01/2023',
      rareness: 4,
      howToEarn: 'Créez une playlist qui atteint 50 followers.',
      reward: 'Vos playlists sont mises en avant dans les recommandations'
    },
    {
      id: 'badge5',
      name: 'Mélomane Nocturne',
      description: 'Écoutez pendant 10 nuits consécutives',
      icon: '/images/badges/badge-night.png',
      category: 'listening',
      earned: false,
      progress: 70,
      rareness: 3,
      howToEarn: 'Écoutez de la musique après minuit pendant 10 jours consécutifs.',
      reward: 'Débloquez des thèmes sombres exclusifs pour l\'application'
    },
    {
      id: 'badge6',
      name: 'Collaborateur d\'Élite',
      description: 'Contribuez à 20 playlists collaboratives',
      icon: '/images/badges/badge-collaboration.png',
      category: 'social',
      earned: false,
      progress: 85,
      rareness: 3,
      howToEarn: 'Ajoutez des titres à 20 playlists collaboratives différentes.',
      reward: 'Débloquez des fonctionnalités avancées pour les playlists collaboratives'
    },
    {
      id: 'badge7',
      name: 'Audiophile',
      description: 'Écoutez 1000 titres en haute qualité',
      icon: '/images/badges/badge-audiophile.png',
      category: 'listening',
      earned: false,
      progress: 43,
      rareness: 4,
      howToEarn: 'Écoutez 1000 titres en qualité audio très haute définition.',
      reward: 'Accès anticipé aux nouvelles fonctionnalités audio'
    },
    {
      id: 'badge8',
      name: 'Expert en Festival',
      description: 'Participez à 5 événements musicaux',
      icon: '/images/badges/badge-festival.png',
      category: 'events',
      earned: false,
      progress: 20,
      rareness: 5,
      howToEarn: 'Assistez à 5 concerts ou festivals et ajoutez-les à votre profil.',
      reward: 'Accès prioritaire aux préventes de billets d\'événements'
    }
  ]);

  const [listeningHistory, setListeningHistory] = useState([
    {
      type: 'track',
      title: 'Blinding Lights',
      subtitle: 'The Weeknd',
      image: '/images/artists/theweeknd.jpg',
      time: '14:22',
      date: 'Aujourd\'hui'
    },
    {
      type: 'album',
      title: 'Random Access Memories',
      subtitle: 'Daft Punk',
      image: '/images/artists/daftpunk.jpg',
      time: '13:05',
      date: 'Aujourd\'hui'
    },
    {
      type: 'playlist',
      title: 'Chill Mix',
      subtitle: 'Créée par Spotify',
      image: '/images/playlists/playlists1.jpg',
      time: '11:30',
      date: 'Aujourd\'hui'
    },
    {
      type: 'track',
      title: 'HUMBLE.',
      subtitle: 'Kendrick Lamar',
      image: '/images/artists/kendrick.jpg',
      time: '09:45',
      date: 'Aujourd\'hui'
    },
    {
      type: 'artist',
      title: 'Billie Eilish',
      subtitle: 'Artiste',
      image: '/images/artists/Billie Eilish.jpg',
      time: '20:15',
      date: 'Hier'
    },
    {
      type: 'track',
      title: 'Bohemian Rhapsody',
      subtitle: 'Queen',
      image: '/images/artists/Queen.jpg',
      time: '19:30',
      date: 'Hier'
    },
    {
      type: 'album',
      title: 'Multitude',
      subtitle: 'Stromae',
      image: '/images/artists/stromae.jpg',
      time: '18:45',
      date: 'Hier'
    },
    {
      type: 'playlist',
      title: 'Découvertes de la semaine',
      subtitle: 'Créée par Spotify',
      image: '/images/playlists/playlists7.jpg',
      time: '16:20',
      date: 'Hier'
    }
   ]);

  return (
    <AppContext.Provider value={{
        rooms,
        playlists,
        currentUser,
        memoriesData,
        userStats,
        badges,
        listeningHistory,
        createRoom,
        joinRoom,
        leaveRoom,
        sendMessage,
        togglePlayPause,
        createCollabPlaylist,
        addTrackToPlaylist,
        voteTrack,
        removeTrack,
        inviteToPlaylist
      }}>
        {children}
      </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);