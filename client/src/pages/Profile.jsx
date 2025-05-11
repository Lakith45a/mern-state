import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { uploadImage } from "../cloudinary";

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

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
        avatar: imageUrl
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

  return (
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-3xl font-semibold py-7 text-center">
      Profile</h1>
      <form className="flex flex-col p-4">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" id="file" ref={fileRef} hidden accept="image/*"/>
        <img 
          onClick={() => fileRef.current.click()} 
          src={formData.avatar || currentUser.avatar} 
          alt="profile" 
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        
        {/* Upload status indicator */}
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error uploading image (file must be less than 3 MB)</span>
          ) : uploading ? (
            <span className="text-slate-700">{`Uploading: ${filePerc}%`}</span>
          ) : uploadComplete ? (
            <span className="text-green-700">Image uploaded successfully!</span>
          ) : (
            ""
          )}
        </p>
        
        <input type="text" id="username" placeholder="Username" className="border p-3 rounded-lg mt-3"/>  
        <input type="email" id="email" placeholder="Email" className="border p-3 rounded-lg mt-3"/>  
        <input type="password" id="password" placeholder="Password" className="border p-3 rounded-lg mt-3"/>  
        <button type="submit" className="bg-fuchsia-950 hover:opacity-95 p-3 rounded-lg text-white font-bold uppercase mt-3">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}
