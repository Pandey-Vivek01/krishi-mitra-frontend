import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";

const CreatePost = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    crop_tags: "",
    language: "hi",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = {
        ...formData,
        crop_tags: formData.crop_tags.split(",").map((tag) => tag.trim()),
      };
      const res = await createPost(data, token);
      if (res.success) {
        navigate("/posts");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Post banane mein error aaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 px-6 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-yellow-800 mb-2">✍️ Nayi Post Banao</h1>
        <p className="text-gray-500 mb-8">Apna anubhav aur gyaan share karo</p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div>
              <label className="text-sm font-medium text-gray-700">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Post ka title likhein..."
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Apna anubhav ya gyaan yahan likhein..."
                rows={8}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Crop Tags (comma se alag karein)
              </label>
              <input
                type="text"
                name="crop_tags"
                value={formData.crop_tags}
                onChange={handleChange}
                placeholder="wheat, rice, corn"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="hi">हिंदी</option>
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
                <option value="pa">ਪੰਜਾਬੀ</option>
              </select>
            </div>

            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={() => navigate("/expert/dashboard")}
                className="w-1/3 border border-yellow-600 text-yellow-600 font-semibold py-2 rounded-lg hover:bg-yellow-50 transition"
              >
                Wapas
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Post ban rahi hai..." : "Post Publish Karein"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default CreatePost;
