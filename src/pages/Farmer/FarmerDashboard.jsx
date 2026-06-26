import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCrops } from "../../services/cropService";
import { fetchWeatherByCity } from "../../services/weatherService";

const FarmerDashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [crops, setCrops] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch farmer's crops
      const cropRes = await getAllCrops({ limit: 5 });
      setCrops(cropRes.crops);

      // Fetch weather for farmer's location
      if (user?.additionalDetails?.district) {
        const weatherRes = await fetchWeatherByCity(user.additionalDetails.district);
        setWeather(weatherRes.weather);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Welcome Card */}
        <div className="bg-green-700 text-white p-6 rounded-2xl shadow-md mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Namaste, {user?.firstName}! 👋
            </h1>
            <p className="text-green-200">
              Aaj ka din achha rahe — apni fasal ki jaankari dekhein
            </p>
          </div>
          <img
            src={user?.image}
            alt="profile"
            className="w-16 h-16 rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <p className="text-3xl font-bold text-green-600">{crops.length}</p>
            <p className="text-sm text-gray-500 mt-1">Meri Fasalein</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <p className="text-3xl font-bold text-blue-600">
              {weather ? `${weather.temperature}°C` : "--"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Taapman</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <p className="text-3xl font-bold text-yellow-600">
              {weather ? `${weather.humidity}%` : "--"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Aardrata</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <p className="text-3xl font-bold text-purple-600">
              {weather ? weather.season : "--"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Ritu</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link
            to="/farmer/crops/add"
            className="bg-green-600 text-white p-4 rounded-2xl text-center font-semibold hover:bg-green-700 transition"
          >
            ➕ Fasal Jodein
          </Link>
          <Link
            to="/farmer/crops"
            className="bg-white text-green-700 p-4 rounded-2xl text-center font-semibold border-2 border-green-200 hover:border-green-500 transition"
          >
            🌾 Meri Fasalein
          </Link>
          <Link
            to="/weather"
            className="bg-white text-blue-700 p-4 rounded-2xl text-center font-semibold border-2 border-blue-200 hover:border-blue-500 transition"
          >
            🌦️ Mausam Dekho
          </Link>
          <Link
            to="/qa"
            className="bg-white text-yellow-700 p-4 rounded-2xl text-center font-semibold border-2 border-yellow-200 hover:border-yellow-500 transition"
          >
            ❓ Sawaal Poochein
          </Link>
          <Link
            to="/farmer/products/add"
            className="bg-orange-500 text-white p-4 rounded-2xl text-center font-semibold hover:bg-orange-600 transition"
          >
            🛒 Fasal Becho
          </Link>
          <Link
            to="/farmer/products"
            className="bg-white text-orange-700 p-4 rounded-2xl text-center font-semibold border-2 border-orange-200 hover:border-orange-500 transition"
          >
            📦 Meri Listings
          </Link>
          <Link
            to="/farmer/orders"
            className="bg-white text-purple-700 p-4 rounded-2xl text-center font-semibold border-2 border-purple-200 hover:border-purple-500 transition"
          >
            📋 Orders Dekho
          </Link>
        </div>

        {/* Recent Crops */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-green-800">
              🌾 Recent Fasalein
            </h2>
            <Link
              to="/farmer/crops"
              className="text-green-600 text-sm font-medium hover:underline"
            >
              Sab Dekho →
            </Link>
          </div>

          {loading ? (
            <p className="text-center text-gray-400 py-8">Load ho raha hai...</p>
          ) : crops.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">Abhi koi fasal nahi hai</p>
              <Link
                to="/farmer/crops/add"
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Pehli Fasal Jodein
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-50 text-green-700">
                    <th className="px-4 py-2 text-left rounded-l-lg">Fasal</th>
                    <th className="px-4 py-2 text-left">Matra</th>
                    <th className="px-4 py-2 text-left">Bhav</th>
                    <th className="px-4 py-2 text-left">Jagah</th>
                    <th className="px-4 py-2 text-left rounded-r-lg">Tarikh</th>
                  </tr>
                </thead>
                <tbody>
                  {crops.map((crop) => (
                    <tr key={crop._id} className="border-b border-gray-100 hover:bg-green-50 transition">
                      <td className="px-4 py-3 font-medium text-gray-800">{crop.name}</td>
                      <td className="px-4 py-3 text-gray-600">{crop.quantity} kg</td>
                      <td className="px-4 py-3 text-gray-600">₹{crop.price}/kg</td>
                      <td className="px-4 py-3 text-gray-600">{crop.location}</td>
                      <td className="px-4 py-3 text-gray-400">
                        {new Date(crop.createdAt).toLocaleDateString("hi-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default FarmerDashboard;
