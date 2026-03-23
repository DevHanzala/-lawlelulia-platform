import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import AboutUs from './pages/Aboutus';

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            {/* Navbar */}
            <Navbar />

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
