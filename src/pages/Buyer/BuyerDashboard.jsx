import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCrops } from "../../services/cropService";

const BuyerDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecentCrops();
  }, []);

  const fetchRecentCrops = async () => {
    setLoading(true);
    try {
      const res = await getAllCrops({ limit: 6 });
      setCrops(res.crops);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Welcome Card */}
        <div className="bg-blue-700 text-white p-6 rounded-2xl shadow-md mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Namaste, {user?.firstName}! 👋
            </h1>
            <p className="text-blue-200">
              Taaza fasalein dekhein aur seedha kisanon se khareedein
            </p>
          </div>
          <img
            src={user?.image}
            alt="profile"
            className="w-16 h-16 rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/buyer/crops"
            className="bg-blue-600 text-white p-4 rounded-2xl text-center font-semibold hover:bg-blue-700 transition"
          >
            🌾 Saari Fasalein
          </Link>
          <Link
            to="/posts"
            className="bg-white text-blue-700 p-4 rounded-2xl text-center font-semibold border-2 border-blue-200 hover:border-blue-500 transition"
          >
            📰 Expert Posts
          </Link>
          <Link
            to="/weather"
            className="bg-white text-green-700 p-4 rounded-2xl text-center font-semibold border-2 border-green-200 hover:border-green-500 transition"
          >
            🌦️ Mausam
          </Link>
        </div>

        {/* Recent Crops */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-blue-800">
              🌾 Taaza Fasalein
            </h2>
            <Link
              to="/buyer/crops"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Sab Dekho →
            </Link>
          </div>

          {loading ? (
            <p className="text-center text-gray-400 py-12">Load ho raha hai...</p>
          ) : crops.length === 0 ? (
            <p className="text-center text-gray-400 py-12">
              Abhi koi fasal available nahi hai
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {crops.map((crop) => (
                <div
                  key={crop._id}
                  className="border border-blue-100 p-4 rounded-2xl hover:shadow-md transition"
                >
                  <h3 className="font-bold text-gray-800 text-lg mb-1">
                    {crop.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-2">
                    ₹{crop.price}/kg
                  </p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>📦 {crop.quantity} kg available</p>
                    <p>📍 {crop.location}</p>
                    <p>👨‍🌾 {crop.farmer?.firstName} {crop.farmer?.lastName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BuyerDashboard;
