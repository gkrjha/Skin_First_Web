import React from "react";
import {
  FaUser,
  FaHeart,
  FaCreditCard,
  FaLock,
  FaCog,
  FaQuestion,
  FaSignOutAlt,
} from "react-icons/fa";

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">My Profile</h1>
      <div className="flex flex-col items-center">
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
        <h2 className="text-lg font-semibold mt-2">John Doe</h2>
      </div>

      <div className="w-full max-w-md mt-6 space-y-3">
        {[
          { icon: <FaUser />, label: "Profile" },
          { icon: <FaHeart />, label: "Favorite" },
          { icon: <FaCreditCard />, label: "Payment Method" },
          { icon: <FaLock />, label: "Privacy Policy" },
          { icon: <FaCog />, label: "Settings" },
          { icon: <FaQuestion />, label: "Help" },
        ].map(({ icon, label }, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center p-3 bg-white rounded shadow-sm cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center gap-3 text-blue-600">
              {icon}
              <span>{label}</span>
            </div>
            <span className="text-gray-400">&gt;</span>
          </div>
        ))}

        <div className="flex justify-between items-center p-3 bg-white rounded shadow-sm cursor-pointer hover:bg-gray-100">
          <div className="flex items-center gap-3 text-red-500">
            <FaSignOutAlt />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
