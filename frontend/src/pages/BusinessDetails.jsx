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

  if (!business) return <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>Loading details...</div>;

  return (
    <div className="animate-fade-in container" style={{ padding: '2rem 1rem', maxWidth: '800px' }}>
      
      {/* Header */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{business.name}</h1>
            <p className="badge" style={{ marginBottom: '1rem' }}>{business.category}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,193,7,0.1)', color: '#ffc107', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontWeight: 'bold' }}>
              <Star size={20} fill="currentColor" /> {business.rating} ({business.reviewsCount} Reviews)
            </div>
            {user && business.owner && user._id === business.owner._id && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => navigate(`/edit/${business._id}`)} className="btn btn-secondary" style={{ padding: '0.5rem' }} title="Edit Business">
                  <Edit size={20} />
                </button>
                <button onClick={handleDeleteBusiness} className="btn" style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }} title="Delete Business">
                  <Trash2 size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
        
        <p style={{ margin: '1rem 0', color: 'var(--text-muted)' }}>{business.description}</p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <a href={`https://maps.google.com/?q=${business.location?.coordinates[1]},${business.location?.coordinates[0]}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', textDecoration: 'none' }} className="hover-text-primary">
            <MapPin size={18} color="var(--primary-color)" /> {business.address}
          </a>
          <a href={`tel:${business.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', textDecoration: 'none' }} className="hover-text-primary">
            <Phone size={18} color="var(--primary-color)" /> {business.phone}
          </a>
          <a href={`mailto:${business.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', textDecoration: 'none' }} className="hover-text-primary">
            <Mail size={18} color="var(--primary-color)" /> {business.email}
          </a>
        </div>

        {business.owner && (
          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
            <User size={20} color="var(--primary-color)" />
            <span>Service Provider: <strong>{business.owner.name}</strong></span>
          </div>
        )}
      </div>

      {/* Reviews */}
      <h2 style={{ marginBottom: '1.5rem' }}>Reviews</h2>
      
      {user && (
        <form className="card" onSubmit={handleReviewSubmit} style={{ marginBottom: '2rem', background: 'var(--background)' }}>
          <h3 style={{ marginBottom: '1rem' }}>Write a Review</h3>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <label style={{ alignSelf: 'center' }}>Rating:</label>
            <select className="input-field" style={{ width: '120px', marginBottom: 0 }} value={newReview.rating} onChange={e => setNewReview({...newReview, rating: Number(e.target.value)})}>
              {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
            </select>
          </div>
          <textarea className="input-field" rows="3" placeholder="Share your experience..." value={newReview.comment} onChange={e => setNewReview({...newReview, comment: e.target.value})} required></textarea>
          <button type="submit" className="btn btn-primary">Submit Review</button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="text-muted card">No reviews yet. Be the first to leave one!</p>
      ) : (
        <div className="grid grid-cols-1">
          {reviews.map(review => (
            <div key={review._id} className="card" style={{ padding: '1.5rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap' }}>
                 <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     {review.user?.name?.charAt(0) || 'U'}
                   </div>
                   {review.user?.name || 'Anonymous'}
                 </strong>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ display: 'flex', color: '#ffc107' }}>
                     {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                   </div>
                   {user && user._id === review.user?._id && (
                     <button type="button" onClick={() => handleDeleteReview(review._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Delete review">
                       <Trash2 size={16} />
                     </button>
                   )}
                 </div>
               </div>
               <p style={{ color: 'var(--text-muted)' }}>"{review.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
