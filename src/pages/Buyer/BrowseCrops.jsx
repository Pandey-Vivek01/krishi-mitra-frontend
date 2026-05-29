import { useEffect, useState } from "react";
import { getAllCrops } from "../../services/cropService";

const BrowseCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    fetchCrops();
  }, [currentPage, search, sortBy, order]);

  const fetchCrops = async () => {
    setLoading(true);
    try {
      const res = await getAllCrops({
        search,
        sortBy,
        order,
        page: currentPage,
        limit: 9,
      });
      setCrops(res.crops);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          🌾 Fasalein Dhundho
        </h1>
        <p className="text-gray-500 mb-8">
          Seedha kisanon se taaza fasal khareedein
        </p>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Fasal ka naam dhundho..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="createdAt">Nayee Pehle</option>
              <option value="price">Bhav se</option>
              <option value="quantity">Matra se</option>
            </select>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="desc">Zyada se Kam</option>
              <option value="asc">Kam se Zyada</option>
            </select>
          </div>
        </div>

        {/* Crops Grid */}
        {loading ? (
          <p className="text-center text-gray-400 py-12">Load ho raha hai...</p>
        ) : crops.length === 0 ? (
          <p className="text-center text-gray-400 py-12">Koi fasal nahi mili</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {crops.map((crop) => (
              <div
                key={crop._id}
                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-bold text-gray-800 text-xl mb-1">{crop.name}</h3>
                <p className="text-blue-600 font-bold text-lg mb-3">
                  ₹{crop.price}/kg
                </p>
                <div className="text-sm text-gray-500 space-y-1 mb-4">
                  <p>📦 {crop.quantity} kg available</p>
                  <p>📍 {crop.location}</p>
                  <p>👨‍🌾 {crop.farmer?.firstName} {crop.farmer?.lastName}</p>
                  {crop.description && (
                    <p className="text-gray-400 italic">"{crop.description}"</p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedCrop(crop)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
                >
                  Kisan se Sampark Karein
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 hover:bg-blue-50 transition"
            >
              ← Pehle
            </button>
            <span className="px-4 py-2 text-sm text-gray-600">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 hover:bg-blue-50 transition"
            >
              Aage →
            </button>
          </div>
        )}

        {/* Contact Modal */}
        {selectedCrop && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full mx-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                👨‍🌾 Kisan ki Jaankari
              </h3>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p><span className="font-medium">Naam:</span> {selectedCrop.farmer?.firstName} {selectedCrop.farmer?.lastName}</p>
                <p><span className="font-medium">Email:</span> {selectedCrop.farmer?.email}</p>
                <p><span className="font-medium">Fasal:</span> {selectedCrop.name}</p>
                <p><span className="font-medium">Bhav:</span> ₹{selectedCrop.price}/kg</p>
                <p><span className="font-medium">Matra:</span> {selectedCrop.quantity} kg</p>
                <p><span className="font-medium">Jagah:</span> {selectedCrop.location}</p>
              </div>
              <button
                onClick={() => setSelectedCrop(null)}
                className="w-full border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Band Karein
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BrowseCrops;
