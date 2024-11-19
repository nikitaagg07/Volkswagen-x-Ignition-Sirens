// PlaylistComponent.jsx
import React, { useEffect, useState } from 'react';
import { socket } from '../socket';

export default function PlaylistComponent() {
    const [currentSong, setCurrentSong] = useState(null);

    const playSong = (song) => {
        setCurrentSong(song);
        socket.emit('sync-song', song);
    };

    useEffect(() => {
        socket.on('sync-song', (song) => {
            setCurrentSong(song);
        });
    }, []);

    return (
        <div>
            <h2>Now Playing: {currentSong ? currentSong.title : 'Select a Song'}</h2>
            {/* Render playlist with clickable songs */}
        </div>
    );
}
