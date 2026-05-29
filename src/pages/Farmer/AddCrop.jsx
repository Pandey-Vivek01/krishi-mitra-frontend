import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCrop } from "../../services/cropService";

const AddCrop = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await addCrop(formData, token);
      if (res.crop) {
        navigate("/farmer/crops");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Fasal jodne mein error aaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-green-800 mb-2">➕ Nayi Fasal Jodein</h1>
        <p className="text-gray-500 mb-8">Apni fasal ki jaankari bharein</p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div>
              <label className="text-sm font-medium text-gray-700">
                Fasal ka Naam *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Gehun, Chawal, Makka..."
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Matra (kg) *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="100"
                  required
                  min="1"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Bhav (₹/kg) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="25"
                  required
                  min="1"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Jagah *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Patna, Bihar"
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Vivaran (optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Fasal ke baare mein kuch aur jaankari..."
                rows={4}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              />
            </div>

            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={() => navigate("/farmer/crops")}
                className="w-1/3 border border-green-600 text-green-600 font-semibold py-2 rounded-lg hover:bg-green-50 transition"
              >
                Wapas
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Jod rahe hain..." : "Fasal Jodein"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default AddCrop;
