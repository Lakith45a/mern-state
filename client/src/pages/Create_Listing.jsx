import React from 'react'

function Create_Listing() {
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
            <span className='font-normal text-gray-600 ml-2'>The first image will e the Cover Image (max-6)</span>
            </p>
            <div className="flex gap-4 ">
            <input type="file" id='images' accept='/image/*' multiple  className='border border-gray-300 p-3 rounded-lg w-full'/>
            <button className='p-3 font-bold  bg-green-300 border-red-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
            </div>
             <button className='bg-blue-700 hover:opacity-95 p-3 rounded-lg text-white font-bold uppercase mt-3 ' type='submit'>Create Listing</button>        
        </div>
      </form>
    </main>
  )
}

export default Create_Listing
