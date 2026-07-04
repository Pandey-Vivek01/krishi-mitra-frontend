import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BuyerDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Welcome Card */}
        <div className="bg-blue-700 text-white p-6 rounded-2xl shadow-md mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Namaste, {user?.firstName}! 👋
            </h1>
            <p className="text-blue-200">
              Taaza fasalein dekhein aur seedha kisanon se khareedein
            </p>
          </div>
          <img
            src={user?.image}
            alt="profile"
            className="w-16 h-16 rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/buyer/marketplace"
            className="bg-green-600 text-white p-4 rounded-2xl text-center font-semibold hover:bg-green-700 transition"
          >
            🛒 Marketplace
          </Link>
          <Link
            to="/buyer/orders"
            className="bg-white text-purple-700 p-4 rounded-2xl text-center font-semibold border-2 border-purple-200 hover:border-purple-500 transition"
          >
            📋 Mere Orders
          </Link>
          <Link
            to="/chat"
            className="bg-white text-orange-700 p-4 rounded-2xl text-center font-semibold border-2 border-orange-200 hover:border-orange-500 transition"
          >
            💬 Chat
          </Link>
          <Link
            to="/posts"
            className="bg-white text-blue-700 p-4 rounded-2xl text-center font-semibold border-2 border-blue-200 hover:border-blue-500 transition"
          >
            📰 Expert Posts
          </Link>
          <Link
            to="/weather"
            className="bg-white text-green-700 p-4 rounded-2xl text-center font-semibold border-2 border-green-200 hover:border-green-500 transition"
          >
            🌦️ Mausam
          </Link>
          <Link
            to="/qa"
            className="bg-white text-yellow-700 p-4 rounded-2xl text-center font-semibold border-2 border-yellow-200 hover:border-yellow-500 transition"
          >
            ❓ Sawaal Poochho
          </Link>
          <Link
           to="/mandi"
             className="bg-white text-green-700 p-4 rounded-2xl text-center font-semibold border-2 border-green-200 hover:border-green-500 transition"
           >
           📊 Mandi Prices
          </Link>
        </div>

      </div>
    </div>
  );
};

export default BuyerDashboard;
