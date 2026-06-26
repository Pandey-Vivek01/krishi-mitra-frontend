import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getMyOrders } from "../../services/marketplaceService";
import { setOrders, setLoading } from "../../redux/slices/marketplaceSlice";
import { createRazorpayOrder, verifyPayment } from "../../services/paymentService";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  ready_to_ship: "bg-purple-100 text-purple-700",
  paid: "bg-green-100 text-green-700",
  delivered: "bg-gray-100 text-gray-700",
};

const MyOrders = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { orders, loading } = useSelector((state) => state.marketplace);
  const [payingId, setPayingId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch(setLoading(true));
      try {
        const res = await getMyOrders(token);
        dispatch(setOrders(res.orders));
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchOrders();
  }, []);

  const handlePayment = async (order) => {
    setPayingId(order._id);
    try {
      const data = await createRazorpayOrder(order._id, token);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.razorpayOrder.amount,
        currency: "INR",
        name: "KrishiMitra",
        description: `Payment for ${order.product?.cropName}`,
        order_id: data.razorpayOrder.id,
        handler: async (response) => {
          const verifyRes = await verifyPayment(
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            },
            token
          );
          if (verifyRes.success) {
            alert("Payment successful! 🎉");
            const res = await getMyOrders(token);
            dispatch(setOrders(res.orders));
          }
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        },
        theme: {
          color: "#16a34a",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed, please try again");
    } finally {
      setPayingId(null);
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        {t("myOrders.title", "My Orders")}
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">{t("myOrders.empty", "No orders yet")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
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
                    🧑‍🌾 {order.farmer?.firstName} {order.farmer?.lastName}
                  </p>
                  <p className="text-gray-400 text-sm">{order.farmer?.email}</p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${STATUS_COLORS[order.status]}`}
                >
                  {order.status.replace("_", " ").toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-3 mb-3">
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

              {order.status === "ready_to_ship" &&
                order.paymentStatus === "unpaid" && (
                  <button
                    onClick={() => handlePayment(order)}
                    disabled={payingId === order._id}
                    className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {payingId === order._id ? "Processing..." : "💳 Pay Now"}
                  </button>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;