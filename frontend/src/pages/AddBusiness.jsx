/* eslint-disable react-hooks/set-state-in-effect, no-unused-vars, no-empty, react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import axios from 'axios';
import { FiLoader, FiMapPin } from "react-icons/fi";

function LocationSelector({ markerPos, setMarkerPos }) {
  useMapEvents({
    click(e) {
      setMarkerPos(e.latlng);
    },
  });
  return markerPos ? <Marker position={markerPos} /> : null;
}

function MapCenterUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 14);
  }, [center, map]);
  return null;
}

export default function AddBusiness() {
  const { user } = useAuth();
  const location = null; 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', description: '', category: '', phone: '', email: '', address: ''
  });
  const [markerPos, setMarkerPos] = useState(null);
  const [mapSearch, setMapSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5001/api/business/category')
      .then(res => setAvailableCategories(res.data))
      .catch(() => {
         setAvailableCategories([{_id: 1, name: "Electrician"}, {_id: 2, name: "Plumber"}]);
      });
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!mapSearch || !isTyping) {
        setSuggestions([]); return;
      }
      try {
        const res = await axios.get(`https://photon.komoot.io/api/?q=${encodeURIComponent(mapSearch)}&limit=5`);
        if (res.data && res.data.features) {
          setSuggestions(res.data.features);
        }
      } catch {}
    };
    
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [mapSearch, isTyping]);

  useEffect(() => {
    if (location && !markerPos) {
      setTimeout(() => {
        setMarkerPos({ lat: location.lat, lng: location.lng });
        setMapCenter([location.lat, location.lng]);
      }, 0);
    }
  }, [location, markerPos]);

  if (!user) {
    return (
      <div className="auth-wrapper animate-fade-in">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <p className="auth-title" style={{ fontSize: '1.25rem' }}>Login required</p>
          <p className="auth-subtitle">Please sign in to add your business.</p>
          <button onClick={() => navigate("/login")} className="auth-button" style={{ marginTop: '1.5rem' }}>Login</button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      if (!markerPos) {
        alert("Please select a location on the map.");
        setIsSubmitting(false);
        return;
      }
      
      const payload = {
        ...formData,
        lat: markerPos.lat,
        lng: markerPos.lng
      };
      
      const res = await axios.post('http://localhost:5001/api/business', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/business/${res.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding business');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="modern-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 className="auth-title" style={{ marginBottom: '2rem', textAlign: 'center' }}>Register a New Business</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <input type="text" className="auth-input" placeholder="Business Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          
          <div className="auth-input-group">
            <select className="auth-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required style={{ color: formData.category ? "var(--text-main)" : "#64748b" }}>
              <option value="" disabled>Select a category</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Cafe">Cafe</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Tutor">Tutor</option>
              <option value="Gym">Gym</option>
              {availableCategories.map(cat => (
                 <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div className="auth-input-group">
            <textarea className="auth-input" placeholder="Describe your business and services..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required rows="4"></textarea>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
             <input type="text" className="auth-input" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
             <input type="email" className="auth-input" placeholder="Contact Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
          
          <div className="auth-input-group" style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search address or click on map..." 
              className="auth-input"
              value={mapSearch}
              onChange={e => {
                setMapSearch(e.target.value);
                setFormData({...formData, address: e.target.value});
                setIsTyping(true);
              }}
              required
            />
            {suggestions.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', zIndex: 1000, overflow: 'hidden' }}>
                {suggestions.map((s, idx) => {
                  const placeName = [s.properties.name, s.properties.street, s.properties.city, s.properties.state].filter(Boolean).join(', ');
                  return (
                    <div 
                      key={idx} 
                      style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                      onClick={() => {
                        const coords = s.geometry.coordinates; // [lon, lat]
                        setMapSearch(placeName);
                        setFormData({...formData, address: placeName});
                        setMapCenter([parseFloat(coords[1]), parseFloat(coords[0])]);
                        setMarkerPos({ lat: parseFloat(coords[1]), lng: parseFloat(coords[0]) });
                        setSuggestions([]);
                        setIsTyping(false);
                      }}
                    >
                      {placeName}
                    </div>
                  );
                })}
              </div>
            )}
            
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
               <FiMapPin /> Or select exact coordinates manually below
            </p>
            <div style={{ height: '280px', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--border-color)', marginTop: '0.5rem' }}>
              <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <MapCenterUpdater center={mapCenter} />
                <LocationSelector markerPos={markerPos} setMarkerPos={setMarkerPos} />
              </MapContainer>
            </div>
          </div>
          
          <button type="submit" disabled={isSubmitting} className="auth-button">
            {isSubmitting ? <span className="auth-loading"><FiLoader /></span> : "Add Business"}
          </button>
        </form>
      </div>
    </div>
  );
}
