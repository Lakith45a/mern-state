import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Create_Listing from './pages/Create_Listing';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign_in' element={<SignIn/>}/>
        <Route path='/sign_up' element={<SignUp/>}/>
        <Route path='/about' element={<About/>}/>

        <Route  element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/create-listing' element={ <Create_Listing/> }/>
        </Route>
        
    </Routes>
    </BrowserRouter>
  )
}
