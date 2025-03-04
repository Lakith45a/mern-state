import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <header className='bg-sky-900 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to= '/'>
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-zinc-50'>Royal</span>
        <span className='text-orange-600'>Estate</span>
      </h1>
        </Link>
      <form className='bg-slate-100 rounded-lg flex items-center p-2.5'> 
          <input type="text" placeholder=' Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
          <FaSearch className='text-slate-950'/>
      </form>
          <ul className='gap-4  flex'>
            <Link to='/'> 
            <li className='hidden sm:inline text-slate-100 font-semibold hover:underline'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline text-slate-100 font-semibold hover:underline'>About</li>
            </Link>
            <Link to='/Sign_in'>
            <li className='text-slate-100 font-semibold hover:underline'>Signin</li>
            </Link>
          </ul>


      </div>
      
      
    </header>
  )
}
