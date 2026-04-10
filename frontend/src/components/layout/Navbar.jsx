import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          CityConnect
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-6">
          <Link to="/explore">Explore</Link>
          <Link to="/add-business">Add Business</Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile">{user?.name}</Link>

              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
