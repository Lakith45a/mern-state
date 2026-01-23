import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaBed, FaBath, FaTag } from 'react-icons/fa';

export default function ListingItem({ listing }) {
  return (
    <div className='group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 w-full border border-gray-100'>
      <Link to={`/listing/${listing._id}`}>
        {/* Image Container */}
        <div className='relative overflow-hidden'>
          <img
            src={
              listing.imageUrls[0] ||
              'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
            }
            alt='listing cover'
            className='h-[200px] sm:h-[200px] w-full object-cover group-hover:scale-110 transition-transform duration-500'
          />
          {/* Badges */}
          <div className='absolute top-3 left-3 flex flex-col gap-2'>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
              listing.type === 'rent' 
                ? 'bg-blue-500 text-white' 
                : 'bg-emerald-500 text-white'
            }`}>
              {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
            {listing.offer && (
              <span className='px-3 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white flex items-center gap-1'>
                <FaTag className='text-[10px]' /> Offer
              </span>
            )}
          </div>
          {/* Price Overlay */}
          <div className='absolute bottom-3 right-3'>
            <div className='bg-slate-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl'>
              <span className='text-lg font-bold'>
                ${listing.offer
                  ? (listing.discountedPrice || 0).toLocaleString('en-US')
                  : (listing.regularPrice || 0).toLocaleString('en-US')}
              </span>
              {listing.type === 'rent' && (
                <span className='text-gray-300 text-sm'>/mo</span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='p-4 flex flex-col gap-3'>
          {/* Title */}
          <h3 className='text-lg font-bold text-slate-800 truncate group-hover:text-orange-500 transition-colors'>
            {listing.name}
          </h3>

          {/* Location */}
          <div className='flex items-center gap-2'>
            <div className='p-1.5 bg-orange-100 rounded-full'>
              <MdLocationOn className='h-3.5 w-3.5 text-orange-500' />
            </div>
            <p className='text-sm text-gray-500 truncate'>
              {listing.address}
            </p>
          </div>

          {/* Description */}
          <p className='text-sm text-gray-400 line-clamp-2 leading-relaxed'>
            {listing.description}
          </p>

          {/* Divider */}
          <div className='border-t border-gray-100 my-1'></div>

          {/* Features */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1.5 text-gray-600'>
                <div className='p-1.5 bg-slate-100 rounded-lg'>
                  <FaBed className='h-3.5 w-3.5 text-slate-600' />
                </div>
                <span className='text-sm font-medium'>
                  {listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}
                </span>
              </div>
              <div className='flex items-center gap-1.5 text-gray-600'>
                <div className='p-1.5 bg-slate-100 rounded-lg'>
                  <FaBath className='h-3.5 w-3.5 text-slate-600' />
                </div>
                <span className='text-sm font-medium'>
                  {listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}