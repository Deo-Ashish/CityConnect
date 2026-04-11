import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import axios from 'axios';

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

export default function EditBusiness() {
  const { id } = useParams();
  const { user } = useAuth();
  const { location } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', description: '', category: '', phone: '', email: '', address: ''
  });
  const [markerPos, setMarkerPos] = useState(null);
  const [mapSearch, setMapSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]);

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
      } catch (err) {}
    };
    
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [mapSearch, isTyping]);

  useEffect(() => {
    // Fetch existing business data
    axios.get(`http://localhost:5001/api/business/${id}`)
      .then(res => {
        const { name, description, category, phone, email, address, location: bizLoc } = res.data;
        setFormData({ name, description, category, phone, email, address });
        if (bizLoc && bizLoc.coordinates) {
          const lat = bizLoc.coordinates[1];
          const lon = bizLoc.coordinates[0];
          setMarkerPos({ lat, lng: lon });
          setMapCenter([lat, lon]);
        }
      })
      .catch(err => {
        alert("Failed to load business data");
        navigate(-1);
      });
  }, [id, navigate]);

  if (!user || user.role !== 'business') {
    return <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>Not authorized.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!markerPos) {
        alert("Please select a location on the map.");
        return;
      }
      
      const payload = {
        ...formData,
        lat: markerPos.lat,
        lng: markerPos.lng
      };
      
      const res = await axios.put(`http://localhost:5001/api/business/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/business/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating business');
    }
  };

  return (
    <div className="animate-fade-in container" style={{ padding: '2rem 1rem', maxWidth: '600px' }}>
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Edit Business</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Business Name</label>
            <input type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="input-group">
            <label className="input-label">Category</label>
            <input type="text" className="input-field" placeholder="e.g. Electricians" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
          </div>
          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea className="input-field" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required rows="3"></textarea>
          </div>
          <div className="input-group">
            <label className="input-label">Phone</label>
            <input type="text" className="input-field" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input type="email" className="input-field" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="input-group" style={{ position: 'relative' }}>
            <label className="input-label">Address / Location Search</label>
            <input 
              type="text" 
              placeholder="Start typing an address or place..." 
              className="input-field"
              value={mapSearch}
              onChange={e => {
                setMapSearch(e.target.value);
                setFormData({...formData, address: e.target.value});
                setIsTyping(true);
              }}
              required
            />
            {suggestions.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', zIndex: 1000, overflow: 'hidden' }}>
                {suggestions.map((s, idx) => {
                  const placeName = [s.properties.name, s.properties.street, s.properties.city, s.properties.state].filter(Boolean).join(', ');
                  return (
                    <div 
                      key={idx} 
                      style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
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
            
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.75rem 0 0.5rem 0' }}>Or click anywhere on the map below to pinpoint exact coordinates manually.</p>
            <div style={{ height: '300px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapCenterUpdater center={mapCenter} />
                <LocationSelector markerPos={markerPos} setMarkerPos={setMarkerPos} />
              </MapContainer>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Update Business</button>
        </form>
      </div>
    </div>
  );
}
