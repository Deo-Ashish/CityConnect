/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Phone, Mail, Star, User, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function BusinessDetails() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const fetchBusinessData = () => {
    axios.get(`http://localhost:5001/api/business/${id}`).then(res => setBusiness(res.data)).catch(console.error);
    axios.get(`http://localhost:5001/api/review/${id}`).then(res => setReviews(res.data)).catch(console.error);
  };

  useEffect(() => {
    fetchBusinessData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Must be logged in');
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5001/api/review', { businessId: id, ...newReview }, { headers: { Authorization: `Bearer ${token}` } });
      setNewReview({ rating: 5, comment: '' });
      fetchBusinessData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding review');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/review/${reviewId}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchBusinessData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting review');
    }
  };

  const handleDeleteBusiness = async () => {
    if (!window.confirm('Delete this entire business and all reviews? This cannot be undone.')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/business/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/explore');
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting business');
    }
  };

  if (!business) return <div className="page-container" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading details...</div>;

  return (
    <div className="animate-fade-in page-container" style={{ maxWidth: '900px' }}>
      
      {/* Header */}
      <div className="modern-card" style={{ marginBottom: '2rem' }}>
        <div className="flex-between" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{business.name}</h1>
            <p className="badge-minimal badge-blue">{business.category}</p>
          </div>
          <div className="flex-item" style={{ gap: '1rem' }}>
            <div className="flex-item" style={{ background: 'rgba(250, 204, 21, 0.1)', color: '#facc15', padding: '0.5rem 1rem', borderRadius: '1rem', fontWeight: '500' }}>
              <Star size={18} fill="currentColor" /> {business.rating} ({business.reviewsCount} Reviews)
            </div>
            {user && business.owner && user._id === business.owner._id && (
              <div className="flex-item">
                <button onClick={() => navigate(`/edit/${business._id}`)} className="auth-button" style={{ background: 'transparent', width: 'auto', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.65rem' }}>
                  <Edit size={18} />
                </button>
                <button onClick={handleDeleteBusiness} className="auth-button" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', width: 'auto', padding: '0.65rem' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
        
        <p style={{ margin: '1.5rem 0', color: 'var(--text-muted)', lineHeight: 1.6 }}>{business.description}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <a href={`https://maps.google.com/?q=${business.location?.coordinates[1]},${business.location?.coordinates[0]}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', textDecoration: 'none' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}><MapPin size={16} /></div> 
            <span style={{ fontSize: '0.9rem' }}>{business.address}</span>
          </a>
          <a href={`tel:${business.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', textDecoration: 'none' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}><Phone size={16} /></div> 
            <span style={{ fontSize: '0.9rem' }}>{business.phone}</span>
          </a>
          <a href={`mailto:${business.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', textDecoration: 'none' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}><Mail size={16} /></div> 
            <span style={{ fontSize: '0.9rem' }}>{business.email}</span>
          </a>
        </div>

        {business.owner && (
          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', borderRadius: '50%' }}><User size={16} /></div>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Service Provider: <strong style={{ color: 'var(--text-main)' }}>{business.owner.name}</strong></span>
          </div>
        )}
      </div>

      {/* Reviews */}
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 500 }}>Reviews</h2>
      
      {user && (
        <form className="modern-card auth-form" onSubmit={handleReviewSubmit} style={{ marginBottom: '2rem', padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Write a Review</h3>
          <div className="flex-item" style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Rating:</label>
            <select className="auth-input" style={{ width: '150px' }} value={newReview.rating} onChange={e => setNewReview({...newReview, rating: Number(e.target.value)})}>
              {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
            </select>
          </div>
          <textarea className="auth-input" rows="3" placeholder="Share your experience..." value={newReview.comment} onChange={e => setNewReview({...newReview, comment: e.target.value})} required></textarea>
          <button type="submit" className="auth-button" style={{ width: '200px' }}>Submit Review</button>
        </form>
      )}

      {reviews.length === 0 ? (
        <div className="modern-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No reviews yet. Be the first to leave one!</div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {reviews.map(review => (
            <div key={review._id} className="modern-card" style={{ padding: '1.5rem' }}>
               <div className="flex-between" style={{ marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                 <strong className="flex-item">
                   <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #a1a1aa, #52525b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '0.9rem' }}>
                     {review.user?.name?.charAt(0) || 'U'}
                   </div>
                   <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{review.user?.name || 'Anonymous'}</span>
                 </strong>
                 <div className="flex-item">
                   <div style={{ display: 'flex', color: '#facc15' }}>
                     {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" style={{ marginLeft: '0.1rem' }} />)}
                   </div>
                   {user && user._id === review.user?._id && (
                     <button type="button" onClick={() => handleDeleteReview(review._id)} style={{ background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.4rem', color: '#ef4444', cursor: 'pointer' }}>
                       <Trash2 size={14} />
                     </button>
                   )}
                 </div>
               </div>
               <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>"{review.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
