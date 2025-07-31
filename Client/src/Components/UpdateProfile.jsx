import React from "react";

const EditProfile = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Profile</h1>
      <div className="relative">
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <span className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full text-white text-xs cursor-pointer">
          Edit
        </span>
      </div>

      <form className="w-full max-w-md mt-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            defaultValue="John Doe"
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            defaultValue="+123 567 89000"
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            defaultValue="johndoe@example.com"
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Date Of Birth
          </label>
          <input
            type="text"
            placeholder="DD / MM / YYYY"
            className="w-full p-2 border rounded bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
