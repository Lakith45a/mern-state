import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { uploadImage } from "../cloudinary";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaUser, FaEnvelope, FaLock, FaPlus, FaSignOutAlt, FaCamera, FaHome } from "react-icons/fa";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    try {
      setUploading(true);
      setFileUploadError(false);
      setUploadComplete(false);
      setFilePerc(0);

      // Call the uploadImage utility function with a progress callback
      const imageUrl = await uploadImage(file, (progress) => {
        setFilePerc(Math.round(progress));
        console.log("Upload progress:", progress);
      });

      setFormData({
        ...formData,
        avatar: imageUrl,
      });

      // Set a small delay to ensure progress is visible
      setTimeout(() => {
        setUploadComplete(true);
        setUploading(false);
      }, 800);
    } catch (error) {
      console.error("Upload error:", error);
      setFileUploadError(true);
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        setError(data.message);
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async() => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  }

  const handleDeleteListing = async(listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setUserListings((prev)=> 
        prev.filter((listing)=> listing._id !== listingId))

    } catch (error) {
      console.log(error.message);
    }
    
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar Section */}
            <div className="relative group">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                id="file"
                ref={fileRef}
                hidden
                accept="image/*"
              />
              <div className="relative">
                <img
                  onClick={() => fileRef.current.click()}
                  src={formData?.avatar || currentUser.avatar}
                  alt="profile"
                  className="rounded-full h-32 w-32 object-cover cursor-pointer border-4 border-orange-500 shadow-lg transition-transform hover:scale-105"
                />
                <div 
                  onClick={() => fileRef.current.click()}
                  className="absolute bottom-2 right-2 bg-orange-500 p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors shadow-lg"
                >
                  <FaCamera className="text-white text-sm" />
                </div>
              </div>
              {/* Upload status */}
              {(uploading || uploadComplete || fileUploadError) && (
                <p className="text-sm text-center mt-3">
                  {fileUploadError ? (
                    <span className="text-red-400">Error uploading image</span>
                  ) : uploading ? (
                    <span className="text-gray-300">{`Uploading: ${filePerc}%`}</span>
                  ) : uploadComplete ? (
                    <span className="text-green-400">Upload successful!</span>
                  ) : null}
                </p>
              )}
            </div>

            {/* User Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-white mb-1">{currentUser.username}</h1>
              <p className="text-gray-400 mb-4">{currentUser.email}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link
                  to="/create-listing"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm"
                >
                  <FaPlus /> Create Listing
                </Link>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm border border-white/20"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Update Profile Form */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FaUser className="text-orange-500" /> Update Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  defaultValue={currentUser.username}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  defaultValue={currentUser.email}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  placeholder="New Password"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white font-semibold py-3.5 rounded-xl hover:from-slate-900 hover:to-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Updating...
                  </span>
                ) : "Update Profile"}
              </button>

              {/* Success/Error Messages */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center text-sm">
                  {error}
                </div>
              )}
              {updateSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 text-center text-sm">
                  Profile updated successfully!
                </div>
              )}
            </form>

            {/* Danger Zone */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3">Danger Zone</p>
              <button
                onClick={handleDeleteUser}
                className="text-red-500 hover:text-red-600 text-sm font-medium hover:underline"
              >
                Delete Account Permanently
              </button>
            </div>
          </div>

          {/* Listings Section */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <FaHome className="text-orange-500" /> Your Listings
              </h2>
              <button
                onClick={handleShowListings}
                className="text-orange-500 hover:text-orange-600 text-sm font-semibold"
              >
                Refresh
              </button>
            </div>

            {showListingError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center text-sm mb-4">
                Error fetching listings
              </div>
            )}

            {userListings && userListings.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {userListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                  >
                    <Link to={`/listing/${listing._id}`}>
                      <img
                        src={listing.imageUrls[0]}
                        alt="listing"
                        className="h-16 w-16 object-cover rounded-lg shadow-sm"
                      />
                    </Link>
                    <Link
                      className="flex-1 min-w-0"
                      to={`/listing/${listing._id}`}
                    >
                      <p className="text-slate-800 font-semibold truncate hover:text-orange-500 transition-colors">
                        {listing.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {listing.address}
                      </p>
                    </Link>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/update-listing/${listing._id}`}>
                        <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                          <FaEdit className="text-sm" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteListing(listing._id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaHome className="text-5xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No listings yet</p>
                <button
                  onClick={handleShowListings}
                  className="text-orange-500 hover:text-orange-600 font-semibold text-sm"
                >
                  Load Listings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
