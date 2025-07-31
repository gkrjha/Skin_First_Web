import React, { useState } from "react";
import { FaHeart, FaInfoCircle, FaUserMd, FaChevronDown } from "react-icons/fa";

const doctorsData = [
  {
    name: "Dr. Olivia Turner, M.D.",
    specialty: "Dermato-Endocrinology",
    gender: "female",
    image:
      "https://images.unsplash.com/photo-1578509077752-6c3b4bc7025d?fit=crop&w=400&q=80",
  },
  {
    name: "Dr. Alexander Bennett, Ph.D.",
    specialty: "Dermato-Genetics",
    gender: "male",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?fit=crop&w=400&q=80",
  },
  {
    name: "Dr. Sophia Martinez, Ph.D.",
    specialty: "Cosmetic Bioengineering",
    gender: "female",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?fit=crop&w=400&q=80",
  },
  {
    name: "Dr. Michael Davidson, M.D.",
    specialty: "Solar Dermatology",
    gender: "male",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?fit=crop&w=400&q=80",
  },
];

const servicesData = [
  "Dermato-Endocrinology",
  "Cosmetic Bioengineering",
  "Dermato-Genetics",
  "Solar Dermatology",
];

const DoctorCard = ({ doctor }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center">
    <img
      src={doctor.image}
      alt={doctor.name}
      className="w-32 h-32 rounded-full object-cover mb-4"
    />
    <p className="font-semibold text-lg text-primary mb-1">{doctor.name}</p>
    <p className="text-sm text-gray-600 mb-3">{doctor.specialty}</p>
    <div className="flex justify-center gap-4 mb-4">
      <button className="bg-primary text-white p-2 rounded-full">
        <FaInfoCircle />
      </button>
      <button className="bg-primary text-white p-2 rounded-full">
        <FaHeart />
      </button>
      <button className="bg-primary text-white p-2 rounded-full">
        <FaUserMd />
      </button>
    </div>
    <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition text-sm">
      Make Appointment
    </button>
  </div>
);

const FavoriteDoctors = () => {
  const [activeTab, setActiveTab] = useState("Doctors");
  const [expandedService, setExpandedService] = useState(null);

  const filteredDoctors = (gender) =>
    doctorsData.filter((doc) => doc.gender === gender);

  return (
    <div className="min-h-screen p-6 md:p-12 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Favorites</h1>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              activeTab === "Doctors"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("Doctors")}
          >
            Doctors
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              activeTab === "Services"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("Services")}
          >
            Services
          </button>
        </div>
      </div>

      {activeTab === "Doctors" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorsData.map((doc, idx) => (
            <DoctorCard key={idx} doctor={doc} />
          ))}
        </div>
      )}

      {activeTab === "Services" && (
        <div className="space-y-4">
          {servicesData.map((service, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setExpandedService(expandedService === idx ? null : idx)
                }
              >
                <h2 className="text-lg font-semibold text-primary">
                  {service}
                </h2>
                <FaChevronDown
                  className={`transition-transform duration-200 ${
                    expandedService === idx ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              {expandedService === idx && (
                <div className="mt-2 text-gray-700 text-sm">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus luctus.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {doctorsData.map((doc, i) => (
                      <DoctorCard key={i} doctor={doc} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-primary mb-4">Female Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors("female").map((doc, idx) => (
            <DoctorCard key={idx} doctor={doc} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-primary mb-4">Male Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors("male").map((doc, idx) => (
            <DoctorCard key={idx} doctor={doc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteDoctors;
