import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  getFarmerOrders,
  updateOrderStatus,
} from "../../services/marketplaceService";
import {
  setFarmerOrders,
  setLoading,
  updateOrderInList,
} from "../../redux/slices/marketplaceSlice";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  ready_to_ship: "bg-purple-100 text-purple-700",
  paid: "bg-green-100 text-green-700",
  delivered: "bg-gray-100 text-gray-700",
};

const NEXT_STATUS = {
  pending: ["confirmed", "rejected"],
  confirmed: ["ready_to_ship"],
  ready_to_ship: [],
  paid: ["delivered"],
  delivered: [],
  rejected: [],
};

const FarmerOrders = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { farmerOrders, loading } = useSelector((state) => state.marketplace);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch(setLoading(true));
      try {
        const res = await getFarmerOrders(token);
        dispatch(setFarmerOrders(res.orders));
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      const res = await updateOrderStatus(orderId, status, token);
      dispatch(updateOrderInList(res.order));
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
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
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        {t("farmerOrders.title", "Incoming Orders")}
      </h1>

      {farmerOrders.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">{t("farmerOrders.empty", "No orders yet")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {farmerOrders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {order.product?.cropName}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Buyer: {order.buyer?.firstName} {order.buyer?.lastName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {order.buyer?.email}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${STATUS_COLORS[order.status]}`}
                >
                  {order.status.replace("_", " ").toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 bg-gray-50 rounded-lg p-3">
                <div>
                  <p className="text-xs text-gray-400">Quantity</p>
                  <p className="font-semibold text-gray-700">
                    {order.quantity} {order.product?.unit}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total Amount</p>
                  <p className="font-semibold text-green-700">
                    ₹{order.totalAmount}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Payment</p>
                  <p
                    className={`font-semibold ${
                      order.paymentStatus === "paid"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {order.paymentStatus.toUpperCase()}
                  </p>
                </div>
              </div>

              {NEXT_STATUS[order.status].length > 0 && (
                <div className="flex gap-2">
                  {NEXT_STATUS[order.status].map((nextStatus) => (
                    <button
                      key={nextStatus}
                      onClick={() => handleStatusUpdate(order._id, nextStatus)}
                      disabled={updatingId === order._id}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 ${
                        nextStatus === "rejected"
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {updatingId === order._id
                        ? "Updating..."
                        : nextStatus.replace("_", " ").toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerOrders;