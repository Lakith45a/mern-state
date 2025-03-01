import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("api/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold my-7 text-center"> Sign In </h1>
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
          className="bg-slate-800 text-white my-5 p-3 rounded-lg hover:opacity-95 uppercase"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 my-4">
        <p className="font-semibold">Don't have an account?</p>
        <Link to={"/sign_up"}>
          <span className="text-blue-900 font-semibold">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-600 text-center">{error}</p>}
    </div>
  );
}
