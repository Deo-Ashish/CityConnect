import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Star } from 'lucide-react';
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
      } catch (err) {}
    };
    
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [cityInput, isTyping]);
  
  useEffect(() => {
    // Note: ensure backend has seed data or fallback to defaults
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
      // Fallback
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
    <div className="animate-fade-in container" style={{ padding: '2rem 1rem' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '4rem 1rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, #6366f1, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Discover Hyper-Local Services
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Find the best plumbers, cafes, and tutors near you instantly.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--radius-md)' }}>
            <MapPin size={20} color="var(--primary-color)" />
            <span>Searching near: <strong>{loading ? 'Locating...' : (location?.name || 'Current Location')}</strong></span>
          </div>
          <form style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Change city..." 
                className="input-field" 
                style={{ padding: '0.5rem', width: '160px', marginBottom: 0 }} 
                value={cityInput} 
                onChange={e => {
                  setCityInput(e.target.value);
                  setIsTyping(true);
                }} 
              />
              {suggestions.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', zIndex: 1000, overflow: 'hidden' }}>
                  {suggestions.map((s, idx) => {
                    const placeName = [s.properties.name, s.properties.city, s.properties.state].filter(Boolean).join(', ');
                    return (
                      <div 
                        key={idx} 
                        style={{ padding: '0.5rem', cursor: 'pointer', borderBottom: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '0.8rem', textAlign: 'left' }}
                        onClick={() => {
                          setCityInput('');
                          setSuggestions([]);
                          setIsTyping(false);
                          setCustomLocation(placeName);
                        }}
                      >
                        {placeName}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <button type="button" onClick={() => { if(cityInput) { setCustomLocation(cityInput); setCityInput(''); } }} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Set</button>
          </form>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); if (searchQuery) navigate(`/explore?q=${encodeURIComponent(searchQuery)}`); }} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '0.5rem' }}>
           <input 
             type="text" 
             placeholder="Search for 'electrician', 'pizza'..." 
             className="input-field"
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
           />
           <button type="submit" className="btn btn-primary">
             <Search size={20} />
           </button>
        </form>
      </div>

      {/* Categories */}
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Explore Categories</h2>
      <div className="grid grid-cols-4 lg:grid-cols-6 gap-4" style={{ marginBottom: '4rem' }}>
        {categories.map(cat => (
          <Link to={`/explore?category=${cat.slug}`} key={cat.slug} className="card hover-scale" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem 0.5rem' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8' }}>
              <Star size={20} />
            </div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: '500' }}>{cat.name}</h3>
          </Link>
        ))}
      </div>

      {/* Nearby Services */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Services Near You</h2>
        <Link to="/explore" style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: '500' }}>View on map →</Link>
      </div>
      
      {loadingServices ? (
        <p className="text-muted" style={{ marginBottom: '4rem' }}>Loading local services...</p>
      ) : localServices.length === 0 ? (
        <p className="text-muted" style={{ marginBottom: '4rem' }}>No services found nearby.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginBottom: '4rem' }}>
          {localServices.map(biz => (
            <Link to={`/business/${biz._id}`} key={biz._id} className="card hover-scale">
               <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{biz.name}</h3>
               <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>{biz.category}</p>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span className="badge" style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>⭐ {biz.rating} ({biz.reviewsCount})</span>
                 <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>View details →</span>
               </div>
            </Link>
          ))}
        </div>
      )}
      
    </div>
  );
}
