import { useState, useEffect } from 'react';
import { useLocation } from '../context/LocationContext';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { Star } from 'lucide-react';

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

  if (loading || !location) return (
    <div className="page-container" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <p style={{ color: 'var(--text-muted)' }}>Loading your location...</p>
    </div>
  );

  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: '1600px', height: 'calc(100vh - 80px)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', height: '100%', gap: '1.5rem' }}>
        
        {/* Sidebar List */}
        <div style={{ overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '0.5rem' }}>Nearby Businesses</h2>
          {businesses.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No businesses found nearby.</p>
          ) : (
            businesses.map(biz => (
              <Link to={`/business/${biz._id}`} key={biz._id} className="modern-card" style={{ padding: '1.25rem', textDecoration: 'none' }}>
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
        
        {/* Map View */}
        <div style={{ borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid var(--border-color)', background: 'var(--surface)' }}>
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
