import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { updateProfile } from "../../services/profileService";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const profile = user?.additionalDetails;

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    gender: profile?.gender || "",
    dateOfBirth: profile?.dateOfBirth || "",
    about: profile?.about || "",
    state: profile?.state || "",
    district: profile?.district || "",
    village: profile?.village || "",
    // Farmer
    landSize: profile?.landSize || "",
    primaryCrops: profile?.primaryCrops?.join(", ") || "",
    // Expert
    expertise: profile?.expertise?.join(", ") || "",
    experience_years: profile?.experience_years || "",
    // Buyer
    businessName: profile?.businessName || "",
    businessType: profile?.businessType || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = {
        ...formData,
        primaryCrops: formData.primaryCrops
          ? formData.primaryCrops.split(",").map((c) => c.trim())
          : [],
        expertise: formData.expertise
          ? formData.expertise.split(",").map((e) => e.trim())
          : [],
      };

      const res = await updateProfile(data, token);
      if (res.success) {
        // Update user in redux
        dispatch(setUser({
          ...user,
          additionalDetails: res.profile,
        }));
        setSuccess("Profile update ho gayi!");
        setEditing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Profile update mein error aaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header Card */}
        <div className="bg-green-700 text-white p-6 rounded-2xl shadow-md mb-6 flex items-center gap-6">
          <img
            src={user?.image}
            alt="profile"
            className="w-20 h-20 rounded-full border-4 border-white object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-green-200">{user?.email}</p>
            <span className="mt-1 inline-block bg-white text-green-700 text-xs font-bold px-3 py-1 rounded-full">
              {user?.accountType}
              {profile?.verified && " ✅"}
            </span>
          </div>
        </div>

        {/* Success/Error */}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Profile Details */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Profile Details</h2>
            <button
              onClick={() => setEditing(!editing)}
              className="text-green-600 border border-green-600 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-50 transition"
            >
              {editing ? "Raho" : "✏️ Edit Karein"}
            </button>
          </div>

          {!editing ? (
            // View Mode
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Ling</p>
                <p className="font-medium text-gray-800">{profile?.gender || "—"}</p>
              </div>
              <div>
                <p className="text-gray-400">Janm Tithi</p>
                <p className="font-medium text-gray-800">{profile?.dateOfBirth || "—"}</p>
              </div>
              <div>
                <p className="text-gray-400">Rajya</p>
                <p className="font-medium text-gray-800">{profile?.state || "—"}</p>
              </div>
              <div>
                <p className="text-gray-400">Zila</p>
                <p className="font-medium text-gray-800">{profile?.district || "—"}</p>
              </div>
              <div>
                <p className="text-gray-400">Gaon</p>
                <p className="font-medium text-gray-800">{profile?.village || "—"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400">Parichay</p>
                <p className="font-medium text-gray-800">{profile?.about || "—"}</p>
              </div>

              {/* Farmer specific */}
              {user?.accountType === "Farmer" && (
                <>
                  <div>
                    <p className="text-gray-400">Zameen ka Aakaar</p>
                    <p className="font-medium text-gray-800">{profile?.landSize || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Mukhya Fasalein</p>
                    <p className="font-medium text-gray-800">
                      {profile?.primaryCrops?.join(", ") || "—"}
                    </p>
                  </div>
                </>
              )}

              {/* Expert specific */}
              {user?.accountType === "Expert" && (
                <>
                  <div>
                    <p className="text-gray-400">Visheshagyta</p>
                    <p className="font-medium text-gray-800">
                      {profile?.expertise?.join(", ") || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Anubhav (Saal)</p>
                    <p className="font-medium text-gray-800">
                      {profile?.experience_years || "—"}
                    </p>
                  </div>
                </>
              )}

              {/* Buyer specific */}
              {user?.accountType === "Buyer" && (
                <>
                  <div>
                    <p className="text-gray-400">Business ka Naam</p>
                    <p className="font-medium text-gray-800">{profile?.businessName || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Business ka Prakar</p>
                    <p className="font-medium text-gray-800">{profile?.businessType || "—"}</p>
                  </div>
                </>
              )}
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Ling</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="">Chunein</option>
                    <option value="Male">Purush</option>
                    <option value="Female">Mahila</option>
                    <option value="Other">Anya</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Janm Tithi</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Rajya</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Bihar"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Zila</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Patna"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Gaon</label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    placeholder="Gaon ka naam"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Parichay</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Apne baare mein likhein..."
                  rows={3}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                />
              </div>

              {/* Farmer specific */}
              {user?.accountType === "Farmer" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Zameen ka Aakaar</label>
                    <input
                      type="text"
                      name="landSize"
                      value={formData.landSize}
                      onChange={handleChange}
                      placeholder="5 acres"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Mukhya Fasalein</label>
                    <input
                      type="text"
                      name="primaryCrops"
                      value={formData.primaryCrops}
                      onChange={handleChange}
                      placeholder="wheat, rice"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                </div>
              )}

              {/* Expert specific */}
              {user?.accountType === "Expert" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Visheshagyta</label>
                    <input
                      type="text"
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleChange}
                      placeholder="wheat, rice"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Anubhav (Saal)</label>
                    <input
                      type="number"
                      name="experience_years"
                      value={formData.experience_years}
                      onChange={handleChange}
                      placeholder="10"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                </div>
              )}

              {/* Buyer specific */}
              {user?.accountType === "Buyer" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Business ka Naam</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="ABC Traders"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Business ka Prakar</label>
                    <input
                      type="text"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      placeholder="Wholesaler"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="w-1/3 border border-gray-300 text-gray-600 font-semibold py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  Raho
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
                >
                  {loading ? "Save ho raha hai..." : "Profile Save Karein"}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile; 
