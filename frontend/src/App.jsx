import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import AboutUs from './pages/Aboutus';
import { useState } from 'react';
import SignUp from './pages/SignUp';
import { useLocation } from "react-router-dom";

const hideLayouts = ["/login", "/signup"];

function App() {

  //toggle state for sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); //get current location

  //boolean state for hiding
  const hideLayout = hideLayouts.includes(location.pathname);

  return (
    <>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        {!hideLayout && (<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />)}

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          {!hideLayout && (<Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />)}

          {/* Pages */}
          <div className="flex-1 p-4 bg-gray-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
