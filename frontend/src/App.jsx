import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import BusinessDetails from './pages/BusinessDetails.jsx';
import Login from './pages/Login.jsx';
import AddBusiness from './pages/AddBusiness.jsx';
import EditBusiness from './pages/EditBusiness.jsx';
import Profile from './pages/Profile.jsx';
import AdminPortal from './pages/AdminPortal.jsx';

import { useAuth } from './context/AuthContext';

function Navbar() {
  const { user } = useAuth();
  
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">CityConnect</Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/explore" className="btn btn-secondary">Explore</Link>
          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin" className="btn btn-secondary" style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}>Admin Portal</Link>}
              {user.role === 'business' && <Link to="/add" className="btn btn-secondary">Add Business</Link>}
              <Link to="/profile" className="btn btn-primary">{user.name}</Link>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/business/:id" element={<BusinessDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddBusiness />} />
          <Route path="/edit/:id" element={<EditBusiness />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPortal />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;
