import Icon5 from "../assests/Icon-5.png";

const Profile = () => {
    return (
        <>
            {/* Header */}
            <div>
                <h5 className="text-md font-semibold">Settings</h5>
                <p className="text-xs text-gray-500">
                    Manage your account settings and preferences
                </p>
            </div>

            {/* Profile Information */}
            <div className="w-full mt-4 border border-gray-300 rounded-md p-4">

                {/* Title */}
                <div className="flex items-center space-x-2">
                    <img className="w-4 h-4" src={Icon5} alt="icon" />
                    <p className="font-medium text-sm">Profile Information</p>
                </div>

                {/* Description */}
                <div className="mt-4 text-xs text-gray-500">
                    <p>Update your personal information and contact details</p>
                </div>

                {/* Profile Photo */}
                <div className="flex space-x-3 mt-4 items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-400"></div>

                    <div className="flex flex-col">
                        <button className="w-32 p-2 border border-gray-300 text-sm rounded-md font-medium hover:bg-gray-100 transition">
                            Change Photo
                        </button>
                        <p className="mt-2 text-xs text-gray-500">
                            JPG, PNG or GIF Max size 2MB
                        </p>
                    </div>
                </div>

                {/* Firstname + Lastname */}
                <div className="w-full flex gap-4 mt-4">
                    <div className="flex-1 flex flex-col">
                        <label htmlFor="firstname" className="font-medium text-sm text-gray-700">
                            First Name
                        </label>
                        <input
                            id="firstname"
                            type="text"
                            placeholder="Anas"
                            className="w-full bg-gray-100 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className="flex-1 flex flex-col">
                        <label htmlFor="lastname" className="font-medium text-sm text-gray-700">
                            Last Name
                        </label>
                        <input
                            id="lastname"
                            type="text"
                            placeholder="Sohail"
                            className="w-full bg-gray-100 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                </div>

                {/* Email + Phone */}
                <div className="w-full flex gap-4 mt-4">
                    <div className="flex-1 flex flex-col">
                        <label htmlFor="email" className="font-medium text-sm text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="anassohail34343@gmail.com"
                            className="w-full bg-gray-100 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className="flex-1 flex flex-col">
                        <label htmlFor="phone" className="font-medium text-sm text-gray-700">
                            Phone
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="+923242650627"
                            className="w-full bg-gray-100 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                </div>

                {/* Professional Title */}
                <div className="w-full mt-4 flex flex-col">
                    <label htmlFor="title" className="font-medium text-sm text-gray-700">
                        Professional Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Lawyer"
                        className="w-full bg-gray-100 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                {/* Bio */}
                <div className="w-full mt-4 flex flex-col">
                    <label htmlFor="bio" className="font-medium text-sm text-gray-700">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        placeholder="Brief professional bio"
                        className="w-full h-24 bg-gray-100 rounded-md p-2 text-sm outline-none resize-none focus:ring-2 focus:ring-black"
                    />
                </div>

                {/* Button */}
                <button className="bg-black text-white px-4 py-2 rounded-md mt-4 text-sm hover:bg-gray-800 transition">
                    Save Changes
                </button>
            </div>
        </>
    );
};

export default Profile;