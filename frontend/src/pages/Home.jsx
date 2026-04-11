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
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Hyper-Local Services</h1>
          <p className="hero-subtitle">Find the best plumbers, cafes, and tutors near you instantly.</p>

          <div className="location-selector">
            <div className="location-badge">
              <MapPin size={16} />
              <span>Near: <strong>{loading ? 'Locating...' : (location?.name || 'Current Location')}</strong></span>
            </div>
            
            <div className="city-input-container">
              <input 
                type="text" 
                placeholder="Change city..." 
                className="city-input" 
                value={cityInput} 
                onChange={e => { setCityInput(e.target.value); setIsTyping(true); }} 
              />
              {suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                  {suggestions.map((s, idx) => {
                    const placeName = [s.properties.name, s.properties.city, s.properties.state].filter(Boolean).join(', ');
                    return (
                      <div 
                        key={idx} 
                        className="suggestion-item"
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
          
          <form onSubmit={(e) => { e.preventDefault(); if (searchQuery) navigate(`/explore?q=${encodeURIComponent(searchQuery)}`); }} className="search-form">
             <div className="search-input-group">
               <input 
                 type="text" 
                 placeholder="Search for 'electrician', 'pizza'..." 
                 className="search-input"
                 value={searchQuery}
                 onChange={e => setSearchQuery(e.target.value)}
               />
               <button type="submit" className="search-button">
                 <Search size={18} />
               </button>
             </div>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Explore Categories</h2>
          <p className="section-subtitle">Browse services by category</p>
        </div>

        <div className="categories-grid">
          {categories.map(cat => (
            <Link to={`/explore?category=${cat.slug}`} key={cat.slug} className="category-card">
              <div className="category-icon">
                <Grid size={24} />
              </div>
              <h3 className="category-name">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Nearby Services */}
      <section className="services-section">
        <div className="section-header">
          <h2 className="section-title">Services Near You</h2>
          <Link to="/explore" className="view-all-link">View on map &rarr;</Link>
        </div>
        
        {loadingServices ? (
          <div className="loading-state">
            <p>Loading local services...</p>
          </div>
        ) : localServices.length === 0 ? (
          <div className="empty-state">
            <p>No services found nearby.</p>
          </div>
        ) : (
          <div className="services-grid">
            {localServices.map(biz => (
              <Link to={`/business/${biz._id}`} key={biz._id} className="service-card">
                 <div className="service-header">
                   <h3 className="service-name">{biz.name}</h3>
                   <p className="service-category">{biz.category}</p>
                 </div>
                 
                 <div className="service-footer">
                   <div className="rating-badge">
                     <Star size={12} />
                     <span>{biz.rating} ({biz.reviewsCount})</span>
                   </div>
                   <span className="view-details">View details &rarr;</span>
                 </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
