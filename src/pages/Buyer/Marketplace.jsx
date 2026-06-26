import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAllProducts } from "../../services/marketplaceService";
import { setProducts, setLoading } from "../../redux/slices/marketplaceSlice";

const Marketplace = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.marketplace);

  const [filters, setFilters] = useState({
    cropName: "",
    minPrice: "",
    maxPrice: "",
    location: "",
  });

  const fetchProducts = async (appliedFilters = {}) => {
    dispatch(setLoading(true));
    try {
      const res = await getAllProducts(appliedFilters);
      dispatch(setProducts(res.products));
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const appliedFilters = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== "")
    );
    fetchProducts(appliedFilters);
  };

  const handleReset = () => {
    setFilters({ cropName: "", minPrice: "", maxPrice: "", location: "" });
    fetchProducts();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        {t("marketplace.title", "Marketplace")}
      </h1>

      {/* Filters */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="cropName"
          value={filters.cropName}
          onChange={handleFilterChange}
          placeholder={t("marketplace.searchCrop", "Search crop...")}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
          placeholder={t("marketplace.minPrice", "Min Price ₹")}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          placeholder={t("marketplace.maxPrice", "Max Price ₹")}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          placeholder={t("marketplace.location", "Location...")}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          className="md:col-span-3 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
        >
          {t("marketplace.search", "Search")}
        </button>
        <button
          onClick={handleReset}
          className="border border-gray-300 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
        >
          {t("marketplace.reset", "Reset")}
        </button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">{t("marketplace.empty", "No products found")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/buyer/products/${product._id}`)}
              className="border border-gray-200 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
            >
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.cropName}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-green-50 flex items-center justify-center">
                  <span className="text-4xl">🌾</span>
                </div>
              )}

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.cropName}
                </h2>
                <p className="text-green-700 font-bold mb-1">
                  ₹{product.pricePerUnit} / {product.unit}
                </p>
                <p className="text-gray-500 text-sm mb-1">
                  📦 {product.quantity} {product.unit} available
                </p>
                {product.location && (
                  <p className="text-gray-400 text-sm mb-2">
                    📍 {product.location}
                  </p>
                )}
                <p className="text-gray-500 text-sm">
                  🧑‍🌾 {product.farmer?.firstName} {product.farmer?.lastName}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;