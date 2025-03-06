import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate} from 'react-router-dom'



function GOAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleAuth = async() => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app)
      
      const result = await signInWithPopup(auth, provider)
      const res = await fetch('/api/auth/google',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name:result.user.displayName, 
          email:result.user.email, 
          photo:result.user.photoURL
        }),
      });
      const data = await res.json()
      dispatch(signInSuccess(data));
      navigate('/')

    } catch (error) {
        console.log('Could not Sign in with Google',error)
    }
  };
  return (
    <button onClick={handleGoogleAuth} type='button' className='google-auth bg-red-700 hover:opacity-95 p-3 rounded-lg text-white font-bold uppercase'>
      Continue With Google
    </button>
  )
}

export default GOAuth
