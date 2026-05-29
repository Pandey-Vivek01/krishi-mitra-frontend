import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCrops, deleteCrop } from "../../services/cropService";

const MyCrops = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCrops();
  }, [currentPage, search]);

  const fetchCrops = async () => {
    setLoading(true);
    try {
      const res = await getAllCrops({
        search,
        page: currentPage,
        limit: 10,
      });
      setCrops(res.crops);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Kya aap sach mein yeh fasal delete karna chahte hain?")) return;
    try {
      await deleteCrop(id, token);
      fetchCrops(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-800">🌾 Meri Fasalein</h1>
            <p className="text-gray-500 mt-1">Apni saari fasalon ki jaankari yahan dekhein</p>
          </div>
          <Link
            to="/farmer/crops/add"
            className="bg-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            ➕ Fasal Jodein
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Fasal ka naam dhundho..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Crops Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          {loading ? (
            <p className="text-center text-gray-400 py-12">Load ho raha hai...</p>
          ) : crops.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Koi fasal nahi mili</p>
              <Link
                to="/farmer/crops/add"
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Pehli Fasal Jodein
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-green-50 text-green-700">
                      <th className="px-4 py-3 text-left rounded-l-lg">Fasal</th>
                      <th className="px-4 py-3 text-left">Matra</th>
                      <th className="px-4 py-3 text-left">Bhav</th>
                      <th className="px-4 py-3 text-left">Jagah</th>
                      <th className="px-4 py-3 text-left">Tarikh</th>
                      <th className="px-4 py-3 text-left rounded-r-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crops.map((crop) => (
                      <tr
                        key={crop._id}
                        className="border-b border-gray-100 hover:bg-green-50 transition"
                      >
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {crop.name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{crop.quantity} kg</td>
                        <td className="px-4 py-3 text-gray-600">₹{crop.price}/kg</td>
                        <td className="px-4 py-3 text-gray-600">{crop.location}</td>
                        <td className="px-4 py-3 text-gray-400">
                          {new Date(crop.createdAt).toLocaleDateString("hi-IN")}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDelete(crop._id)}
                              className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-red-200 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 hover:bg-green-50 transition"
                  >
                    ← Pehle
                  </button>
                  <span className="px-4 py-2 text-sm text-gray-600">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 hover:bg-green-50 transition"
                  >
                    Aage →
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default MyCrops;
