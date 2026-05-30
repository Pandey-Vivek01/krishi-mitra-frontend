import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, toggleLike, addComment } from "../../services/postService";

const PostDetail = () => {
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [commenting, setCommenting] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await getPostById(id);
      setPost(res.post);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!token) return;
    try {
      await toggleLike(id, token);
      fetchPost();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setCommenting(true);
    try {
      await addComment(id, { content: comment }, token);
      setComment("");
      fetchPost();
    } catch (err) {
      console.error(err);
    } finally {
      setCommenting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">Load ho raha hai...</p>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">Post nahi mili</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-2 text-sm"
        >
          ← Wapas
        </button>

        {/* Post Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm mb-6">

          {/* Author */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src={post.author?.image}
              alt="author"
              className="w-12 h-12 rounded-full object-cover border-2 border-yellow-200"
            />
            <div>
              <p className="font-bold text-gray-800">
                {post.author?.firstName} {post.author?.lastName}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(post.createdAt).toLocaleDateString("hi-IN")}
              </p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>

          {/* Tags */}
          {post.crop_tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.crop_tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {post.content}
          </p>

          {/* Like Button */}
          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={handleLike}
              disabled={!token}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-500 px-4 py-2 rounded-lg transition disabled:opacity-50"
            >
              ❤️ {post.likes?.length || 0} Pasand
            </button>
            <span className="text-gray-400 text-sm">
              💬 {post.comments?.length || 0} Tippaniyan
            </span>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            💬 Tippaniyan ({post.comments?.length || 0})
          </h2>

          {/* Add Comment */}
          {token ? (
            <form onSubmit={handleComment} className="mb-6">
              <div className="flex gap-3">
                <img
                  src={user?.image}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Apni tipanni likhein..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none text-sm"
                  />
                  <button
                    type="submit"
                    disabled={commenting || !comment.trim()}
                    className="mt-2 bg-yellow-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-700 transition disabled:opacity-50"
                  >
                    {commenting ? "Bhej rahe hain..." : "Tipanni Bhejein"}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <p className="text-gray-400 text-sm mb-6">
              Tipanni karne ke liye{" "}
              <a href="/login" className="text-yellow-600 hover:underline">
                login karein
              </a>
            </p>
          )}

          {/* Comments List */}
          {post.comments?.length === 0 ? (
            <p className="text-center text-gray-400 py-6">
              Abhi koi tipanni nahi hai — pehli tipanni karein!
            </p>
          ) : (
            <div className="space-y-4">
              {post.comments.map((c) => (
                <div key={c._id} className="flex gap-3">
                  <img
                    src={c.author?.image}
                    alt="commenter"
                    className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                  />
                  <div className="bg-gray-50 px-4 py-3 rounded-xl flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-800 text-sm">
                        {c.author?.firstName} {c.author?.lastName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(c.createdAt).toLocaleDateString("hi-IN")}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PostDetail;
