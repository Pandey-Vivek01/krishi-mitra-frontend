import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPosts, toggleLike } from "../../services/postService";

const Posts = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [currentPage, search]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await getAllPosts({ search, page: currentPage, limit: 9 });
      setPosts(res.posts);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    if (!token) return;
    try {
      await toggleLike(postId, token);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">📰 Expert Posts</h1>
            <p className="text-gray-500 mt-1">Anubhavi kisanon se seekhein</p>
          </div>
          {token && user?.accountType === "Expert" && (
            <Link
              to="/expert/posts/create"
              className="bg-yellow-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-yellow-700 transition"
            >
              ✍️ Post Banao
            </Link>
          )}
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Post khojo..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Posts Grid */}
        {loading ? (
          <p className="text-center text-gray-400 py-12">Load ho raha hai...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400 py-12">Koi post nahi mili</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col"
              >
                {/* Author */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={post.author?.image}
                    alt="author"
                    className="w-10 h-10 rounded-full object-cover border-2 border-yellow-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {post.author?.firstName} {post.author?.lastName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString("hi-IN")}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 flex-1">
                  {post.content}
                </p>

                {/* Tags */}
                {post.crop_tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.crop_tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleLike(post._id)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition"
                    >
                      ❤️ {post.likes?.length || 0}
                    </button>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      💬 {post.comments?.length || 0}
                    </span>
                  </div>
                  <Link
                    to={`/posts/${post._id}`}
                    className="text-yellow-600 text-sm font-semibold hover:underline"
                  >
                    Pura Padho →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 hover:bg-gray-100 transition"
            >
              ← Pehle
            </button>
            <span className="px-4 py-2 text-sm text-gray-600">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 hover:bg-gray-100 transition"
            >
              Aage →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Posts;
