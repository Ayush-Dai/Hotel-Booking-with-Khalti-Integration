import Navbar from "./components/Navbar"
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen"
import Room from "./components/Room"
import BookingScreen from "./screens/BookingScreen"
import RegisterScreen from "./screens/RegisterScreen"
import LoginScreen from "./screens/LoginScreen"
import Home from "./screens/Home"
import Suctemp from "./screens/suctemp"
import PaymentCallback from "./screens/paymentCallback"
import Booked from "./screens/Booked"
import About from "./screens/About"
import AdminScreen from "./screens/AdminScreen"
import Footer from "./screens/Footer"
import Gallery from "./screens/Gallery"



function App() {
  return(
    <div className="App">
      <Navbar/>
   
          <BrowserRouter>
        <Routes>
          <Route path="/success" element={<Suctemp />}/>
          <Route path="/" element={<Home />} />
          <Route path='/home' element={<HomeScreen />} />
         <Route path='/book/:roomid/:fromdate/:todate' element={<BookingScreen/>} />
        <Route  path='/register' element={<RegisterScreen/>} />
        <Route  path='/login' element={<LoginScreen/>}/>
        <Route path="/payment-callback" element={<PaymentCallback/>} />
        <Route path="/booked" element={<Booked />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminScreen />}/>
        <Route path="/gallery" element={<Gallery/>}/>
       
        </Routes>
      </BrowserRouter>
      <Footer/>
     
    </div>
  )
}

export default App
