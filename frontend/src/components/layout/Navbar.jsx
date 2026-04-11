import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import { FiUser, FiLogOut, FiChevronDown, FiShield } from "react-icons/fi";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/login");
    }
  };

  return (
    <header className="glass-panel">
      <div
        className="page-container"
        style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        {/* Logo */}
        <Link to="/" className="auth-logo" style={{ marginBottom: 0, fontSize: "1rem" }}>
          CityConnect
        </Link>

        {/* Links */}
        <nav className="flex-item" style={{ gap: "1.5rem" }}>
          <NavLink
            to="/explore"
            className="auth-link"
            style={({ isActive }) => ({ color: isActive ? "var(--text-main)" : "var(--text-muted)" })}
          >
            Explore
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/add-business"
                className="auth-link"
                style={({ isActive }) => ({ color: isActive ? "var(--text-main)" : "var(--text-muted)" })}
              >
                Add business
              </NavLink>

              {/* User Dropdown */}
              <div ref={menuRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex-item"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "2rem",
                    padding: "0.4rem 0.9rem",
                    cursor: "pointer",
                    color: "var(--text-main)",
                    gap: "0.5rem",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366f1, #10b981)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {(user?.username || user?.name || "U").charAt(0).toUpperCase()}
                  </div>
                  <span>{user?.username || user?.name}</span>
                  <FiChevronDown
                    size={14}
                    style={{
                      color: "var(--text-muted)",
                      transition: "transform 0.2s",
                      transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {/* Dropdown menu */}
                {menuOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 0.6rem)",
                      right: 0,
                      minWidth: "190px",
                      background: "rgba(10,10,10,0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "1rem",
                      padding: "0.5rem",
                      zIndex: 100,
                      boxShadow: "0 20px 40px -10px rgba(0,0,0,0.7)",
                    }}
                  >
                    {/* User info */}
                    <div
                      style={{
                        padding: "0.75rem 1rem",
                        borderBottom: "1px solid var(--border-color)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <p style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-main)" }}>
                        {user?.username || user?.name}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "capitalize" }}>
                        {user?.role}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex-item"
                      style={{
                        padding: "0.65rem 1rem",
                        borderRadius: "0.6rem",
                        fontSize: "0.9rem",
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        gap: "0.6rem",
                        transition: "all 0.15s ease",
                        display: "flex",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--text-main)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-muted)"; }}
                    >
                      <FiUser size={15} /> Profile
                    </Link>

                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex-item"
                        style={{
                          padding: "0.65rem 1rem",
                          borderRadius: "0.6rem",
                          fontSize: "0.9rem",
                          color: "var(--text-muted)",
                          textDecoration: "none",
                          gap: "0.6rem",
                          transition: "all 0.15s ease",
                          display: "flex",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--text-main)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-muted)"; }}
                      >
                        <FiShield size={15} /> Admin Portal
                      </Link>
                    )}

                    <div style={{ borderTop: "1px solid var(--border-color)", marginTop: "0.5rem", paddingTop: "0.5rem" }}>
                      <button
                        onClick={handleLogout}
                        className="flex-item"
                        style={{
                          width: "100%",
                          padding: "0.65rem 1rem",
                          borderRadius: "0.6rem",
                          fontSize: "0.9rem",
                          color: "#f87171",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          gap: "0.6rem",
                          textAlign: "left",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(248,113,113,0.08)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                      >
                        <FiLogOut size={15} /> Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="auth-button"
                style={{ background: "white", color: "#000", border: "1px solid var(--text-main)", padding: "0.4rem 1rem", width: "auto", marginTop: 0 }}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="auth-button"
                style={{ padding: "0.4rem 1rem", width: "auto", marginTop: 0 }}
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
