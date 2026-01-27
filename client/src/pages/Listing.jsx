import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaCheckCircle,
  FaHome,
  FaArrowLeft,
  FaTag,
  FaCalendarAlt,
  FaRulerCombined,
} from 'react-icons/fa';
import Contact from '../components/Contact';


export default function Listing() {
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading property details...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <FaHome className="text-red-500 text-3xl" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Property Not Found</h2>
            <p className="text-slate-500 mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/search" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              <FaArrowLeft /> Browse Properties
            </Link>
          </div>
        </div>
      )}

      {listing && !loading && !error && (
        <>
          {/* Image Gallery */}
          <div className="relative">
            <Swiper 
              navigation 
              pagination={{ clickable: true }}
              loop={listing.imageUrls.length > 1}
              className="group"
            >
              {listing.imageUrls.map((url, index) => (
                <SwiperSlide key={url}>
                  <div className="relative h-[400px] md:h-[550px]">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: 'cover',
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                      {index + 1} / {listing.imageUrls.length}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Share Button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all cursor-pointer"
            >
              <FaShare className="text-slate-600" />
            </button>

            {/* Copied Toast */}
            {copied && (
              <div className="absolute top-6 right-20 z-10 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
                <FaCheckCircle className="text-green-400" />
                Link copied!
              </div>
            )}

            {/* Back Button */}
            <Link 
              to="/search"
              className="absolute top-6 left-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all"
            >
              <FaArrowLeft className="text-slate-600" />
            </Link>
          </div>

          {/* Property Details */}
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Title & Price Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                      listing.type === 'rent' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {listing.type === 'rent' ? '🏠 For Rent' : '🏡 For Sale'}
                    </span>
                    {listing.offer && (
                      <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-orange-100 text-orange-700 flex items-center gap-1">
                        <FaTag className="text-xs" />
                        ${(+listing.regularPrice - +listing.discountedPrice).toLocaleString('en-US')} OFF
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                    {listing.name}
                  </h1>

                  {/* Location */}
                  <p className="flex items-center gap-2 text-slate-500 mb-4">
                    <FaMapMarkerAlt className="text-orange-500" />
                    {listing.address}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                      ${listing.offer
                        ? listing.discountedPrice.toLocaleString('en-US')
                        : listing.regularPrice.toLocaleString('en-US')}
                    </span>
                    {listing.type === 'rent' && (
                      <span className="text-slate-500 font-medium">/ month</span>
                    )}
                    {listing.offer && (
                      <span className="text-lg text-slate-400 line-through ml-2">
                        ${listing.regularPrice.toLocaleString('en-US')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features Grid */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <FaHome className="text-orange-500" />
                    Property Features
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl">
                      <FaBed className="text-2xl text-orange-500 mb-2" />
                      <span className="text-xl font-bold text-slate-800">{listing.bedrooms}</span>
                      <span className="text-sm text-slate-500">{listing.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl">
                      <FaBath className="text-2xl text-orange-500 mb-2" />
                      <span className="text-xl font-bold text-slate-800">{listing.bathrooms}</span>
                      <span className="text-sm text-slate-500">{listing.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl">
                      <FaParking className="text-2xl text-orange-500 mb-2" />
                      <span className="text-xl font-bold text-slate-800">{listing.parking ? '✓' : '✗'}</span>
                      <span className="text-sm text-slate-500">Parking</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl">
                      <FaChair className="text-2xl text-orange-500 mb-2" />
                      <span className="text-xl font-bold text-slate-800">{listing.furnished ? '✓' : '✗'}</span>
                      <span className="text-sm text-slate-500">Furnished</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <FaCalendarAlt className="text-orange-500" />
                    About This Property
                  </h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {listing.description}
                  </p>
                </div>

                {/* Amenities */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <FaCheckCircle className="text-orange-500" />
                    What This Place Offers
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${listing.parking ? 'bg-green-50' : 'bg-slate-50'}`}>
                      <FaParking className={listing.parking ? 'text-green-600' : 'text-slate-400'} />
                      <span className={listing.parking ? 'text-green-700' : 'text-slate-500'}>
                        {listing.parking ? 'Parking Available' : 'No Parking'}
                      </span>
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${listing.furnished ? 'bg-green-50' : 'bg-slate-50'}`}>
                      <FaChair className={listing.furnished ? 'text-green-600' : 'text-slate-400'} />
                      <span className={listing.furnished ? 'text-green-700' : 'text-slate-500'}>
                        {listing.furnished ? 'Fully Furnished' : 'Unfurnished'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Contact Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <FaHome className="text-white text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Interested in this property?</h3>
                    <p className="text-sm text-slate-500 mt-1">Contact the landlord directly</p>
                  </div>

                  {/* Quick Info */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-500">Price</span>
                      <span className="font-bold text-slate-800">
                        ${listing.offer
                          ? listing.discountedPrice.toLocaleString('en-US')
                          : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && '/mo'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-500">Type</span>
                      <span className="font-medium text-slate-800">
                        {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Bedrooms</span>
                      <span className="font-medium text-slate-800">{listing.bedrooms}</span>
                    </div>
                  </div>

                  {currentUser && listing.userRef !== currentUser._id && !contact && (
                    <button
                      onClick={() => setContact(true)}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Contact Landlord
                    </button>
                  )}

                  {!currentUser && (
                    <Link
                      to="/sign_in"
                      className="block w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Sign In to Contact
                    </Link>
                  )}

                  {currentUser && listing.userRef === currentUser._id && (
                    <Link
                      to={`/update-listing/${listing._id}`}
                      className="block w-full text-center bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Edit Your Listing
                    </Link>
                  )}

                  {contact && (
                    <div className="mt-4">
                      <Contact listing={listing} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}