import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import AboutUs from './pages/Aboutus';
import { useState } from 'react';

function App() {

  //toggle state for sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <BrowserRouter>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> 

          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            {/* Navbar */}
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Pages */}
            <div className="flex-1 p-4 bg-gray-50">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/aboutus" element={<AboutUs />} />
              </Routes>
            </div>

          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
