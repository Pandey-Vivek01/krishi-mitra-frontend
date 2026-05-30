import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../services/postService";
import { getAllQuestions } from "../../services/qaService";

const ExpertDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const postRes = await getAllPosts({ limit: 3 });
      setPosts(postRes.posts);

      const qaRes = await getAllQuestions({ resolved: false, limit: 3 });
      setQuestions(qaRes.questions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Welcome Card */}
        <div className="bg-yellow-600 text-white p-6 rounded-2xl shadow-md mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Namaste, {user?.firstName}! 👋
            </h1>
            <p className="text-yellow-100">
              Apna anubhav share karo aur kisanon ki madad karo
            </p>
          </div>
          <img
            src={user?.image}
            alt="profile"
            className="w-16 h-16 rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <p className="text-3xl font-bold text-yellow-600">{posts.length}</p>
            <p className="text-sm text-gray-500 mt-1">Mere Posts</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <p className="text-3xl font-bold text-red-500">{questions.length}</p>
            <p className="text-sm text-gray-500 mt-1">Unanswered Questions</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <p className="text-3xl font-bold text-green-600">
              {user?.additionalDetails?.verified ? "✅" : "⏳"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Verification</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/expert/posts/create"
            className="bg-yellow-600 text-white p-4 rounded-2xl text-center font-semibold hover:bg-yellow-700 transition"
          >
            ✍️ Post Banao
          </Link>
          <Link
            to="/expert/qa"
            className="bg-white text-red-600 p-4 rounded-2xl text-center font-semibold border-2 border-red-200 hover:border-red-500 transition"
          >
            ❓ Sawaalon ke Jawab Do
          </Link>
          <Link
            to="/posts"
            className="bg-white text-yellow-700 p-4 rounded-2xl text-center font-semibold border-2 border-yellow-200 hover:border-yellow-500 transition"
          >
            📰 Saare Posts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Recent Posts */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-yellow-800">✍️ Recent Posts</h2>
              <Link to="/posts" className="text-yellow-600 text-sm hover:underline">
                Sab Dekho →
              </Link>
            </div>
            {loading ? (
              <p className="text-gray-400 text-center py-6">Load ho raha hai...</p>
            ) : posts.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-400 mb-3">Abhi koi post nahi hai</p>
                <Link
                  to="/expert/posts/create"
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-700 transition"
                >
                  Pehli Post Banao
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post._id} className="border border-yellow-100 p-3 rounded-xl hover:bg-yellow-50 transition">
                    <p className="font-semibold text-gray-800 truncate">{post.title}</p>
                    <div className="flex gap-3 text-xs text-gray-400 mt-1">
                      <span>❤️ {post.likes?.length || 0}</span>
                      <span>💬 {post.comments?.length || 0}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Unanswered Questions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-red-700">❓ Unanswered Questions</h2>
              <Link to="/expert/qa" className="text-red-600 text-sm hover:underline">
                Sab Dekho →
              </Link>
            </div>
            {loading ? (
              <p className="text-gray-400 text-center py-6">Load ho raha hai...</p>
            ) : questions.length === 0 ? (
              <p className="text-center text-gray-400 py-6">
                Koi unanswered question nahi hai 🎉
              </p>
            ) : (
              <div className="space-y-3">
                {questions.map((q) => (
                  <div key={q._id} className="border border-red-100 p-3 rounded-xl hover:bg-red-50 transition">
                    <p className="font-semibold text-gray-800 truncate">{q.question}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {q.askedBy?.firstName} {q.askedBy?.lastName}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExpertDashboard;
