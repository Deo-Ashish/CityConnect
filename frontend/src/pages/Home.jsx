/* eslint-disable react-hooks/set-state-in-effect, no-unused-vars, no-empty, react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Grid, Star } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [localServices, setLocalServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const navigate = useNavigate();
  const { location, setCustomLocation, loading } = useLocation();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!cityInput || !isTyping) {
        setSuggestions([]); return;
      }
      try {
        const res = await axios.get(`https://photon.komoot.io/api/?q=${encodeURIComponent(cityInput)}&limit=5`);
        if (res.data && res.data.features) {
          setSuggestions(res.data.features);
        }
      } catch {}
    };
    
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [cityInput, isTyping]);
  
  useEffect(() => {
    axios.get('http://localhost:5001/api/categories').then(res => {
      if (res.data.length > 0) {
        setCategories(res.data);
      } else {
        setCategories([
          { slug: 'electricians', name: 'Electricians' },
          { slug: 'plumbers', name: 'Plumbers' },
          { slug: 'restaurants', name: 'Restaurants' },
          { slug: 'cafes', name: 'Cafes' }
        ]);
      }
    }).catch(() => {
      setCategories([
        { slug: 'electricians', name: 'Electricians' },
        { slug: 'plumbers', name: 'Plumbers' },
        { slug: 'restaurants', name: 'Restaurants' },
        { slug: 'cafes', name: 'Cafes' }
      ]);
    });
  }, []);

  useEffect(() => {
    if (location) {
      setLoadingServices(true);
      const url = `http://localhost:5001/api/search/nearby?lat=${location.lat}&lng=${location.lng}&radius=${location.radius || 50}`;
      axios.get(url)
        .then(res => setLocalServices(res.data.slice(0, 6)))
        .catch(console.error)
        .finally(() => setLoadingServices(false));
    }
  }, [location]);

  return (
    <div className="page-container animate-fade-in">
      
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Discover Hyper-Local Services</h1>
        <p className="hero-subtitle">Find the best plumbers, cafes, and tutors near you instantly.</p>

        <div className="flex-item justify-center mb-10" style={{ flexWrap: 'wrap' }}>
          <div className="badge-minimal badge-blue flex-item" style={{ padding: '0.6rem 1rem', fontSize: '0.9rem' }}>
            <MapPin size={16} />
            <span>Near: <strong style={{ color: 'white' }}>{loading ? 'Locating...' : (location?.name || 'Current Location')}</strong></span>
          </div>
          
          <div className="auth-input-group" style={{ width: '220px' }}>
            <input 
              type="text" 
              placeholder="Change city..." 
              className="auth-input" 
              value={cityInput} 
              onChange={e => { setCityInput(e.target.value); setIsTyping(true); }} 
            />
            {suggestions.length > 0 && (
              <div style={{ position: 'absolute', top: '110%', left: 0, width: '100%', background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', zIndex: 1000, overflow: 'hidden' }}>
                {suggestions.map((s, idx) => {
                  const placeName = [s.properties.name, s.properties.city, s.properties.state].filter(Boolean).join(', ');
                  return (
                    <div 
                      key={idx} 
                      style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                      onClick={() => {
                        setCityInput(''); setSuggestions([]); setIsTyping(false); setCustomLocation(placeName);
                      }}
                    >
                      {placeName}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); if (searchQuery) navigate(`/explore?q=${encodeURIComponent(searchQuery)}`); }} style={{ maxWidth: '500px', margin: '0 auto' }} className="flex-item">
           <input 
             type="text" 
             placeholder="Search for 'electrician', 'pizza'..." 
             className="auth-input"
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
           />
           <button type="submit" className="auth-button" style={{ width: '50px', padding: '0.875rem' }}>
             <Search size={18} />
           </button>
        </form>
      </div>

      {/* Categories Section */}
      <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 500 }}>Explore Categories</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', marginBottom: '4rem' }}>
        {categories.map(cat => (
          <Link to={`/explore?category=${cat.slug}`} key={cat.slug} className="modern-card" style={{ padding: '1.5rem 1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Grid size={18} color="#a1a1aa" />
            </div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: '400', color: 'var(--text-main)' }}>{cat.name}</h3>
          </Link>
        ))}
      </div>

      {/* Nearby Services */}
      <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 500 }}>Services Near You</h2>
        <Link to="/explore" className="auth-link" style={{ fontSize: '0.9rem' }}>View on map &rarr;</Link>
      </div>
      
      {loadingServices ? (
        <p style={{ color: 'var(--text-muted)' }}>Loading local services...</p>
      ) : localServices.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No services found nearby.</p>
      ) : (
        <div className="modern-grid mb-10">
          {localServices.map(biz => (
            <Link to={`/business/${biz._id}`} key={biz._id} className="modern-card" style={{ textDecoration: 'none' }}>
               <h3 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '0.25rem', color: 'var(--text-main)' }}>{biz.name}</h3>
               <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{biz.category}</p>
               
               <div className="flex-between">
                 <span className="badge-minimal badge-neutral">
                   <Star size={12} style={{ marginRight: '4px' }} /> {biz.rating} ({biz.reviewsCount})
                 </span>
                 <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                   View details &rarr;
                 </span>
               </div>
            </Link>
          ))}
        </div>
      )}
      
    </div>
  );
}
