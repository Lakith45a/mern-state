import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { FaCrown, FaArrowRight, FaTag, FaHome, FaKey } from 'react-icons/fa';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-slate-50 pointer-events-none" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col gap-8 py-20 md:py-28 px-4 max-w-6xl mx-auto">
          {/* Badge */}
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm w-fit px-4 py-2 rounded-full shadow-md border border-orange-100">
            <FaCrown className="text-orange-500" />
            <span className="text-sm font-medium text-slate-700">Premium Real Estate Platform</span>
          </div>
          
          <h1 className="text-slate-800 font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            Discover Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Ideal</span>
            <br />
            Home With Confidence
          </h1>

          <p className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed">
            Royal Estate makes finding your next home easier,
            <br />
            Browse carefully selected properties in one place.
          </p>

          <Link
            to={'/search'}
            className="group flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-xl w-fit shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Let's get started
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FaHome className="text-orange-500 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">500+</p>
                <p className="text-sm text-gray-500">Properties</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                <FaKey className="text-slate-600 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">200+</p>
                <p className="text-sm text-gray-500">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Listings Swiper */}
      {offerListings && offerListings.length > 0 && (
        <div className="relative">
          <Swiper 
            navigation 
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="group"
          >
            {offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div className="relative h-[500px] md:h-[600px]">
                  <div
                    style={{
                      background: `url(${listing.imageUrls[0]}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                    className="absolute inset-0"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="max-w-6xl mx-auto">
                      <span className="inline-block bg-orange-500 text-white text-sm font-medium px-4 py-1 rounded-full mb-4">
                        Featured Property
                      </span>
                      <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{listing.name}</h3>
                      <p className="text-white/80 text-sm md:text-base">{listing.address}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Listing Sections */}
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col gap-16">
        
        {/* Recent Offers Section */}
        {offerListings && offerListings.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FaTag className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Recent offers</h2>
                  <p className="text-gray-500 text-sm">Exclusive deals you don't want to miss</p>
                </div>
              </div>
              <Link 
                className="hidden md:flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors" 
                to={'/search?offer=true'}
              >
                Show more offers
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            <Link 
              className="md:hidden flex items-center justify-center gap-2 text-orange-500 hover:text-orange-600 font-semibold mt-6 transition-colors" 
              to={'/search?offer=true'}
            >
              Show more offers
              <FaArrowRight className="text-sm" />
            </Link>
          </section>
        )}
        
        {/* Places for Rent Section */}
        {rentListings && rentListings.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shadow-lg">
                  <FaKey className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Recent places for rent</h2>
                  <p className="text-gray-500 text-sm">Find your perfect rental property</p>
                </div>
              </div>
              <Link 
                className="hidden md:flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors" 
                to={'/search?type=rent'}
              >
                Show more places for rent
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            <Link 
              className="md:hidden flex items-center justify-center gap-2 text-orange-500 hover:text-orange-600 font-semibold mt-6 transition-colors" 
              to={'/search?type=rent'}
            >
              Show more places for rent
              <FaArrowRight className="text-sm" />
            </Link>
          </section>
        )}
        
        {/* Places for Sale Section */}
        {saleListings && saleListings.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FaHome className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Recent places for sale</h2>
                  <p className="text-gray-500 text-sm">Own your dream home today</p>
                </div>
              </div>
              <Link 
                className="hidden md:flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors" 
                to={'/search?type=sale'}
              >
                Show more places for sale
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            <Link 
              className="md:hidden flex items-center justify-center gap-2 text-orange-500 hover:text-orange-600 font-semibold mt-6 transition-colors" 
              to={'/search?type=sale'}
            >
              Show more places for sale
              <FaArrowRight className="text-sm" />
            </Link>
          </section>
        )}
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect property with Royal Estate.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg"
          >
            Start Browsing
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}