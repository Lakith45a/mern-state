import { FaCrown, FaHome, FaHandshake, FaShieldAlt, FaUsers, FaAward, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    { number: "10K+", label: "Properties Listed" },
    { number: "8K+", label: "Happy Clients" },
    { number: "15+", label: "Years Experience" },
    { number: "50+", label: "Expert Agents" },
  ];

  const values = [
    {
      icon: <FaHandshake className="text-3xl text-orange-500" />,
      title: "Trust & Transparency",
      description: "We believe in building lasting relationships through honest communication and transparent dealings."
    },
    {
      icon: <FaShieldAlt className="text-3xl text-orange-500" />,
      title: "Quality Assurance",
      description: "Every property is thoroughly verified to ensure you get exactly what you're looking for."
    },
    {
      icon: <FaUsers className="text-3xl text-orange-500" />,
      title: "Client-Centric Approach",
      description: "Your satisfaction is our priority. We go above and beyond to meet your real estate needs."
    },
    {
      icon: <FaAward className="text-3xl text-orange-500" />,
      title: "Excellence",
      description: "We strive for excellence in every transaction, ensuring a seamless experience for our clients."
    },
  ];

  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaCrown className="text-orange-500 text-4xl" />
            <div className="flex flex-col leading-none text-left">
              <span className="text-white font-bold text-3xl tracking-wide">ROYAL</span>
              <span className="text-orange-500 text-sm font-semibold tracking-[0.3em]">ESTATE</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Journey to Finding the <span className="text-orange-500">Perfect Home</span> Starts Here
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            For over 15 years, Royal Estate has been helping families and individuals find their dream properties. We combine expertise, integrity, and personalized service to make your real estate journey seamless.
          </p>
          <Link 
            to="/search"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300"
          >
            Explore Properties
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-slate-800">{stat.number}</p>
                <p className="text-gray-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Our <span className="text-orange-500">Story</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2010, Royal Estate began with a simple mission: to transform the real estate experience. What started as a small team with big dreams has grown into one of the most trusted names in the property market.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We understand that buying or selling a property is more than just a transaction—it's a life-changing decision. That's why we approach every client relationship with care, professionalism, and dedication.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to uphold the values that made us successful: integrity, excellence, and an unwavering commitment to our clients' success.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" 
                alt="Modern home"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-orange-500 text-white p-6 rounded-2xl shadow-lg hidden md:block">
                <p className="text-3xl font-bold">15+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Our Core <span className="text-orange-500">Values</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              These principles guide everything we do and define who we are as a company.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-6 rounded-2xl hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <FaHome className="text-orange-500 text-5xl mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Whether you're buying, selling, or renting, our team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/search"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300"
            >
              Browse Properties
            </Link>
            <Link 
              to="/sign_up"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3 rounded-full transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <FaMapMarkerAlt className="text-orange-500 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Visit Us</p>
                <p className="text-slate-800 font-semibold">123 Royal Avenue, NY 10001</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <FaPhoneAlt className="text-orange-500 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Call Us</p>
                <p className="text-slate-800 font-semibold">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <FaEnvelope className="text-orange-500 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email Us</p>
                <p className="text-slate-800 font-semibold">info@royalestate.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
