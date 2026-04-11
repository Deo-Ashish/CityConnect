<<<<<<< HEAD
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import businessService from "../services/businessService";
=======
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import axios from 'axios';
>>>>>>> 9abce5f (code written again)

function LocationSelector({ markerPos, setMarkerPos }) {
  useMapEvents({
    click(e) {
      setMarkerPos(e.latlng);
    },
  });
<<<<<<< HEAD
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
=======
  return markerPos ? <Marker position={markerPos} /> : null;
}
>>>>>>> 9abce5f (code written again)

function MapCenterUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 14);
  }, [center, map]);
  return null;
}

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await businessService.create(form);

      if (response.success && response.data) {
        navigate(`/business/${response.data._id}`);
      } else {
        setError(response.message || "Unable to submit business. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Unable to submit business. Please try again.");
    } finally {
      setSubmitting(false);
=======
export default function AddBusiness() {
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
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    // Fetch categories to populate dropdown
    axios.get('http://localhost:5001/api/categories')
      .then(res => setAvailableCategories(res.data))
      .catch(console.error);
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
      } catch (err) {}
    };
    
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [mapSearch, isTyping]);

  useEffect(() => {
    if (location && !markerPos) {
      setMarkerPos({ lat: location.lat, lng: location.lng });
      setMapCenter([location.lat, location.lng]);
    }
  }, [location]);

  if (!user) {
    return <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>Please login to add a business.</div>;
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
      
      const res = await axios.post('http://localhost:5001/api/business', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/business/${res.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding business');
>>>>>>> 9abce5f (code written again)
    }
  };

  return (
    <div className="animate-fade-in container" style={{ padding: '2rem 1rem', maxWidth: '600px' }}>
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Add a New Business</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Business Name</label>
            <input type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="input-group">
            <label className="input-label">Category</label>
            <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required>
              <option value="" disabled>Select a category</option>
              {availableCategories.map(cat => (
                 <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
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

<<<<<<< HEAD
<<<<<<< HEAD
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
=======
      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
>>>>>>> 34707b7 (improved some styling)
        />
        <input
          name="category"
          placeholder="Category"
<<<<<<< HEAD
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
=======
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
>>>>>>> 34707b7 (improved some styling)
        />
        <input
          name="address"
          placeholder="Address"
<<<<<<< HEAD
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
=======
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
>>>>>>> 34707b7 (improved some styling)
        />
        <input
          name="phone"
          placeholder="Phone"
<<<<<<< HEAD
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
        />

        <textarea
          name="description"
          placeholder="Description"
=======
          value={form.phone}
>>>>>>> 34707b7 (improved some styling)
          onChange={handleChange}
          className="w-full border border-slate-400 p-2 rounded outline-none"
        />

<<<<<<< HEAD
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Business
=======
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Add Business"}
>>>>>>> 34707b7 (improved some styling)
        </button>
      </form>
=======
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Add Business</button>
        </form>
      </div>
>>>>>>> 9abce5f (code written again)
    </div>
  );
}
