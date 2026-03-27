import { Link } from "react-router-dom";
import googleIcon from "../assests/googleIcon.png"
import CharacterIcon from "../assests/Character.png"
import DeviceIcon from "../assests/Device.png"
import PlantIcon from "../assests/Plant.png"
import ShadowIcon from "../assests/Shadow.png"

const SignUp = () => {
    return (
        <div className="w-full min-h-screen flex flex-col">



            {/* Form + Image */}
            <div className="flex-1 w-full flex flex-col md:flex-row md:justify-evenly items-center p-8 gap-8">

                {/* Form */}
                <div className="w-full max-w-sm p-4">
                    {/* Brand name → home */}
                    <Link to="/" className="inline-flex items-center space-x-2 mb-6 group">
                        <div className="w-7 h-7 rounded-full bg-[#0A0F1C] flex justify-center items-center font-semibold text-white text-lg">C</div>
                        <span className="font-semibold text-[#0A0F1C] group-hover:underline">ocolaw.ai</span>
                    </Link>

                    <h5 className="text-2xl font-medium">Create Your Account</h5>
                    <p className="text-sm text-gray-500">Join CoCoLaw.ai and get expert legal guidance today</p>

                    <input type="text" placeholder="Full Name" className="w-full border border-gray-300 p-2 rounded-md text-sm mt-6 outline-none focus:ring-2 focus:ring-blue-800" />
                    <input type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded-md text-sm mt-4 outline-none focus:ring-2 focus:ring-blue-800" />
                    <input type="password" placeholder="Password" className="w-full border border-gray-300 p-2 rounded-md text-sm mt-4 outline-none focus:ring-2 focus:ring-blue-800" />
                    <input type="password" placeholder="Confirm Password" className="w-full border border-gray-300 p-2 rounded-md text-sm mt-4 outline-none focus:ring-2 focus:ring-blue-800" />

                    <div className="flex items-center justify-between mt-2">
                        <label className="flex items-center gap-2 text-xs">
                            <input type="checkbox" className="cursor-pointer" />
                            I agree to the Terms & Conditions
                        </label>
                    </div>

                    <button className="w-full mt-4 text-center p-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition">
                        Create Account
                    </button>

                    <div className="flex items-center my-4">
                        <div className="grow h-px bg-gray-300"></div>
                        <span className="px-3 text-sm text-gray-500">or Continue</span>
                        <div className="grow h-px bg-gray-300"></div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 p-2 border border-gray-300 text-gray-800 rounded-md text-sm hover:bg-gray-50 transition">
                        <img src={googleIcon} alt="Google" className="w-5 h-5" />
                        <span>Sign in with Google</span>
                    </button>

                    <p className="mt-4 text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-800 hover:underline">Login here</Link>
                    </p>
                </div>

                {/* Illustration */}
                <div className="hidden md:flex flex-col items-center">
                    <div className="flex items-end">
                        <img className="w-20 h-64 relative z-10" src={CharacterIcon} alt="" />
                        <img className="w-40 h-72 relative z-10" src={DeviceIcon} alt="" />
                        <img className="w-24 h-48 -ml-6 relative z-10" src={PlantIcon} alt="" />
                    </div>
                    <img className="w-72 -mt-2" src={ShadowIcon} alt="" />
                </div>
            </div>
        </div>
    );
};

export default SignUp;