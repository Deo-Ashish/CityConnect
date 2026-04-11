import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="glass-panel">
      <div className="page-container" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Link to="/" className="auth-logo" style={{ marginBottom: 0, fontSize: '1rem' }}>
          CityConnect
        </Link>

        {/* Links */}
        <nav className="flex-item" style={{ gap: '1.5rem' }}>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive
                ? "auth-link"
                : "auth-link"
            }
            style={({ isActive }) => ({ color: isActive ? 'var(--text-main)' : 'var(--text-muted)' })}
          >
            Explore
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/add-business"
                className="auth-link"
              >
                Add business
              </NavLink>

              <NavLink
                to="/profile"
                className="auth-link"
                style={({ isActive }) => ({ color: isActive ? 'var(--text-main)' : 'var(--text-muted)' })}
              >
                {user?.username || user?.name}
              </NavLink>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="auth-button"
                style={{ padding: '0.4rem 1rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-muted)', width: 'auto', marginTop: 0 }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="auth-button"
                style={{ background: 'transparent', border: '1px solid var(--text-main)', padding: '0.4rem 1rem', width: 'auto', marginTop: 0 }}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="auth-button"
                style={{ padding: '0.4rem 1rem', width: 'auto', marginTop: 0 }}
              >
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
