import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import businessService from '../services/businessService';
import { FiEdit, FiTrash2, FiPlus, FiExternalLink, FiBriefcase, FiLoader } from "react-icons/fi";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role === 'business') {
      fetchMyBusinesses();
    }
  }, [user]);

  const fetchMyBusinesses = async () => {
    setLoading(true);
    try {
      const data = await businessService.getMyBusinesses();
      setBusinesses(data || []);
    } catch (err) {
      console.error("Failed to fetch businesses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        await businessService.remove(id);
        setBusinesses(businesses.filter(b => b._id !== id));
      } catch (err) {
        alert("Failed to delete business");
      }
    }
  };

  if (!user) {
    return (
      <div className="auth-wrapper animate-fade-in">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <p className="auth-title" style={{ fontSize: '1.25rem' }}>Login required</p>
          <p className="auth-subtitle">Please sign in to view your profile details.</p>
          <button onClick={() => navigate("/login")} className="auth-button" style={{ marginTop: '1.5rem' }}>Login</button>
        </div>
      </div>
    );
  }

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <div className="page-container animate-fade-in">
      <div className="modern-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
          <div className="flex-item" style={{ gap: '1.5rem' }}>
            <img
              src={user.avatar || "https://ui-avatars.com/api/?name=" + (user.username || user.name) + "&background=random"}
              alt={`${user.username || user.name} avatar`}
              style={{ width: '90px', height: '90px', borderRadius: '50%', border: '2px solid var(--border-color)', objectFit: 'cover' }}
            />
            <div>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Member profile</p>
              <h1 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{user.username || user.name}</h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{user.role === "business" ? "Business account" : "Community member"}</p>
            </div>
          </div>

          <div className="flex-item" style={{ gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Member since</p>
              <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-main)' }}>{joinedDate}</p>
            </div>
            <button 
              onClick={() => { logout(); navigate("/login") }}
              className="auth-button"
              style={{ background: 'rgba(255, 69, 58, 0.1)', color: '#ff453a', border: '1px solid rgba(255, 69, 58, 0.2)', width: 'auto', padding: '0.5rem 1.25rem' }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="modern-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email</p>
            <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-main)' }}>{user.email}</p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Role</p>
            <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-main)', textTransform: 'capitalize' }}>{user.role}</p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>City</p>
            <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-main)' }}>{user.location?.city || "Not set"}</p>
          </div>
        </div>

        {user.role === 'business' && (
          <div style={{ marginTop: '4rem' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FiBriefcase style={{ color: 'var(--accent)' }} /> Manage Your Businesses
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>List and manage all your registered businesses</p>
              </div>
              <Link to="/add-business" className="auth-button" style={{ width: 'auto', padding: '0.6rem 1.25rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiPlus /> Add Business
              </Link>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <FiLoader className="spin" style={{ fontSize: '2rem' }} />
                <p style={{ marginTop: '1rem' }}>Loading businesses...</p>
              </div>
            ) : businesses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1.5rem', border: '1px dashed var(--border-color)' }}>
                <FiBriefcase style={{ fontSize: '3rem', color: 'var(--border-color)', marginBottom: '1.5rem' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>You haven't listed any businesses yet.</p>
                <Link to="/add-business" style={{ color: 'var(--accent)', marginTop: '1rem', display: 'inline-block', textDecoration: 'none', fontWeight: 500 }}>Start your first listing &rarr;</Link>
              </div>
            ) : (
              <div className="modern-grid" style={{ gridTemplateColumns: '1fr', gap: '1rem' }}>
                {businesses.map((biz) => (
                  <div key={biz._id} className="modern-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'transform 0.2s ease, background 0.2s ease' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                       <div style={{ width: '60px', height: '60px', borderRadius: '1rem', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>
                         {biz.name.charAt(0)}
                       </div>
                       <div>
                         <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{biz.name}</h3>
                         <div style={{ display: 'flex', gap: '1rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '2rem' }}>{biz.category}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{biz.address?.split(',').slice(0, 1).join('')}</span>
                         </div>
                       </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                       <button 
                        onClick={() => navigate(`/business/${biz._id}`)}
                        style={{ border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-main)', padding: '0.5rem', borderRadius: '0.75rem', cursor: 'pointer', transition: 'all 0.2s' }}
                        title="View Details"
                       >
                         <FiExternalLink />
                       </button>
                       <button 
                        onClick={() => navigate(`/edit/${biz._id}`)}
                        style={{ border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--accent)', padding: '0.5rem', borderRadius: '0.75rem', cursor: 'pointer', transition: 'all 0.2s' }}
                        title="Edit Business"
                       >
                         <FiEdit />
                       </button>
                       <button 
                        onClick={() => handleDelete(biz._id, biz.name)}
                        style={{ border: '1px solid rgba(255, 69, 58, 0.2)', background: 'rgba(255, 69, 58, 0.05)', color: '#ff453a', padding: '0.5rem', borderRadius: '0.75rem', cursor: 'pointer', transition: 'all 0.2s' }}
                        title="Delete Business"
                       >
                         <FiTrash2 />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
