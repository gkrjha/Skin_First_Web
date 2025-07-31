import React from "react";
import { FaHeart, FaInfoCircle, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom"; // For navigation

const doctors = [
  {
    name: "Dr. Alexander Bennett, Ph.D.",
    specialty: "Dermato-Genetics",
    rating: 5,
    img: "/doctor1.jpg",
  },
  {
    name: "Dr. Michael Davidson, M.D.",
    specialty: "Solar Dermatology",
    rating: 4.8,
    img: "/doctor2.jpg",
  },
  {
    name: "Dr. Olivia Turner, M.D.",
    specialty: "Dermato-Endocrinology",
    rating: 5,
    img: "/doctor3.jpg",
  },
  {
    name: "Dr. Sophia Martinez, Ph.D.",
    specialty: "Cosmetic Bioengineering",
    rating: 4.9,
    img: "/doctor4.jpg",
  },
];

const DoctorList = () => {
  return (
    <div className="min-h-screen px-4 md:px-20 py-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary">Doctors</h2>
        <input
          type="text"
          placeholder="Search"
          className="border px-3 py-1 rounded-full w-48"
        />
      </div>

      <div className="space-y-4">
        {doctors.map((doc, index) => (
          <div
            key={index}
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
            </div>
            <div className="flex gap-2 items-center text-primary">
              <Link to={`/doctor/${index}`}>
                <button className="text-sm bg-primary text-white px-3 py-1 rounded-full">
                  Info
                </button>
              </Link>
              <FaInfoCircle className="cursor-pointer" />
              <FaHeart className="cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
