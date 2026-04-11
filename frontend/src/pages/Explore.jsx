import { useState, useEffect } from 'react';
import useLocation from '../hooks/useLocation';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { API_BASE } from '../services/api';

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

export default function Explore() {
  const { location, loading } = useLocation();
  const [businesses, setBusinesses] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (location) {
      const q = searchParams.get('q') || searchParams.get('category') || '';
      const url = `${API_BASE}/search/nearby?lat=${location.lat}&lng=${location.lng}&radius=50${q ? `&q=${encodeURIComponent(q)}` : ''}`;
      
      axios.get(url)
        .then(res => setBusinesses(res.data))
        .catch(console.error);
    }
  }, [location, searchParams]);

  if (loading || !location) return (
    <div className="page-container" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <p style={{ color: 'var(--text-muted)' }}>Loading your location...</p>
    </div>
  );

  return (
    <div className="explore-container animate-fade-in">
      <div className="explore-grid">
        
        {/* Sidebar List */}
        <div className="explore-sidebar">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem' }}>Nearby Businesses</h2>
          <div className="explore-list">
            {businesses.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No businesses found nearby.</p>
            ) : (
              businesses.map(biz => (
                <Link to={`/business/${biz._id}`} key={biz._id} className="modern-card explore-card">
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>{biz.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>{biz.category}</p>
                  <div className="flex-between">
                    <span className="badge-minimal badge-neutral">
                      <Star size={12} style={{ marginRight: '4px' }} /> {biz.rating} ({biz.reviewsCount})
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      View &rarr;
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
        
        {/* Map View */}
        <div className="explore-map-wrapper">
          <MapContainer center={[location.lat, location.lng]} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <MapUpdater center={[location.lat, location.lng]} />
            
            {/* User Marker */}
            <Marker position={[location.lat, location.lng]}>
              <Popup>You are here</Popup>
            </Marker>

            {/* Business Markers */}
            {businesses.map(biz => (
              <Marker key={biz._id} position={[biz.location.coordinates[1], biz.location.coordinates[0]]}>
                <Popup>
                  <strong>{biz.name}</strong><br/>
                  {biz.category}<br/>
                  <Link to={`/business/${biz._id}`}>View details</Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

      </div>
    </div>
  );
}
