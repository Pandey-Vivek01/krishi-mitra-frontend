import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/common/Navbar";
// Auth Pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import VerifyOTP from "./pages/Auth/VerifyOTP";
// Common Pages
import Landing from "./pages/Common/Landing";
import Weather from "./pages/Common/Weather";
import Posts from "./pages/Common/Posts";
import PostDetail from "./pages/Common/PostDetail";
import QA from "./pages/Common/QA";
import Profile from "./pages/Common/Profile";
import Chat from "./pages/Common/Chat";
import MandiPrices from "./pages/Common/MandiPrices";
// Farmer Pages
import FarmerDashboard from "./pages/Farmer/FarmerDashboard";
import MyCrops from "./pages/Farmer/MyCrops";
import AddCrop from "./pages/Farmer/AddCrop";
import AddProduct from "./pages/Farmer/AddProduct";
import MyProducts from "./pages/Farmer/MyProducts";
import FarmerOrders from "./pages/Farmer/FarmerOrders";
// Buyer Pages
import BuyerDashboard from "./pages/Buyer/BuyerDashboard";
import BrowseCrops from "./pages/Buyer/BrowseCrops";
import Marketplace from "./pages/Buyer/Marketplace";
import ProductDetail from "./pages/Buyer/ProductDetail";
import MyOrders from "./pages/Buyer/MyOrders";
// Expert Pages
import ExpertDashboard from "./pages/Expert/ExpertDashboard";
import CreatePost from "./pages/Expert/CreatePost";
import UnansweredQA from "./pages/Expert/UnansweredQA";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/qa" element={<QA />} />

        {/* Protected — any logged in user */}
        <Route path="/mandi" element={
          <PrivateRoute allowedRoles={["Farmer", "Buyer"]}>
           <MandiPrices />
         </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute allowedRoles={["Farmer", "Buyer", "Expert"]}>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/chat" element={
          <PrivateRoute allowedRoles={["Farmer", "Buyer" , "Expert"]}>
            <Chat />
          </PrivateRoute>
        } />

        {/* Farmer Routes */}
        <Route path="/farmer/dashboard" element={
          <PrivateRoute allowedRoles={["Farmer"]}>
            <FarmerDashboard />
          </PrivateRoute>
        } />
        <Route path="/farmer/crops" element={
          <PrivateRoute allowedRoles={["Farmer"]}>
            <MyCrops />
          </PrivateRoute>
        } />
        <Route path="/farmer/crops/add" element={
          <PrivateRoute allowedRoles={["Farmer"]}>
            <AddCrop />
          </PrivateRoute>
        } />
        <Route path="/farmer/products" element={
          <PrivateRoute allowedRoles={["Farmer"]}>
            <MyProducts />
          </PrivateRoute>
        } />
        <Route path="/farmer/products/add" element={
          <PrivateRoute allowedRoles={["Farmer"]}>
            <AddProduct />
          </PrivateRoute>
        } />
        <Route path="/farmer/orders" element={
          <PrivateRoute allowedRoles={["Farmer"]}>
            <FarmerOrders />
          </PrivateRoute>
        } />

        {/* Buyer Routes */}
        <Route path="/buyer/dashboard" element={
          <PrivateRoute allowedRoles={["Buyer"]}>
            <BuyerDashboard />
          </PrivateRoute>
        } />
        <Route path="/buyer/marketplace" element={
          <PrivateRoute allowedRoles={["Buyer"]}>
            <Marketplace />
          </PrivateRoute>
        } />
        <Route path="/buyer/products/:id" element={
          <PrivateRoute allowedRoles={["Buyer"]}>
            <ProductDetail />
          </PrivateRoute>
        } />
        <Route path="/buyer/orders" element={
          <PrivateRoute allowedRoles={["Buyer"]}>
            <MyOrders />
          </PrivateRoute>
        } />

        {/* Expert Routes */}
        <Route path="/expert/dashboard" element={
          <PrivateRoute allowedRoles={["Expert"]}>
            <ExpertDashboard />
          </PrivateRoute>
        } />
        <Route path="/expert/posts/create" element={
          <PrivateRoute allowedRoles={["Expert"]}>
            <CreatePost />
          </PrivateRoute>
        } />
        <Route path="/expert/qa" element={
          <PrivateRoute allowedRoles={["Expert"]}>
            <UnansweredQA />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
