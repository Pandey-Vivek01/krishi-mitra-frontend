import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getPricesByCrop } from "../../services/mandiService";

const MandiPrices = () => {
  const { t } = useTranslation();
  const { token } = useSelector((state) => state.auth);

  const [crop, setCrop] = useState("");
  const [state, setState] = useState("");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!crop.trim()) {
      setError("Crop name required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await getPricesByCrop(crop.trim(), token);
      let data = res.prices;

      // Filter by state if provided
      if (state.trim()) {
        data = data.filter((item) =>
          item.state.toLowerCase().includes(state.toLowerCase())
        );
      }

      setPrices(data);
      setSearched(true);
    } catch (err) {
      setError("Failed to fetch prices. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-2">
        {t("mandi.title", "Mandi Prices")}
      </h1>
      <p className="text-gray-500 mb-6 text-sm">
        {t("mandi.subtitle", "Real-time crop prices from mandis across India")}
      </p>

      {/* Search Bar */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("mandi.cropPlaceholder", "Crop name (e.g. Wheat, Rice, Tomato)")}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("mandi.statePlaceholder", "State (optional, e.g. Bihar)")}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Searching..." : t("mandi.search", "Search")}
        </button>
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-4">{error}</p>
      )}

      {/* Results */}
      {searched && prices.length === 0 && !loading && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No prices found for "{crop}"</p>
          <p className="text-sm mt-1">Try a different crop name or state</p>
        </div>
      )}

      {prices.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 mb-3">
            {prices.length} results found
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-green-50">
                <tr>
                  <th className="text-left p-3 text-green-700 font-semibold">Commodity</th>
                  <th className="text-left p-3 text-green-700 font-semibold">Market</th>
                  <th className="text-left p-3 text-green-700 font-semibold">District</th>
                  <th className="text-left p-3 text-green-700 font-semibold">State</th>
                  <th className="text-right p-3 text-green-700 font-semibold">Min ₹</th>
                  <th className="text-right p-3 text-green-700 font-semibold">Max ₹</th>
                  <th className="text-right p-3 text-green-700 font-semibold">Modal ₹</th>
                  <th className="text-left p-3 text-green-700 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-t border-gray-100 hover:bg-gray-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-3 font-medium text-gray-800">{item.commodity}</td>
                    <td className="p-3 text-gray-600">{item.market}</td>
                    <td className="p-3 text-gray-600">{item.district}</td>
                    <td className="p-3 text-gray-600">{item.state}</td>
                    <td className="p-3 text-right text-red-500 font-medium">₹{item.min_price}</td>
                    <td className="p-3 text-right text-blue-500 font-medium">₹{item.max_price}</td>
                    <td className="p-3 text-right text-green-600 font-bold">₹{item.modal_price}</td>
                    <td className="p-3 text-gray-400">{item.arrival_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MandiPrices;