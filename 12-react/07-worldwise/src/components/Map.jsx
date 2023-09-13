import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './Map.module.css';
import { useState } from 'react';
import { useCities } from '../contexts/CitiesContext';

const Map = () => {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  // return (
  //   <div
  //     className={styles.mapContainer}
  //     onClick={() => {
  //       navigate('form');
  //     }}
  //   >
  //     <h1>Map</h1>
  //     <h1>
  //       Position: {lat}, {lng}
  //     </h1>
  //     <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>Change position</button>
  //   </div>
  // );

  return (
    <MapContainer className={styles.mapContainer} center={mapPosition} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {cities.map((city) => (
        <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
          <Popup>
            <span>{city.emoji}</span>
            <span>{city.cityName}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
