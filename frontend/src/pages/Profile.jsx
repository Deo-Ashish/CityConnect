import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
      </div>
    </div>
  );
}
