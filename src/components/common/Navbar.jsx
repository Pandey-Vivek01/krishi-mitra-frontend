import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex items-center justify-between shadow-md">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide">
        🌾 KrishiMitra
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        
        {/* Public Links */}
        <Link to="/posts" className="hover:text-green-200 transition">Posts</Link>
        <Link to="/qa" className="hover:text-green-200 transition">Q&A</Link>
        <Link to="/weather" className="hover:text-green-200 transition">Weather</Link>

        {/* Farmer Links */}
        {token && user?.accountType === "Farmer" && (
          <>
            <Link to="/farmer/dashboard" className="hover:text-green-200 transition">
              Dashboard
            </Link>
            <Link to="/farmer/crops" className="hover:text-green-200 transition">
              My Crops
            </Link>
          </>
        )}

        {/* Buyer Links */}
        {token && user?.accountType === "Buyer" && (
          <>
            <Link to="/buyer/dashboard" className="hover:text-green-200 transition">
              Dashboard
            </Link>
            <Link to="/buyer/crops" className="hover:text-green-200 transition">
              Browse Crops
            </Link>
          </>
        )}

        {/* Expert Links */}
        {token && user?.accountType === "Expert" && (
          <>
            <Link to="/expert/dashboard" className="hover:text-green-200 transition">
              Dashboard
            </Link>
            <Link to="/expert/posts/create" className="hover:text-green-200 transition">
              Create Post
            </Link>
            <Link to="/expert/qa" className="hover:text-green-200 transition">
              Q&A
            </Link>
          </>
        )}

        {/* Auth Buttons */}
        {!token ? (
          <>
            <Link
              to="/login"
              className="hover:text-green-200 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-green-700 px-4 py-1.5 rounded-lg font-semibold hover:bg-green-100 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/profile" className="flex items-center gap-2 hover:text-green-200 transition">
              <img
                src={user?.image}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-white"
              />
              <span>{user?.firstName}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;