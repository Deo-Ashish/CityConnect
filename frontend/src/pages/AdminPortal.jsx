/* eslint-disable react-hooks/set-state-in-effect, no-unused-vars, react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Edit2, Plus, Shield, Users, Briefcase, Grid } from 'lucide-react';

export default function AdminPortal() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [newCategory, setNewCategory] = useState({ name: '', icon: 'star', slug: '' });

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/admin/users', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      setUsers(res.data);
    } catch(err) { console.error('Failed to fetch users'); }
  };

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/business', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      setBusinesses(res.data);
    } catch(err) { console.error('Failed to fetch businesses'); }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/categories');
      setCategories(res.data);
    } catch(err) { console.error('Failed to fetch categories'); }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      if (activeTab === 'users') fetchUsers();
      if (activeTab === 'businesses') fetchBusinesses();
      if (activeTab === 'categories') fetchCategories();
    }
  }, [activeTab, user]);

  const handleDeleteUser = async (id) => {
    if(!window.confirm("Are you sure you want to permanently delete this user and all their data?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/admin/users/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      fetchUsers();
    } catch(err) { alert('Failed to delete'); }
  };

  const handeToggleRole = async (id, currentRole) => {
    let newRole = 'user';
    if(currentRole === 'user') newRole = 'business';
    else if(currentRole === 'business') newRole = 'admin';
    else if(currentRole === 'admin') newRole = 'user';

    try {
      await axios.put(`http://localhost:5001/api/admin/users/${id}`, { role: newRole }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      fetchUsers();
    } catch(err) { alert('Failed to update role'); }
  };

  const handleDeleteBusiness = async (id) => {
    if(!window.confirm("Delete this business permanently?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/admin/business/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      fetchBusinesses();
    } catch(err) { alert('Failed to delete'); }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/admin/categories', newCategory, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      setNewCategory({ name: '', icon: 'star', slug: '' });
      fetchCategories();
    } catch(err) { alert('Failed to add category'); }
  };

  const handleDeleteCategory = async (id) => {
    if(!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/admin/categories/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      fetchCategories();
    } catch(err) { alert('Failed to delete'); }
  };

  if (loading || !user || user.role !== 'admin') return <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>Loading Admin Portal...</div>;

  return (
    <div className="page-container animate-fade-in" style={{ padding: '2rem 1.5rem', maxWidth: '1000px' }}>
      <div className="flex-item" style={{ marginBottom: '2.5rem', padding: '1rem 0' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <Shield size={24} color="var(--text-main)" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 600, margin: 0 }}>Admin Portal</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Manage users, businesses, and platform resources.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)', width: 'fit-content' }}>
        <button onClick={() => setActiveTab('users')} className="auth-button" style={{ background: activeTab === 'users' ? 'var(--text-main)' : 'transparent', color: activeTab === 'users' ? '#000' : 'var(--text-muted)', marginTop: 0, width: 'auto', padding: '0.6rem 1.25rem' }}><Users size={16} /> Users</button>
        <button onClick={() => setActiveTab('businesses')} className="auth-button" style={{ background: activeTab === 'businesses' ? 'var(--text-main)' : 'transparent', color: activeTab === 'businesses' ? '#000' : 'var(--text-muted)', marginTop: 0, width: 'auto', padding: '0.6rem 1.25rem' }}><Briefcase size={16} /> Businesses</button>
        <button onClick={() => setActiveTab('categories')} className="auth-button" style={{ background: activeTab === 'categories' ? 'var(--text-main)' : 'transparent', color: activeTab === 'categories' ? '#000' : 'var(--text-muted)', marginTop: 0, width: 'auto', padding: '0.6rem 1.25rem' }}><Grid size={16} /> Categories</button>
      </div>

      <div className="modern-card">
        
        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>NAME</th>
                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>EMAIL</th>
                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>ROLE</th>
                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>JOINED</th>
                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem 0.5rem', fontSize: '0.9rem' }}>{u.name}</td>
                      <td style={{ padding: '1rem 0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{u.email}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>
                        <span className="badge-minimal badge-neutral" style={{ cursor: 'pointer', padding: '0.2rem 0.6rem' }} onClick={() => handeToggleRole(u._id, u.role)}>
                          {u.role} &nbsp; 🔄
                        </span>
                      </td>
                      <td style={{ padding: '1rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                        {u._id !== user._id && (
                          <button onClick={() => handleDeleteUser(u._id)} style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'inline-flex' }}>
                            <Trash2 size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BUSINESSES TAB */}
        {activeTab === 'businesses' && (
          <div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>BUSINESS NAME</th>
                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>CATEGORY</th>
                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>OWNER</th>
                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {businesses.map(b => (
                    <tr key={b._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem 0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>{b.name}</td>
                      <td style={{ padding: '1rem 0.5rem' }}><span className="badge-minimal badge-blue">{b.category}</span></td>
                      <td style={{ padding: '1rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{b.owner?.name || 'Unknown'} <br/><span style={{ opacity: 0.7 }}>{b.owner?.email}</span></td>
                      <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                        <button onClick={() => handleDeleteBusiness(b._id)} style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'inline-flex' }}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div>
            <form onSubmit={handleAddCategory} className="auth-form" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) auto', gap: '1rem', alignItems: 'end', marginBottom: '2rem', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '1rem', background: 'rgba(0,0,0,0.2)' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Name</label>
                <input type="text" className="auth-input" value={newCategory.name} onChange={e => setNewCategory({...newCategory, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} required />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Icon Pattern</label>
                <input type="text" className="auth-input" value={newCategory.icon} onChange={e => setNewCategory({...newCategory, icon: e.target.value})} required />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Slug Map</label>
                <input type="text" className="auth-input" value={newCategory.slug} onChange={e => setNewCategory({...newCategory, slug: e.target.value})} required />
              </div>
              <button type="submit" className="auth-button" style={{ width: '48px', height: '48px', padding: 0, marginTop: 0 }}><Plus size={20} /></button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
              {categories.map(c => (
                <div key={c._id} className="flex-between" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '0.2rem' }}>{c.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/{c.slug} &bull; {c.icon}</div>
                  </div>
                  <button onClick={() => handleDeleteCategory(c._id)} style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'inline-flex' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
