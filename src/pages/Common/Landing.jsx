import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-white">

      {/* Hero Section */}
      <section className="bg-green-700 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">
          🌾 KrishiMitra
        </h1>
        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          Kisanon ka digital saathi — mandi bhav, fasal salah, aur seedha bazaar tak pahunch
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/signup"
            className="bg-white text-green-700 font-bold px-8 py-3 rounded-xl hover:bg-green-100 transition text-lg"
          >
            Abhi Judein
          </Link>
          <Link
            to="/posts"
            className="border-2 border-white text-white font-bold px-8 py-3 rounded-xl hover:bg-green-600 transition text-lg"
          >
            Posts Dekhein
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-green-50">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          Hamare Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Mandi Bhav</h3>
            <p className="text-gray-500">
              Apne shehar ki mandi ke taaze bhav dekho aur sahi waqt pe fasal becho
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="text-5xl mb-4">🌦️</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Fasal Salah</h3>
            <p className="text-gray-500">
              Mausam ke hisaab se jaano ki aapke khet mein kaunsi fasal best rahegi
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="text-5xl mb-4">👨‍🌾</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Expert Guidance</h3>
            <p className="text-gray-500">
              Anubhavi kisanon se seekho aur apne sawaalon ke jawab paao
            </p>
          </div>

        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          Aap Kaun Hain?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          <div className="border-2 border-green-200 p-6 rounded-2xl text-center hover:border-green-500 hover:shadow-md transition">
            <div className="text-5xl mb-4">🧑‍🌾</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Kisan</h3>
            <p className="text-gray-500 mb-4">
              Mandi bhav dekho, fasal ki salah lo, aur experts se seekho
            </p>
            <Link
              to="/signup"
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Kisan ke roop mein judein
            </Link>
          </div>

          <div className="border-2 border-blue-200 p-6 rounded-2xl text-center hover:border-blue-500 hover:shadow-md transition">
            <div className="text-5xl mb-4">🏪</div>
            <h3 className="text-xl font-bold text-blue-700 mb-2">Khareedaar</h3>
            <p className="text-gray-500 mb-4">
              Seedha kisanon se taaza fasal kharido aur beechiye ko hatao
            </p>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Buyer ke roop mein judein
            </Link>
          </div>

          <div className="border-2 border-yellow-200 p-6 rounded-2xl text-center hover:border-yellow-500 hover:shadow-md transition">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-yellow-700 mb-2">Visheshagya</h3>
            <p className="text-gray-500 mb-4">
              Apna anubhav share karo aur nayi peedhi ke kisanon ki madad karo
            </p>
            <Link
              to="/signup"
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              Expert ke roop mein judein
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-green-100 py-8 px-6 text-center">
        <p className="text-lg font-bold mb-2">🌾 KrishiMitra</p>
        <p className="text-sm text-green-300">
          Kisanon ka digital saathi — Bharat ke har khet tak
        </p>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <Link to="/posts" className="hover:text-white transition">Posts</Link>
          <Link to="/qa" className="hover:text-white transition">Q&A</Link>
          <Link to="/weather" className="hover:text-white transition">Weather</Link>
          <Link to="/login" className="hover:text-white transition">Login</Link>
        </div>
        <p className="text-xs text-green-400 mt-4">
          © 2025 KrishiMitra. Sabhi adhikar surakshit hain.
        </p>
      </footer>

    </div>
  );
};

export default Landing;
