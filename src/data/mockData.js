// src/data/mockData.js
export const initialRooms = [
    {
      id: 'room1',
      title: 'Ambiance du vendredi soir',
      host: 'DJ Mike',
      hostId: 'user2',
      listeners: 253,
      coverImage: '/images/playlists/playlists12.jpg',
      description: 'Rejoignez-nous pour bien commencer le week-end avec les meilleurs morceaux et une ambiance au top !',
      tags: ['Pop', 'Dance', 'Électronique'],
      createdAt: '2023-01-25T20:00:00Z',
      playlistId: 'playlist1',
      playlist: [
        { id: 'track1', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:22', isPlaying: true },
        { id: 'track2', title: 'Don\'t Start Now', artist: 'Dua Lipa', duration: '3:03', isPlaying: false },
        { id: 'track3', title: 'Save Your Tears', artist: 'The Weeknd', duration: '3:09', isPlaying: false },
        { id: 'track4', title: 'Levitating', artist: 'Dua Lipa ft. DaBaby', duration: '3:23', isPlaying: false },
        { id: 'track5', title: 'Dynamite', artist: 'BTS', duration: '3:19', isPlaying: false }
      ],
      messages: [
        { id: 'msg1', user: 'Sarah_M', userId: 'user3', text: 'J’adore ce morceau !', time: '20:45', avatar: '/images/avatar1.jpg' },
        { id: 'msg2', user: 'DJ Mike', userId: 'user2', text: 'Bienvenue à tous à la soirée du vendredi !', time: '20:47', avatar: '/images/avatar2.jpg', isHost: true },
        { id: 'msg3', user: 'MusicLover22', userId: 'user4', text: 'Tu peux passer un peu de Dua Lipa ensuite ?', time: '20:50', avatar: '/images/avatar3.jpg' },
        { id: 'msg4', user: 'Alex', userId: 'user5', text: 'Cette playlist est 🔥', time: '20:52', avatar: '/images/avatar4.jpg' }
      ],
      participants: [
        { id: 'user2', name: 'DJ Mike', avatar: '/images/avatar2.jpg', isHost: true },
        { id: 'user3', name: 'Sarah_M', avatar: '/images/avatar1.jpg' },
        { id: 'user4', name: 'MusicLover22', avatar: '/images/avatar3.jpg' },
        { id: 'user5', name: 'Alex', avatar: '/images/avatar4.jpg' },
        { id: 'user6', name: 'JazzFan', avatar: '/images/avatar5.jpg' },
        { id: 'user7', name: 'RockStar', avatar: '/images/avatar6.jpg' }
      ]
    },
    // Ajoutez d'autres salles ici...
  ];
  
  export const initialPlaylists = [
    {
      id: 'playlist1',
      name: 'Mix du vendredi soir',
      owner: 'DJ Mike',
      ownerId: 'user2',
      coverImage: '/images/playlists/playlists12.jpg',
      tracks: [
        { id: 'track1', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:22' },
        { id: 'track2', title: 'Don\'t Start Now', artist: 'Dua Lipa', duration: '3:03' },
        { id: 'track3', title: 'Save Your Tears', artist: 'The Weeknd', duration: '3:09' },
        { id: 'track4', title: 'Levitating', artist: 'Dua Lipa ft. DaBaby', duration: '3:23' },
        { id: 'track5', title: 'Dynamite', artist: 'BTS', duration: '3:19' }
      ]
    },
    {
      id: 'playlist2',
      name: 'Mes favoris',
      owner: 'Utilisateur actuel',
      ownerId: 'user1',
      coverImage: '/images/playlists/playlists10.jpg',
      tracks: [
        { id: 'track6', title: 'Shape of You', artist: 'Ed Sheeran', duration: '3:54' },
        { id: 'track7', title: 'Someone You Loved', artist: 'Lewis Capaldi', duration: '3:02' },
        { id: 'track8', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', duration: '4:30' },
        { id: 'track9', title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', duration: '2:21' },
        { id: 'track10', title: 'good 4 u', artist: 'Olivia Rodrigo', duration: '2:58' }
      ]
    }
    // Ajoutez d'autres playlists ici...
  ];
  