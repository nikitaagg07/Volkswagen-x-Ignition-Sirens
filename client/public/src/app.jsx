import React from 'react';
import Map from './components/Map';
import Playlist from './components/Playlist';
import Distance from './components/Distance';

function App() {
  return (
    <div id="dashboard">
      <div className="map-block" id="map-container">
        <Map />
      </div>
      <div className="spotify-block" id="spotify-container">
        <Playlist />
      </div>
      <div className="cars-connected-block" id="car-connections-container">
        <Distance />
      </div>
    </div>
  );
}

export default App;
