import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { uploadImage } from "../cloudinary";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
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
import { set } from "mongoose";

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
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-3xl font-semibold py-7 text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col p-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          id="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData?.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        {/* Upload status indicator */}
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error uploading image (file must be less than 3 MB)
            </span>
          ) : uploading ? (
            <span className="text-slate-700">{`Uploading: ${filePerc}%`}</span>
          ) : uploadComplete ? (
            <span className="text-green-700">Image uploaded successfully!</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg mt-3"
          onChange={handleChange}
        />

        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg mt-3"
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border p-3 rounded-lg mt-3"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-fuchsia-950 hover:opacity-95 p-3 rounded-lg text-white font-bold uppercase mt-3"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-blue-700 hover:opacity-95 p-3 rounded-lg text-white font-bold uppercase mt-3 text-center"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 text-center mt-5">{error ? error : ""}</p>
      <p className="text-green-700 text-center mt-5">
        {updateSuccess ? "Profile updated successfully!" : ""}
      </p>
      <button onClick={handleShowListings} className="text-green-700 font-bold mt-5 w-full">Show Listings </button>
      <p className="text-red-700 text-center mt-5">
        {showListingError ? "Error fetching listings. " : ""}
      </p>
      {userListings && userListings.length > 0 && 
      <div className="flex flex-col gap-4 ">
        <h1 className="text-2xl font-semibold pt-7 text-center">Your Listings</h1>
        {userListings.map((listing) => (
          <div key={listing._id} className="flex items-center gap-4 border p-3 rounded-lg  justify-between">
            <Link to={`/listing/${listing._id}`}>
              <img
                src={listing.imageUrls[0]}
                alt="listing"
                className="h-20 w-20 object-contain rounded-lg"
              />
            </Link>
            <Link className="text-slate-700 font-semibold flex-1 hover:underline truncate" to={`/listing/${listing._id}`}>
              <p >{listing.name}</p>
            </Link>
            <div className="flex flex-col items-center gap-2">
              <button onClick={() => handleDeleteListing(listing._id)} className="text-red-700 hover:opacity-75">
                <FaTrash />
              </button>
              
              <button className="text-green-700 hover:opacity-75">
                  <FaEdit />
              </button>
              
            </div>
          </div>
        ))}
      </div>
  } 
    </div>
  );
}
