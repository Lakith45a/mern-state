import { useState } from "react";
import { uploadImage } from "../cloudinary";
import { set } from "mongoose";

export default function Create_Listing() {
    const[files, setFiles] = useState([]);
    const[formsData, setFormData] = useState({
        imageUrls: [],
    });
    const[imageUploadError, setImageUploadError] = useState(false);
    const[uploading, setUploading] = useState(false);
    const handleImageSubmit = (e) => {
        e.preventDefault();
        if(files.length === 0){
            setImageUploadError('Please select at least one image.');
            return;
        }
        if(files.length + formsData.imageUrls.length > 6){
            setImageUploadError('You can upload a maximum of 6 images per listing.');
            return;
        }
        
        setUploading(true);
        setImageUploadError(false);
        
        const promises = [];
        for (let i = 0; i < files.length; i++) {
            promises.push(uploadImage(files[i]));
        }
        
        Promise.all(promises)
            .then((urls)=> {
                setFormData({
                    ...formsData,
                    imageUrls: formsData.imageUrls.concat(urls)
                });
                setImageUploadError(false);
                setUploading(false);
                // Clear the file input
                setFiles([]);
                document.getElementById('images').value = '';
            })
            .catch((error) => {
                setImageUploadError('Image upload failed (3mb max per image). Please try again.');
                setUploading(false);
            });
        }
        const handleDeleteImage = (index) => {
            setFormData({
                ...formsData,
                imageUrls: formsData.imageUrls.filter((_, i) => i !== index)
            });
        }
        

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold my-7 text-center'>Create a Listing</h1>
      <form className='flex flex-col sm:flex-row gap-4'>

        <div className="flex flex-col gap-4 flex-1">
            <input type="text" placeholder='Name' className=' border p-3 rounded-lg' id='name' maxLength='64' minLength='10' required/>
            <textarea type="text" placeholder='Description' className=' border p-3 rounded-lg' id='description' />
            <input type="text" placeholder='Address' className=' border p-3 rounded-lg' id='address' required/>

            <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2">
                    <input type="checkbox" id='sell' className='w-5'/>
                    <span>Sell</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id='rent' className='w-5'/>
                    <span>Rent</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id='parking' className='w-5'/>
                    <span>Parking Area</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id='furnished' className='w-5'/>
                    <span>Furnished</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id='offer' className='w-5'/>
                    <span>Offer</span>
                </div>
        </div>
        <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center ">
                <input type="number"  className=' border p-3 rounded-lg bg-gray-100' id='bedrooms' required min='1' max='10'/>
                <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center ">
                <input type="number"  className=' border p-3 rounded-lg bg-gray-100' id='bathrooms' required min='1' max='10'/>
                <p>Bath</p>
            </div>
            <div className="flex gap-2 items-center ">
                <input type="number"  className=' border p-3 rounded-lg bg-gray-100' id='regularPrice' required/>
                <div className="flex flex-col items-center">
                        <p>Regular Price</p>
                        <span className='text-xs '>($ / Month)</span>
                </div>
            </div>
            <div className="flex gap-2 items-center ">
                <input type="number"  className=' border p-3 rounded-lg bg-gray-100' id='discountedPrice' required />
                <div className="flex flex-col items-center">
                        <p>Discounted Price</p>
                        <span className='text-xs '>($ / Month)</span>
                </div>
            </div>
        </div>

        </div>
        <div className="flex flex-col gap-4">
            <p className='font-semibold'> Images:
            <span className='font-normal text-gray-600 ml-2'>The first image will be the Cover Image (Max-6 Images)</span>
            </p>
            <div className="flex gap-4 ">
            <input onChange={(e)=>setFiles(e.target.files)} type="file" id='images' accept='/image/*' multiple  className='border border-gray-300 p-3 rounded-lg w-full'/>
            <button 
                type="button" 
                disabled={uploading}
                onClick={handleImageSubmit} 
                className='p-3 font-bold bg-green-300 border-red-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            </div>
             <p className="text-red-700 text-center mt-5">{imageUploadError ? imageUploadError : ""}</p>
             {
                formsData.imageUrls.length > 0 && formsData.imageUrls.map((url,index)=>(
                <div key={index} className="flex justify-between p-3 border border-gray-300 rounded-lg items-center">
                <img src={url} alt="uploaded image" className="h-20 w-20 object-contain rounded-lg"/>
                <button type="button" onClick={() => handleDeleteImage(index)} className="text-red-600 font-bold border border-red-700 rounded px-2 py-1 hover:opacity-75  uppercase">Delete</button>
                </div>                
        ))
             }
             <button className='bg-blue-700 hover:opacity-95 p-3 rounded-lg text-white font-bold uppercase mt-3 ' type='submit'>Create Listing</button>        
        </div>
      </form>
    </main>
  )
}


