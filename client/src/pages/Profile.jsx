import { useSelector } from "react-redux"


export default function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-3xl font-semibold py-7 text-center">
      Profile</h1>
      <form className="flex flex-col p-4">
        <img src={currentUser.avatar} alt={currentUser.username} className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"/>
        <input type="text" id= "username" placeholder="Username" className="border p-3 rounded-lg mt-3"/>  
        <input type="email" id= "email" placeholder="Email" className="border p-3 rounded-lg mt-3"/>  
        <input type="text" id= "password" placeholder="password" className="border p-3 rounded-lg mt-3"/>  
        <button type="submit" className="bg-fuchsia-950 hover:opacity-95 p-3 rounded-lg text-white font-bold uppercase mt-3">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}
