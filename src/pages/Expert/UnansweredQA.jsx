import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllQuestions, answerQuestion } from "../../services/qaService";

const UnansweredQA = () => {
  const { token } = useSelector((state) => state.auth);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedQ, setSelectedQ] = useState(null);
  const [answer, setAnswer] = useState("");
  const [answering, setAnswering] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await getAllQuestions({ resolved: false, limit: 20 });
      setQuestions(res.questions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (e) => {
    e.preventDefault();
    setAnswering(true);
    try {
      await answerQuestion(selectedQ._id, answer, token);
      setAnswer("");
      setSelectedQ(null);
      setSuccess("Jawab bhej diya gaya! ✅");
      fetchQuestions();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setAnswering(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-yellow-800 mb-2">
          ❓ Unanswered Questions
        </h1>
        <p className="text-gray-500 mb-8">
          Kisanon ke sawaalon ka jawab do aur unki madad karo
        </p>

        {/* Success */}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Questions List */}
        {loading ? (
          <p className="text-center text-gray-400 py-12">Load ho raha hai...</p>
        ) : questions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-4">🎉</p>
            <p className="text-gray-500 font-medium">
              Koi unanswered question nahi hai — sab jawab ho gaye!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((q) => (
              <div
                key={q._id}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                {/* Question */}
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={q.askedBy?.image}
                    alt="asker"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{q.question}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {q.askedBy?.firstName} {q.askedBy?.lastName} •{" "}
                      {new Date(q.createdAt).toLocaleDateString("hi-IN")}
                    </p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0">
                    ⏳ Jawab chahiye
                  </span>
                </div>

                {/* Tags */}
                {q.crop_tags?.length > 0 && (
                  <div className="flex gap-2 mb-3 ml-13">
                    {q.crop_tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Answer Button */}
                <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => { setSelectedQ(q); setAnswer(""); }}
                    className="bg-yellow-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-700 transition"
                  >
                    ✍️ Jawab Do
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Answer Modal */}
        {selectedQ && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full mx-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">✍️ Jawab Do</h3>
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4">
                <p className="text-sm font-medium text-gray-700">"{selectedQ.question}"</p>
                <p className="text-xs text-gray-400 mt-1">
                  — {selectedQ.askedBy?.firstName} {selectedQ.askedBy?.lastName}
                </p>
              </div>
              <form onSubmit={handleAnswer} className="flex flex-col gap-4">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Apna jawab likhein..."
                  rows={6}
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
                    disabled={answering || !answer.trim()}
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

export default UnansweredQA;
