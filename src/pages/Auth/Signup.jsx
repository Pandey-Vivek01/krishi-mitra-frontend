import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendOTP, signup } from "../../services/authService";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "Farmer",
    contactNumber: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1 — Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await sendOTP(formData.email);
      if (response.success) {
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP bhejne mein error aaya");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify OTP + Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await signup(formData);
      if (response.success) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
          {step === 1 ? "Naya account banayein" : "OTP aur details bharein"}
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Step 1 — Email + Role */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
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
              <label className="text-sm font-medium text-gray-700">
                Aap kaun hain?
              </label>
              <select
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="Farmer">Kisan (Farmer)</option>
                <option value="Buyer">Khareedaar (Buyer)</option>
                <option value="Expert">Visheshagya (Expert)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? "OTP bhej rahe hain..." : "OTP Bhejein"}
            </button>
          </form>
        )}

        {/* Step 2 — Full Details */}
        {step === 2 && (
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Pehla Naam</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Ramesh"
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Aakhri Naam</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Kumar"
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="9876543210"
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">OTP</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="6 digit OTP"
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

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password Confirm Karein
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 border border-green-600 text-green-600 font-semibold py-2 rounded-lg hover:bg-green-50 transition duration-200"
              >
                Wapas
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {loading ? "Register ho rahe hain..." : "Register Karein"}
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Pehle se account hai?{" "}
          <Link to="/login" className="text-green-600 font-medium hover:underline">
            Login karein
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup; 
