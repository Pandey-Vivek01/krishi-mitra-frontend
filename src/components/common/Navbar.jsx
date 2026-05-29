import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "hi");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "hi" ? "en" : "hi";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
    setLang(newLang);  // ← local state update — re-render trigger hoga
  };

  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex items-center justify-between shadow-md">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide">
        🌾 KrishiMitra
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6 text-sm font-medium">

        {/* Public Links */}
        <Link to="/posts" className="hover:text-green-200 transition">{t("nav.posts")}</Link>
        <Link to="/qa" className="hover:text-green-200 transition">{t("nav.qa")}</Link>
        <Link to="/weather" className="hover:text-green-200 transition">{t("nav.weather")}</Link>

        {/* Farmer Links */}
        {token && user?.accountType === "Farmer" && (
          <>
            <Link to="/farmer/dashboard" className="hover:text-green-200 transition">
              {i18n.language === "hi" ? "Dashboard" : "Dashboard"}
            </Link>
            <Link to="/farmer/crops" className="hover:text-green-200 transition">
              {i18n.language === "hi" ? "Meri Fasalein" : "My Crops"}
            </Link>
          </>
        )}

        {/* Buyer Links */}
        {token && user?.accountType === "Buyer" && (
          <>
            <Link to="/buyer/dashboard" className="hover:text-green-200 transition">
              {i18n.language === "hi" ? "Dashboard" : "Dashboard"}
            </Link>
            <Link to="/buyer/crops" className="hover:text-green-200 transition">
              {i18n.language === "hi" ? "Fasalein Dhundho" : "Browse Crops"}
            </Link>
          </>
        )}

        {/* Expert Links */}
        {token && user?.accountType === "Expert" && (
          <>
            <Link to="/expert/dashboard" className="hover:text-green-200 transition">
              {i18n.language === "hi" ? "Dashboard" : "Dashboard"}
            </Link>
            <Link to="/expert/posts/create" className="hover:text-green-200 transition">
              {i18n.language === "hi" ? "Post Banao" : "Create Post"}
            </Link>
            <Link to="/expert/qa" className="hover:text-green-200 transition">
              {i18n.language === "hi" ? "Q&A" : "Q&A"}
            </Link>
          </>
        )}

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="bg-green-600 border border-white px-3 py-1 rounded-lg text-sm font-bold hover:bg-green-500 transition"
        >
          {i18n.language === "hi" ? "EN" : "हि"}
        </button>

        {/* Auth Buttons */}
        {!token ? (
          <>
            <Link to="/login" className="hover:text-green-200 transition">
              {t("nav.login")}
            </Link>
            <Link
              to="/signup"
              className="bg-white text-green-700 px-4 py-1.5 rounded-lg font-semibold hover:bg-green-100 transition"
            >
              {t("nav.register")}
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/profile" className="flex items-center gap-2 hover:text-green-200 transition">
              <img
                src={user?.image}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-white"
              />
              <span>{user?.firstName}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg font-semibold transition"
            >
              {t("nav.logout")}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;