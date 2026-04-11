import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Edit2, Plus, Shield } from 'lucide-react';

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
      // Use standard search to get all businesses for admin views. 
      // Even better, we can modify the business controller to fetch all, or just use search with empty query and huge limit
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

  if (loading || !user || user.role !== 'admin') return <div className="container" style={{ padding: '2rem' }}>Loading Admin Portal...</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <Shield size={32} color="var(--primary-color)" />
        <h1 style={{ margin: 0 }}>Admin Portal</h1>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <button onClick={() => setActiveTab('users')} className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}>Users</button>
        <button onClick={() => setActiveTab('businesses')} className={`btn ${activeTab === 'businesses' ? 'btn-primary' : 'btn-secondary'}`}>Businesses</button>
        <button onClick={() => setActiveTab('categories')} className={`btn ${activeTab === 'categories' ? 'btn-primary' : 'btn-secondary'}`}>Categories</button>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        
        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div>
            <h2 style={{ marginBottom: '1rem' }}>Platform Users</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem' }}>Name</th>
                    <th style={{ padding: '0.75rem' }}>Email</th>
                    <th style={{ padding: '0.75rem' }}>Role</th>
                    <th style={{ padding: '0.75rem' }}>Joined</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem' }}>{u.name}</td>
                      <td style={{ padding: '0.75rem' }}>{u.email}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span className="badge" style={{ cursor: 'pointer' }} onClick={() => handeToggleRole(u._id, u.role)}>
                          {u.role} 🔄
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        {u._id !== user._id && (
                          <button onClick={() => handleDeleteUser(u._id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={18} />
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
            <h2 style={{ marginBottom: '1rem' }}>Platform Businesses</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem' }}>Business Name</th>
                    <th style={{ padding: '0.75rem' }}>Category</th>
                    <th style={{ padding: '0.75rem' }}>Owner</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {businesses.map(b => (
                    <tr key={b._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem' }}>{b.name}</td>
                      <td style={{ padding: '0.75rem' }}>{b.category}</td>
                      <td style={{ padding: '0.75rem' }}>{b.owner?.name || 'Unknown'} ({b.owner?.email})</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        <button onClick={() => handleDeleteBusiness(b._id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                          <Trash2 size={18} />
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
            <h2 style={{ marginBottom: '1rem' }}>Manage Categories</h2>
            
            <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '2rem', padding: '1rem', background: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <label className="input-label">Name</label>
                <input type="text" className="input-field" value={newCategory.name} onChange={e => setNewCategory({...newCategory, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} required style={{ marginBottom: 0 }} />
              </div>
              <div>
                <label className="input-label">Lucide Icon name</label>
                <input type="text" className="input-field" value={newCategory.icon} onChange={e => setNewCategory({...newCategory, icon: e.target.value})} required style={{ marginBottom: 0 }} />
              </div>
              <div>
                <label className="input-label">Slug</label>
                <input type="text" className="input-field" value={newCategory.slug} onChange={e => setNewCategory({...newCategory, slug: e.target.value})} required style={{ marginBottom: 0 }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1rem' }}><Plus size={20} /></button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {categories.map(c => (
                <div key={c._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div>
                    <strong>{c.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/{c.slug}</div>
                  </div>
                  <button onClick={() => handleDeleteCategory(c._id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Trash2 size={18} />
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
