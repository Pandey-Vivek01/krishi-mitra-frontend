import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getMyProducts, deleteProduct } from "../../services/marketplaceService";
import { setMyProducts, removeProduct, setLoading } from "../../redux/slices/marketplaceSlice";

const MyProducts = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { myProducts, loading } = useSelector((state) => state.marketplace);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const res = await getMyProducts(token);
        dispatch(setMyProducts(res.products));
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteProduct(id, token);
      dispatch(removeProduct(id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">
          {t("myProducts.title", "My Product Listings")}
        </h1>
        <button
          onClick={() => navigate("/farmer/products/add")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + {t("myProducts.addNew", "Add New")}
        </button>
      </div>

      {myProducts.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">{t("myProducts.empty", "No listings yet")}</p>
          <button
            onClick={() => navigate("/farmer/products/add")}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {t("myProducts.createFirst", "Create your first listing")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProducts.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-xl shadow-sm overflow-hidden"
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
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.cropName}
                  </h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      product.status === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mb-1">
                  📦 {product.quantity} {product.unit}
                </p>
                <p className="text-green-700 font-bold mb-1">
                  ₹{product.pricePerUnit} / {product.unit}
                </p>
                {product.location && (
                  <p className="text-gray-400 text-sm mb-3">
                    📍 {product.location}
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/farmer/products/edit/${product._id}`)}
                    className="flex-1 border border-green-600 text-green-600 py-1.5 rounded-lg text-sm hover:bg-green-50 transition"
                  >
                    {t("myProducts.edit", "Edit")}
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 border border-red-500 text-red-500 py-1.5 rounded-lg text-sm hover:bg-red-50 transition"
                  >
                    {t("myProducts.delete", "Delete")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;