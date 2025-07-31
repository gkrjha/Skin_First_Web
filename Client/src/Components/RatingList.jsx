import React from "react";
import { FaInfoCircle, FaStar, FaUser } from "react-icons/fa";

const doctors = [
  {
    name: "Dr. Olivia Turner, M.D.",
    specialty: "Dermato-Endocrinology",
    rating: 5,
    img: "/doctor3.jpg",
  },
  {
    name: "Dr. Alexander Bennett, Ph.D.",
    specialty: "Dermato-Genetics",
    rating: 5,
    img: "/doctor1.jpg",
  },
  {
    name: "Dr. Sophia Martinez, Ph.D.",
    specialty: "Cosmetic Bioengineering",
    rating: 4.9,
    img: "/doctor4.jpg",
  },
  {
    name: "Dr. Michael Davidson, M.D.",
    specialty: "Solar Dermatology",
    rating: 4.8,
    img: "/doctor2.jpg",
  },
];

const RatingList = () => {
  return (
    <div className="min-h-screen px-4 md:px-20 py-6 bg-white">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Top Rated Doctors
      </h2>

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
              <div className="flex gap-2 text-sm text-gray-700 mt-1">
                <span>
                  <FaStar className="inline text-yellow-400" /> {doc.rating}
                </span>
                <span>Professional Doctor</span>
              </div>
            </div>
            <div className="flex gap-2 items-center text-primary">
              <button className="text-sm bg-primary text-white px-3 py-1 rounded-full">
                Info
              </button>
              <FaInfoCircle className="cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingList;
