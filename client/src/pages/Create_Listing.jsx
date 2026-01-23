import { useState } from "react";
import { uploadImage } from "../cloudinary";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaBed, FaBath, FaDollarSign, FaTag, FaParking, FaCouch, FaCloudUploadAlt, FaTrash, FaPlus } from "react-icons/fa";

export default function Create_Listing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setImageUploadError("Please select at least one image.");
      return;
    }
    if (files.length + formData.imageUrls.length > 6) {
      setImageUploadError("You can upload a maximum of 6 images per listing.");
      return;
    }

    setUploading(true);
    setImageUploadError(false);

    const promises = [];
    for (let i = 0; i < files.length; i++) {
      promises.push(uploadImage(files[i]));
    }

    Promise.all(promises)
      .then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);

        setFiles([]);
        document.getElementById("images").value = "";
      })
      .catch((error) => {
        setImageUploadError(
          "Image upload failed (3mb max per image). Please try again.",
        );
        setUploading(false);
      });
  };
  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        setError("Please upload at least one image.");
        return;
      }
      if (+formData.discountedPrice >= +formData.regularPrice) {
        setError("Discounted price must be less than regular price.");
        return;
      }
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <FaPlus className="text-2xl text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Create a Listing</h1>
          <p className="text-gray-500 mt-2">Fill in the details to list your property</p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Property Details */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FaHome className="text-orange-500" /> Property Details
            </h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
                <input
                  type="text"
                  placeholder="e.g., Modern Downtown Apartment"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  id="name"
                  maxLength="64"
                  minLength="10"
                  required
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Describe your property..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all min-h-[120px] resize-none"
                  id="description"
                  required
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter property address"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    id="address"
                    required
                    onChange={handleChange}
                    value={formData.address}
                  />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Listing Type</label>
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.type === 'sale' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="checkbox"
                      id="sale"
                      className="hidden"
                      onChange={handleChange}
                      checked={formData.type === "sale"}
                    />
                    <FaTag className={formData.type === 'sale' ? 'text-orange-500' : 'text-gray-400'} />
                    <span className="font-medium">For Sale</span>
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.type === 'rent' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="checkbox"
                      id="rent"
                      className="hidden"
                      onChange={handleChange}
                      checked={formData.type === "rent"}
                    />
                    <FaHome className={formData.type === 'rent' ? 'text-orange-500' : 'text-gray-400'} />
                    <span className="font-medium">For Rent</span>
                  </label>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
                <div className="grid grid-cols-3 gap-3">
                  <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.parking ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="checkbox"
                      id="parking"
                      className="hidden"
                      onChange={handleChange}
                      checked={formData.parking}
                    />
                    <FaParking className={formData.parking ? 'text-orange-500' : 'text-gray-400'} />
                    <span className="text-sm font-medium">Parking</span>
                  </label>
                  <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.furnished ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="checkbox"
                      id="furnished"
                      className="hidden"
                      onChange={handleChange}
                      checked={formData.furnished}
                    />
                    <FaCouch className={formData.furnished ? 'text-orange-500' : 'text-gray-400'} />
                    <span className="text-sm font-medium">Furnished</span>
                  </label>
                  <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.offer ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="checkbox"
                      id="offer"
                      className="hidden"
                      onChange={handleChange}
                      checked={formData.offer}
                    />
                    <FaDollarSign className={formData.offer ? 'text-orange-500' : 'text-gray-400'} />
                    <span className="text-sm font-medium">Offer</span>
                  </label>
                </div>
              </div>

              {/* Rooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <div className="relative">
                    <FaBed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      id="bedrooms"
                      required
                      min="1"
                      max="10"
                      onChange={handleChange}
                      value={formData.bedrooms}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                  <div className="relative">
                    <FaBath className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      id="bathrooms"
                      required
                      min="1"
                      max="10"
                      onChange={handleChange}
                      value={formData.bathrooms}
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Regular Price <span className="text-gray-400 text-xs">{formData.type === 'rent' ? '($/month)' : '($)'}</span>
                  </label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      id="regularPrice"
                      min="50"
                      max="1000000"
                      onChange={handleChange}
                      value={formData.regularPrice}
                      required
                    />
                  </div>
                </div>
                {formData.offer && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discounted Price <span className="text-gray-400 text-xs">{formData.type === 'rent' ? '($/month)' : '($)'}</span>
                    </label>
                    <div className="relative">
                      <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        id="discountedPrice"
                        required
                        min="0"
                        max="1000000"
                        onChange={handleChange}
                        value={formData.discountedPrice}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                <FaCloudUploadAlt className="text-orange-500" /> Property Images
              </h2>
              <p className="text-gray-500 text-sm mb-6">The first image will be the cover (max 6 images)</p>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-orange-500 transition-colors">
                <FaCloudUploadAlt className="text-4xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-3">Drag & drop images here or</p>
                <label className="inline-block">
                  <input
                    onChange={(e) => setFiles(e.target.files)}
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <span className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg cursor-pointer transition-colors">
                    Browse Files
                  </span>
                </label>
              </div>

              {/* Upload Button */}
              {files.length > 0 && (
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleImageSubmit}
                  className="w-full mt-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-semibold py-3 rounded-xl hover:from-slate-900 hover:to-slate-800 transition-all disabled:opacity-70"
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Uploading...
                    </span>
                  ) : `Upload ${files.length} Image${files.length > 1 ? 's' : ''}`}
                </button>
              )}

              {/* Error Message */}
              {imageUploadError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center text-sm">
                  {imageUploadError}
                </div>
              )}

              {/* Uploaded Images */}
              {formData.imageUrls.length > 0 && (
                <div className="mt-6 space-y-3">
                  <p className="text-sm font-medium text-gray-700">Uploaded Images ({formData.imageUrls.length}/6)</p>
                  {formData.imageUrls.map((url, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl group"
                    >
                      <img
                        src={url}
                        alt="uploaded"
                        className="h-16 w-16 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">
                          {index === 0 ? 'Cover Image' : `Image ${index + 1}`}
                        </p>
                        <p className="text-xs text-gray-400">Click delete to remove</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={loading || uploading}
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Listing...
                </span>
              ) : "Create Listing"}
            </button>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center text-sm">
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
