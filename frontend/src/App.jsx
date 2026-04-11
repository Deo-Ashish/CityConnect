import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import BusinessDetails from './pages/BusinessDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AddBusiness from './pages/AddBusiness.jsx';
import EditBusiness from './pages/EditBusiness.jsx';
import Profile from './pages/Profile.jsx';
import AdminPortal from './pages/AdminPortal.jsx';
import Navbar from './components/layout/Navbar.jsx';
import AIChatAssistant from './components/AIChatAssistant.jsx';

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
          <Route path="/register" element={<Register />} />
          <Route path="/add-business" element={<AddBusiness />} />
          <Route path="/add" element={<AddBusiness />} />
          <Route path="/edit/:id" element={<EditBusiness />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPortal />} />
        </Routes>
      </main>
      <AIChatAssistant />
    </div>
  )
}

export default App;
