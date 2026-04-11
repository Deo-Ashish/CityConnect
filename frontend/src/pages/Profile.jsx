import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

<<<<<<< HEAD
  if (!user)
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
        <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-8 text-center text-slate-300 shadow-xl shadow-slate-950/30">
          <p className="text-lg font-semibold text-white">Login required</p>
          <p className="mt-2 text-sm text-slate-400">Please sign in to view your profile details.</p>
        </div>
      </div>
    );

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <div className="min-h-[calc(100vh-200px)] px-4 pb-10 pt-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-[0_24px_90px_-40px_rgba(0,0,0,0.7)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <img
                src={user.avatar}
                alt={`${user.username || user.name} avatar`}
                className="h-28 w-28 rounded-3xl border border-slate-800 object-cover"
              />
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sky-300/70">Member profile</p>
                <h1 className="text-3xl font-semibold text-white">{user.username || user.name}</h1>
                <p className="mt-2 text-sm text-slate-400">{user.role === "business" ? "Business user" : "Community member"}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-4 text-center shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Member since</p>
              <p className="mt-2 text-xl font-semibold text-white">{joinedDate}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Email</p>
              <p className="mt-2 text-base font-semibold text-white">{user.email}</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Role</p>
              <p className="mt-2 text-base font-semibold text-white">{user.role}</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">City</p>
              <p className="mt-2 text-base font-semibold text-white">{user.location?.city || "Not set"}</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Area</p>
              <p className="mt-2 text-base font-semibold text-white">{user.location?.area || "Not set"}</p>
            </div>
          </div>
        </div>
=======
  if (!user) {
    return <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>Please login to view profile.</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="animate-fade-in container" style={{ padding: '2rem 1rem', maxWidth: '600px' }}>
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>My Profile</h2>
        <div style={{ marginBottom: '1.5rem' }}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
          Logout
        </button>
>>>>>>> 9abce5f (code written again)
      </div>
    </div>
  );
}
