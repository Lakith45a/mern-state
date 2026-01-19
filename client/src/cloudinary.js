// Cloudinary upload utility for client-side uploads

const CLOUD_NAME = "dws3qcolw";
const UPLOAD_PRESET = "profilePic";
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes

/**
 * Upload an image to Cloudinary
 * @param {File} file - The file object to upload
 * @param {Function} onProgress - Progress callback function
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
export const uploadImage = async (file, onProgress) => {
  try {
    // Validate file size before uploading
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size exceeds 3MB limit");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    // Use XMLHttpRequest to track upload progress
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Set up progress tracking
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          if (onProgress) {
            onProgress(percentComplete);
          }
        }
      };

      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      );

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.secure_url);
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network error during upload"));
      };

      xhr.send(formData);
    });
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

// Helper function to create optimized profile picture URL
export const getProfileImageUrl = (originalUrl) => {
  if (!originalUrl) return null;

  // Add transformations to make it an optimized profile picture
  return originalUrl.replace("/upload/", "/upload/c_fill,g_face,w_300,h_300/");
};
