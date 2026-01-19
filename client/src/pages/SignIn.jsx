import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
      const res = await fetch("api/auth/sign_in", {
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
      dispatch(signInSuccess(data.user));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-2xl bg-white bg-opacity-60 rounded-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg border"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg border"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-800 text-white font-bold p-3 rounded-lg hover:opacity-95 uppercase transition"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <GOAuth />
        </form>
        <div className="flex gap-2 my-4 justify-center">
          <p className="font-semibold">Don't have an account?</p>
          <Link to={"/sign_up"} className="text-blue-900 font-semibold">
            Sign Up
          </Link>
        </div>
        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
}
