import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllQuestions, askQuestion, answerQuestion, toggleLike } from "../../services/qaService";

const QA = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Ask question modal
  const [showAskModal, setShowAskModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [cropTag, setCropTag] = useState("");
  const [asking, setAsking] = useState(false);

  // Answer modal
  const [selectedQ, setSelectedQ] = useState(null);
  const [answer, setAnswer] = useState("");
  const [answering, setAnswering] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [currentPage, search]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await getAllQuestions({ search, page: currentPage, limit: 10 });
      setQuestions(res.questions);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    setAsking(true);
    try {
      await askQuestion({ question, crop_tags: cropTag ? [cropTag] : [] }, token);
      setQuestion("");
      setCropTag("");
      setShowAskModal(false);
      fetchQuestions();
    } catch (err) {
      console.error(err);
    } finally {
      setAsking(false);
    }
  };

  const handleAnswer = async (e) => {
    e.preventDefault();
    setAnswering(true);
    try {
      await answerQuestion(selectedQ._id, answer, token);
      setAnswer("");
      setSelectedQ(null);
      fetchQuestions();
    } catch (err) {
      console.error(err);
    } finally {
      setAnswering(false);
    }
  };

  const handleLike = async (id) => {
    if (!token) return;
    try {
      await toggleLike(id, token);
      fetchQuestions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">❓ Sawaal-Jawaab</h1>
            <p className="text-gray-500 mt-1">Apne sawaal poochho ya jawab do</p>
          </div>
          {token && user?.accountType === "Farmer" && (
            <button
              onClick={() => setShowAskModal(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              ➕ Sawaal Poochho
            </button>
          )}
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Sawaal dhundho..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Questions List */}
        {loading ? (
          <p className="text-center text-gray-400 py-12">Load ho raha hai...</p>
        ) : questions.length === 0 ? (
          <p className="text-center text-gray-400 py-12">Koi sawaal nahi mila</p>
        ) : (
          <div className="space-y-4 mb-8">
            {questions.map((q) => (
              <div
                key={q._id}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                {/* Question */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={q.askedBy?.image}
                      alt="asker"
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                    />
                    <div>
                      <p className="font-bold text-gray-800">{q.question}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {q.askedBy?.firstName} {q.askedBy?.lastName} •{" "}
                        {new Date(q.createdAt).toLocaleDateString("hi-IN")}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${
                    q.resolved
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {q.resolved ? "✅ Hal hua" : "⏳ Jawab chahiye"}
                  </span>
                </div>

                {/* Tags */}
                {q.crop_tags?.length > 0 && (
                  <div className="flex gap-2 mb-3 ml-13">
                    {q.crop_tags.map((tag, i) => (
                      <span key={i} className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Answer */}
                {q.resolved && q.answer && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl ml-13 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={q.answeredBy?.image}
                        alt="expert"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <p className="text-sm font-semibold text-green-700">
                        {q.answeredBy?.firstName} {q.answeredBy?.lastName}
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm">{q.answer}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleLike(q._id)}
                    disabled={!token}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition disabled:opacity-50"
                  >
                    ❤️ {q.likes?.length || 0}
                  </button>
                  {token && user?.accountType === "Expert" && !q.resolved && (
                    <button
                      onClick={() => setSelectedQ(q)}
                      className="bg-yellow-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-yellow-700 transition"
                    >
                      Jawab Do
                    </button>
                  )}
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

        {/* Ask Question Modal */}
        {showAskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">❓ Sawaal Poochho</h3>
              <form onSubmit={handleAskQuestion} className="flex flex-col gap-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Apna sawaal likhein..."
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                />
                <input
                  type="text"
                  value={cropTag}
                  onChange={(e) => setCropTag(e.target.value)}
                  placeholder="Fasal ka naam (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAskModal(false)}
                    className="w-1/3 border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Raho
                  </button>
                  <button
                    type="submit"
                    disabled={asking}
                    className="w-2/3 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {asking ? "Bhej rahe hain..." : "Sawaal Bhejein"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Answer Modal */}
        {selectedQ && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">✍️ Jawab Do</h3>
              <p className="text-gray-600 text-sm mb-4 bg-gray-50 p-3 rounded-lg">
                "{selectedQ.question}"
              </p>
              <form onSubmit={handleAnswer} className="flex flex-col gap-4">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Apna jawab likhein..."
                  rows={5}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedQ(null)}
                    className="w-1/3 border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Raho
                  </button>
                  <button
                    type="submit"
                    disabled={answering}
                    className="w-2/3 bg-yellow-600 text-white py-2 rounded-lg font-semibold hover:bg-yellow-700 transition disabled:opacity-50"
                  >
                    {answering ? "Bhej rahe hain..." : "Jawab Bhejein"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default QA;
