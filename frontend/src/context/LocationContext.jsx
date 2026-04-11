/* eslint-disable react-refresh/only-export-components, no-unused-vars */
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null); // { lat, lng }
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const res = await axios.get(`https://photon.komoot.io/reverse?lon=${lon}&lat=${lat}`);
          let placeName = 'Current Location';
          
          let radius = 50;
          if (res.data && res.data.features && res.data.features.length > 0) {
            const props = res.data.features[0].properties;
            const parts = [props.city || props.county, props.state].filter(Boolean);
            const uniqueParts = [...new Set(parts)];
            placeName = uniqueParts.length > 0 ? uniqueParts.join(', ') : (props.name || 'Your Location');
            
            if (props.extent) {
              const R = 6371;
              const dLat = (props.extent[1] - lat) * Math.PI / 180;
              const dLon = (props.extent[0] - lon) * Math.PI / 180;
              const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat * Math.PI / 180) * Math.cos(props.extent[1] * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
              radius = Math.max(50, Math.ceil(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))));
            }
          }

          setLocation({ lat, lng: lon, name: placeName, radius });
        } catch (err) {
          setLocation({ lat: position.coords.latitude, lng: position.coords.longitude, name: 'Current Location', radius: 50 });
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Unable to retrieve your location');
        setLoading(false);
        // Default to a central city coordinate if failed
        setLocation({ lat: 28.6139, lng: 77.2090, name: 'New Delhi, Delhi', radius: 50 });
      }
    );
  }, []);

  const setCustomLocation = async (city) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://photon.komoot.io/api/?q=${encodeURIComponent(city)}&limit=1`);
      if (res.data && res.data.features && res.data.features.length > 0) {
        const coords = res.data.features[0].geometry.coordinates; // [lon, lat]
        const props = res.data.features[0].properties;
        const placeName = props.name || props.city || city;
        
        let radius = 50;
        if (props.extent) {
          const R = 6371;
          const lat1 = parseFloat(coords[1]);
          const lon1 = parseFloat(coords[0]);
          const dLat = (props.extent[1] - lat1) * Math.PI / 180;
          const dLon = (props.extent[0] - lon1) * Math.PI / 180;
          const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(props.extent[1] * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
          radius = Math.max(50, Math.ceil(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))));
        }
        
        setLocation({ 
          lat: parseFloat(coords[1]), 
          lng: parseFloat(coords[0]),
          name: placeName,
          radius
        });
        setError(null);
      } else {
        setError('City or place not found');
      }
    } catch (err) {
      setError('Failed to find location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocationContext.Provider value={{ location, error, loading, setCustomLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
