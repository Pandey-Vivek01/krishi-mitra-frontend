import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProductById, placeOrder } from "../../services/marketplaceService";
import { getOrCreateConversation } from "../../services/chatService";
import { setSelectedProduct } from "../../redux/slices/marketplaceSlice";
import { setSelectedConversation } from "../../redux/slices/chatSlice";

const ProductDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { selectedProduct } = useSelector((state) => state.marketplace);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProductById(id);
        dispatch(setSelectedProduct(res.product));
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handlePlaceOrder = async () => {
    setOrderLoading(true);
    setError("");
    setSuccess("");
    try {
      await placeOrder(
        { productId: id, quantity },
        token
      );
      setSuccess("Order placed successfully! Waiting for farmer confirmation.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setOrderLoading(false);
    }
  };

  const handleChatWithFarmer = async () => {
    setChatLoading(true);
    try {
      const res = await getOrCreateConversation(
        { farmerId: selectedProduct.farmer._id, productId: id },
        token
      );
      dispatch(setSelectedConversation(res.conversation));
      navigate("/chat");
    } catch (err) {
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!selectedProduct) return null;

  const totalAmount = quantity * selectedProduct.pricePerUnit;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate("/buyer/marketplace")}
        className="text-green-600 hover:underline mb-4 flex items-center gap-1"
      >
        ← {t("productDetail.back", "Back to Marketplace")}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          {selectedProduct.images?.[0] ? (
            <img
              src={selectedProduct.images[0]}
              alt={selectedProduct.cropName}
              className="w-full h-72 object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-72 bg-green-50 flex items-center justify-center rounded-xl">
              <span className="text-6xl">🌾</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {selectedProduct.cropName}
          </h1>

          {selectedProduct.description && (
            <p className="text-gray-500 mb-4">{selectedProduct.description}</p>
          )}

          <div className="space-y-2 mb-6">
            <p className="text-green-700 font-bold text-xl">
              ₹{selectedProduct.pricePerUnit} / {selectedProduct.unit}
            </p>
            <p className="text-gray-600">
              📦 {selectedProduct.quantity} {selectedProduct.unit} available
            </p>
            {selectedProduct.location && (
              <p className="text-gray-500">📍 {selectedProduct.location}</p>
            )}
            <p className="text-gray-500">
              🧑‍🌾 {selectedProduct.farmer?.firstName}{" "}
              {selectedProduct.farmer?.lastName}
            </p>
          </div>

          {/* Order Section */}
          {selectedProduct.status === "available" ? (
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">
                  {t("productDetail.quantity", "Quantity")}:
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedProduct.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-24 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <span className="text-sm text-gray-500">
                  {selectedProduct.unit}
                </span>
              </div>

              <p className="text-gray-700 font-semibold">
                {t("productDetail.total", "Total")}: ₹{totalAmount}
              </p>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm">{success}</p>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={orderLoading}
                className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
              >
                {orderLoading
                  ? t("productDetail.placing", "Placing Order...")
                  : t("productDetail.placeOrder", "Place Order")}
              </button>

              <button
                onClick={handleChatWithFarmer}
                disabled={chatLoading}
                className="w-full border border-green-600 text-green-600 py-2.5 rounded-lg font-semibold hover:bg-green-50 transition disabled:opacity-50"
              >
                {chatLoading
                  ? "Opening Chat..."
                  : t("productDetail.chat", "💬 Chat with Farmer")}
              </button>
            </div>
          ) : (
            <div className="bg-red-50 rounded-xl p-4 text-center text-red-600 font-semibold">
              {t("productDetail.soldOut", "This product is sold out")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;