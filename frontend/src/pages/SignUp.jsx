import { Link } from "react-router-dom";
import googleIcon from "../assests/googleIcon.png"
import CharacterIcon from "../assests/Character.png"
import DeviceIcon from "../assests/Device.png"
import PlantIcon from "../assests/Plant.png"
import ShadowIcon from "../assests/Shadow.png"

const SignUp = () => {
    return (
        <div className="w-full">

            {/* Top bar */}
            <div className="bg-blue-50 p-4 flex text-black font-medium text-sm">
                <p className="ml-10">Home {'>'}  </p>
                <Link className="text-blue-800">Signup</Link>
            </div>
            {/* Form + Image */}
            <div className="w-full flex justify-evenly p-8 ">
                {/* Form */}
                <div className="w-1/3 p-4">
                    <h5 className="text-2xl font-medium">Create Your Account</h5>
                    <p className="text-sm text-gray-500">Join Lawlelulia and book your appointment today</p>

                    {/* Form Fields */}
                    <input
                        type="text"
                        placeholder="Fullname"
                        value={""}
                        className="w-full border border-gray-300 p-2 rounded-md text-sm mt-6"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={""}
                        className="w-full border border-gray-300 p-2 rounded-md text-sm mt-4"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={""}
                        className="w-full border border-gray-300 p-2 rounded-md text-sm mt-4"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={""}
                        className="w-full border border-gray-300 p-2 rounded-md text-sm mt-4"
                    />

                    {/* Remember check + forgot password */}
                    <div className="flex items-center justify-between mt-2">
                        {/* Remember Me */}
                        <label className="flex items-center gap-2 text-xs">
                            <input type="checkbox" className="cursor-pointer" />
                            Remember me
                        </label>
                        {/* Forgot Password */}
                        <a
                            href="/forgot-password"
                            className="text-sm text-blue-800 hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/*Create Button */}
                    <button className="w-full mt-4 text-center p-2 bg-blue-800 text-white rounded-md ">Create Account</button>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="px-3 text-sm text-gray-500">
                            or Continue
                        </span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    {/* Google Button */}
                    <button className="w-full mt-4 flex items-center justify-center gap-2 p-2 border border-gray-300 text-gray-800 rounded-md text-sm">
                        <img src={googleIcon} alt="Google" className="w-5 h-5" />
                        <span>Sign in with google</span>
                    </button>

                    <p className="mt-4 text-sm">Already have an account?
                        <span><Link className="text-blue-800"> Login here</Link></span>
                    </p>
                </div>

                {/* Image */}
                <div className="w-1/3 mt-25">
                    <div className="flex">
                    <img className="w-20 h-65 mt-10 relative z-10" src={CharacterIcon} />
                    <img className="w-40 h-75 relative z-10" src={DeviceIcon} />
                    <img className="w-24 h-48 mt-27 -ml-6 relative z-10" src={PlantIcon} />
                    </div>
                    <img className="w-70 -mt-2" src={ShadowIcon} />
                </div>
            </div>
        </div>
    )
}

export default SignUp;