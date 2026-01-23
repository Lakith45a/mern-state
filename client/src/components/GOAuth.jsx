import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function GOAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not Sign in with Google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleAuth}
      type="button"
      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 p-3.5 rounded-xl text-gray-700 font-medium transition-all duration-200 shadow-sm"
    >
      <FcGoogle className="text-xl" />
      <span>Continue with Google</span>
    </button>
  );
}

export default GOAuth;
