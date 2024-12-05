// MapComponent.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { socket } from '../socket';

export default function MapComponent() {
    const [location, setLocation] = useState(null);

    const handleMapClick = (event) => {
        const breakLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setLocation(breakLocation);
    };
    
    const handleTakeBreak = () => {
        if (!location) return;  // Ensure a location is selected
        socket.emit('break-alert', { location });
    };
    
    return (
        <div>
            <MapContainer center={[51.505, -0.09]} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {location && <Marker position={location}>
                    <Popup>Break Point</Popup>
                </Marker>}
            </MapContainer>
            <button onClick={handleTakeBreak}>Take a Break</button>
        </div>
    );
}
