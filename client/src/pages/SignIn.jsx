import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCrown, FaEnvelope, FaLock } from "react-icons/fa";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import GOAuth from "../components/GOAuth";

export default function SignIn() {
  const [formdata, setFormdata] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 items-center justify-center p-12">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaCrown className="text-orange-500 text-5xl" />
            <div className="flex flex-col leading-none text-left">
              <span className="text-white font-bold text-4xl tracking-wide">ROYAL</span>
              <span className="text-orange-500 text-sm font-semibold tracking-[0.3em]">ESTATE</span>
            </div>
          </div>
          <h2 className="text-white text-3xl font-light mb-4">Welcome Back!</h2>
          <p className="text-gray-400 text-lg max-w-md">
            Sign in to access your saved properties, favorites, and continue your home search journey.
          </p>
          <div className="mt-12 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-orange-500 text-3xl font-bold">10K+</p>
              <p className="text-gray-400 text-sm">Properties</p>
            </div>
            <div className="text-center">
              <p className="text-orange-500 text-3xl font-bold">8K+</p>
              <p className="text-gray-400 text-sm">Customers</p>
            </div>
            <div className="text-center">
              <p className="text-orange-500 text-3xl font-bold">99%</p>
              <p className="text-gray-400 text-sm">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <FaCrown className="text-orange-500 text-3xl" />
            <div className="flex flex-col leading-none">
              <span className="text-slate-800 font-bold text-2xl">ROYAL</span>
              <span className="text-orange-500 text-xs font-semibold tracking-[0.2em]">ESTATE</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Sign in to continue to your account</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all bg-white"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all bg-white"
                id="password"
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-orange-500 hover:text-orange-600 transition-colors">
                Forgot Password?
              </Link>
            </div>

            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white font-semibold py-3.5 rounded-xl hover:from-slate-900 hover:to-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing In...
                </span>
              ) : "Sign In"}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <GOAuth />
          </form>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{" "}
            <Link to="/sign_up" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
              Sign Up
            </Link>
          </p>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
