import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
    <header className="bg-slate-900 text-white border-b border-slate-700 sticky top-0 z-50">
=======
    <header className="bg-black/90 text-white border-b border-zinc-800/80 sticky top-0 z-50 backdrop-blur-sm shadow-sm">
>>>>>>> 34707b7 (improved some styling)
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          CityConnect
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-4 md:gap-6">
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold border-b-2 border-white pb-1"
                : "text-gray-300 hover:text-white transition-colors"
            }
          >
            Explore
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/add-business"
                className={({ isActive }) =>
                  isActive
                    ? "rounded-full bg-sky-500 px-4 py-2 text-black font-semibold"
                    : "rounded-full border border-sky-500/30 px-4 py-2 text-sky-300 hover:bg-sky-500/10 hover:text-sky-100 transition"
                }
              >
                Add business
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold border-b-2 border-white pb-1"
                    : "text-gray-300 hover:text-white transition-colors"
                }
              >
                {user?.username || user?.name}
              </NavLink>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="rounded-full border border-red-500 px-4 py-2 text-red-500 transition hover:bg-red-500/10"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "rounded-full bg-white px-4 py-2 text-black font-semibold"
                    : "rounded-full border border-white/20 px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "rounded-full bg-sky-500 px-4 py-2 text-black font-semibold"
                    : "rounded-full border border-sky-500/30 px-4 py-2 text-sky-300 hover:bg-sky-500/10 hover:text-sky-100 transition"
                }
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
