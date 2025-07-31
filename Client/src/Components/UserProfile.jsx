import React from "react";
import { FaHeart, FaSearch, FaSlidersH, FaBell, FaCog } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

const doctors = [
  {
    name: "Dr. Olivia Turner, M.D.",
    specialty: "Dermato-Endocrinology",
    rating: 5,
    patients: 60,
    img: "/doctor1.jpg",
  },
  {
    name: "Dr. Alexander Bennett, Ph.D.",
    specialty: "Dermato-Genetics",
    rating: 4.5,
    patients: 40,
    img: "/doctor2.jpg",
  },
  {
    name: "Dr. Sophia Martinez, Ph.D.",
    specialty: "Cosmetic Bioengineering",
    rating: 5,
    patients: 150,
    img: "/doctor3.jpg",
  },
  {
    name: "Dr. Michael Davidson, M.D.",
    specialty: "Nano-Dermatology",
    rating: 4.8,
    patients: 90,
    img: "/doctor4.jpg",
  },
];

const WebDoctorSchedule = () => {
  return (
    <div className="min-h-screen bg-white px-4 md:px-20 py-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <img src="/user.jpg" alt="user" className="w-12 h-12 rounded-full" />
          <div>
            <p className="text-sm text-gray-500">Hi, WelcomeBack</p>
            <p className="font-semibold text-lg">John Doe</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-primary">
          <FaBell className="text-xl cursor-pointer" />
          <FaCog className="text-xl cursor-pointer" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <div className="flex gap-4 text-primary font-medium">
          <span className="cursor-pointer border-b-2 border-primary">
            Doctors
          </span>
          <span className="cursor-pointer">Favorite</span>
          <FaSlidersH className="text-xl cursor-pointer" />
        </div>
        <div className="relative w-60">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 pl-8 border rounded-full"
          />
          <FaSearch className="absolute top-2.5 left-2 text-gray-500" />
        </div>
      </div>

      {/* Date Selector */}
      <div className="flex gap-4 overflow-x-auto mb-6">
        {["9 MON", "10 TUE", "11 WED", "12 THU", "13 FRI", "14 SAT"].map(
          (date, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg ${
                date === "11 WED"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700"
              } cursor-pointer`}
            >
              {date}
            </div>
          )
        )}
      </div>

      {/* Timeline Appointment */}
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <p className="font-semibold mb-2 text-primary">11 Wednesday - Today</p>
        <div className="space-y-2 text-sm text-gray-700">
          <p>9 AM</p>
          <div className="bg-white p-3 rounded-lg border shadow-sm">
            <p className="font-medium text-primary">
              Dr. Olivia Turner, M.D. <span className="float-right">✖</span>
            </p>
            <p className="text-sm mt-1">
              Treatment and prevention of skin and photodermatitis.
            </p>
          </div>
          <p>10 AM</p>
          <p>11 AM</p>
          <p>12 PM</p>
        </div>
      </div>

      {/* Doctor List */}
      <div className="grid gap-4">
        {doctors.map((doc, i) => (
          <div
            key={i}
            className="flex items-center p-4 border rounded-lg shadow-sm"
          >
            <img
              src={doc.img}
              alt={doc.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4 flex-1">
              <p className="font-semibold text-primary">{doc.name}</p>
              <p className="text-sm text-gray-500">{doc.specialty}</p>
              <div className="flex gap-4 mt-1 text-sm text-gray-700">
                <span>
                  <FaStar className="inline text-yellow-400" /> {doc.rating}
                </span>
                <span>{doc.patients} patients</span>
              </div>
            </div>
            <FaHeart className="text-primary cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebDoctorSchedule;
