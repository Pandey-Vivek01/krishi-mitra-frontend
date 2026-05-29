import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherData, setRecommendations, setLoading } from "../../redux/slices/weatherSlice";
import { fetchWeatherByCity, autoRecommend } from "../../services/weatherService";

const Weather = () => {
  const dispatch = useDispatch();
  const { weatherData, recommendations, loading } = useSelector((state) => state.weather);

  const [city, setCity] = useState("");
  const [soilType, setSoilType] = useState("Loamy");
  const [error, setError] = useState("");

  const handleFetchWeather = async (e) => {
    e.preventDefault();
    setError("");
    dispatch(setLoading(true));

    try {
      // Fetch weather
      const weatherRes = await fetchWeatherByCity(city);
      dispatch(setWeatherData(weatherRes.weather));

      // Auto recommend crops
      const recommendRes = await autoRecommend(city, soilType);
      dispatch(setRecommendations(recommendRes.recommendations));

    } catch (err) {
      setError(err.response?.data?.message || "Weather fetch karne mein error aaya");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          🌦️ Mausam aur Fasal Salah
        </h1>
        <p className="text-gray-500 mb-8">
          Apne shehar ka mausam dekho aur jaano kaunsi fasal best rahegi
        </p>

        {/* Search Form */}
        <form onSubmit={handleFetchWeather} className="bg-white p-6 rounded-2xl shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Shehar ka naam</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Patna, Delhi, Mumbai..."
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Mitti ka prakar</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="Loamy">Domat (Loamy)</option>
                <option value="Sandy">Baluyi (Sandy)</option>
                <option value="Clayey">Chiknai (Clayey)</option>
                <option value="Black">Kaali (Black)</option>
                <option value="Red">Laal (Red)</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Dekh rahe hain..." : "Mausam Dekho"}
              </button>
            </div>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Weather Card */}
        {weatherData && (
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              📍 {weatherData.region} ka Mausam
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {weatherData.temperature}°C
                </p>
                <p className="text-sm text-gray-500 mt-1">Taapman</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl text-center">
                <p className="text-3xl font-bold text-green-600">
                  {weatherData.humidity}%
                </p>
                <p className="text-sm text-gray-500 mt-1">Aardrata</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl text-center">
                <p className="text-3xl font-bold text-yellow-600">
                  {weatherData.rainfall} mm
                </p>
                <p className="text-sm text-gray-500 mt-1">Varsha</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {weatherData.season}
                </p>
                <p className="text-sm text-gray-500 mt-1">Ritu</p>
              </div>
            </div>
          </div>
        )}

        {/* Crop Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              🌱 Aapke liye Recommended Fasalein
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {recommendations.map((crop, index) => (
                <div
                  key={index}
                  className="border border-green-200 p-4 rounded-xl text-center hover:shadow-md transition"
                >
                  <p className="text-2xl mb-2">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🌾"}
                  </p>
                  <p className="font-bold text-green-700">{crop.cropName}</p>
                  <p className="text-xs text-gray-500 mt-1">{crop.season}</p>
                  <div className="mt-2 bg-green-100 rounded-full px-2 py-1">
                    <p className="text-xs font-bold text-green-700">
                      {crop.suitabilityScore}% match
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Weather;
