import { useState, useEffect } from 'react';
import { useLocation } from '../context/LocationContext';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';

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
      const url = `http://localhost:5001/api/search/nearby?lat=${location.lat}&lng=${location.lng}&radius=50${q ? `&q=${encodeURIComponent(q)}` : ''}`;
      
      axios.get(url)
        .then(res => setBusinesses(res.data))
        .catch(console.error);
    }
  }, [location, searchParams]);

  if (loading || !location) return <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>Loading your location...</div>;

  return (
    <div className="animate-fade-in" style={{ padding: '1rem', height: 'calc(100vh - 70px)' }}>
      <div className="grid grid-cols-1 lg:grid-cols-4" style={{ height: '100%', gap: '1.5rem' }}>
        
        {/* Sidebar List */}
        <div className="lg:col-span-1" style={{ overflowY: 'auto', paddingRight: '1rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Nearby Businesses</h2>
          {businesses.length === 0 ? (
            <p className="text-muted">No businesses found nearby.</p>
          ) : (
            <div className="grid grid-cols-1">
              {businesses.map(biz => (
                <Link to={`/business/${biz._id}`} key={biz._id} className="card">
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{biz.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{biz.category}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge">⭐ {biz.rating} ({biz.reviewsCount})</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>View details →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        {/* Map View */}
        <div className="lg:col-span-3" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <MapContainer center={[location.lat, location.lng]} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
                  <Link to={`/business/${biz._id}`}>View</Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

      </div>
    </div>
  );
}
