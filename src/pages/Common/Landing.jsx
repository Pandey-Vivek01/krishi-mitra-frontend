import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white">

      {/* Hero Section */}
      <section className="bg-green-700 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">🌾 KrishiMitra</h1>
        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          {t("landing.tagline")}
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/signup" className="bg-white text-green-700 font-bold px-8 py-3 rounded-xl hover:bg-green-100 transition text-lg">
            {t("landing.join")}
          </Link>
          <Link to="/posts" className="border-2 border-white text-white font-bold px-8 py-3 rounded-xl hover:bg-green-600 transition text-lg">
            {t("landing.viewPosts")}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-green-50">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          {t("landing.features")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">
              {t("landing.mandiTitle")}
            </h3>
            <p className="text-gray-500">{t("landing.mandiDesc")}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="text-5xl mb-4">🌦️</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">
              {t("landing.advisoryTitle")}
            </h3>
            <p className="text-gray-500">{t("landing.advisoryDesc")}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="text-5xl mb-4">👨‍🌾</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">
              {t("landing.expertTitle")}
            </h3>
            <p className="text-gray-500">{t("landing.expertDesc")}</p>
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          {t("landing.whoAreYou")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="border-2 border-green-200 p-6 rounded-2xl text-center hover:border-green-500 hover:shadow-md transition">
            <div className="text-5xl mb-4">🧑‍🌾</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">{t("landing.farmer")}</h3>
            <p className="text-gray-500 mb-4">{t("landing.farmerDesc")}</p>
            <Link to="/signup" className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
              {t("landing.farmerJoin")}
            </Link>
          </div>
          <div className="border-2 border-blue-200 p-6 rounded-2xl text-center hover:border-blue-500 hover:shadow-md transition">
            <div className="text-5xl mb-4">🏪</div>
            <h3 className="text-xl font-bold text-blue-700 mb-2">{t("landing.buyer")}</h3>
            <p className="text-gray-500 mb-4">{t("landing.buyerDesc")}</p>
            <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              {t("landing.buyerJoin")}
            </Link>
          </div>
          <div className="border-2 border-yellow-200 p-6 rounded-2xl text-center hover:border-yellow-500 hover:shadow-md transition">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-yellow-700 mb-2">{t("landing.expert")}</h3>
            <p className="text-gray-500 mb-4">{t("landing.expertDesc2")}</p>
            <Link to="/signup" className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">
              {t("landing.expertJoin")}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-green-100 py-8 px-6 text-center">
        <p className="text-lg font-bold mb-2">🌾 KrishiMitra</p>
        <p className="text-sm text-green-300">{t("landing.footerTagline")}</p>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <Link to="/posts" className="hover:text-white transition">{t("nav.posts")}</Link>
          <Link to="/qa" className="hover:text-white transition">{t("nav.qa")}</Link>
          <Link to="/weather" className="hover:text-white transition">{t("nav.weather")}</Link>
          <Link to="/login" className="hover:text-white transition">{t("nav.login")}</Link>
        </div>
        <p className="text-xs text-green-400 mt-4">© 2025 KrishiMitra.</p>
      </footer>

    </div>
  );
};

export default Landing;
