import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser, setToken } from "../../redux/slices/authSlice";
import { login } from "../../services/authService";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(formData.email, formData.password);

      if (response.success) {
        // Store in Redux
        dispatch(setUser(response.user));
        dispatch(setToken(response.token));

        // Redirect based on role
        const role = response.user.accountType;
        if (role === "Farmer") navigate("/farmer/dashboard");
        else if (role === "Buyer") navigate("/buyer/dashboard");
        else if (role === "Expert") navigate("/expert/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-green-700 text-center mb-2">
          KrishiMitra
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Apne account mein login karein
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="aapka@email.com"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Account nahi hai?{" "}
          <Link to="/signup" className="text-green-600 font-medium hover:underline">
            Register karein
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;