import React from "react";
import { FaCalendarAlt, FaStar, FaUser } from "react-icons/fa";

const DoctorInfo = () => {
  return (
    <div className="min-h-screen px-4 py-6 md:px-20 bg-white flex flex-col lg:flex-row gap-6">
      {/* Left: Doctor Image */}
      <div className="w-full lg:w-1/2 flex justify-center items-center xx:hidden md:flex">
        <img
          src="https://t4.ftcdn.net/jpg/06/43/62/53/360_F_643625328_VPkhbt47OV328Nzqexsg2zjVu7tTgdXx.jpg"
          alt="Dr. Alexander Bennett"
          className="w-full max-w-md h-auto rounded-lg shadow-md object-cover"
        />
      </div>

      {/* Right: Doctor Info */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="bg-secondary p-6 md:p-10 rounded-2xl shadow-md">
          <div className="w-full lg:w-1/2 flex justify-center items-center  md:hidden">
            <img
              src="https://t4.ftcdn.net/jpg/06/43/62/53/360_F_643625328_VPkhbt47OV328Nzqexsg2zjVu7tTgdXx.jpg"
              alt="Dr. Alexander Bennett"
              className="w-32 max-w-md h-32 rounded-full shadow-md object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-1">
            Dr. Alexander Bennett, Ph.D.
          </h2>
          <p className="text-lg text-gray-600 mb-3">Dermato-Genetics</p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-400" /> 5.0 Rating
            </span>
            <span className="flex items-center gap-1">
              <FaUser /> 40 Patients
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt /> Mon-Sat | 9AM - 5PM
            </span>
          </div>

          <button className="bg-primary text-white py-2 px-6 rounded-full hover:bg-opacity-90 transition text-sm font-medium">
            Schedule Appointment
          </button>
        </div>

        {/* Details */}
        <div className="mt-6 space-y-5">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-1">Profile</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Dr. Bennett is a leading expert in Dermato-Genetics with years of
              experience in diagnosing and treating complex skin disorders. His
              focus includes acne, psoriasis, and photodermatitis. Known for his
              patient-centered approach, he has helped over 40 patients recover
              through advanced techniques.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-primary mb-1">
              Career Path
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Graduated from Harvard Medical School with honors. Completed
              residency at Johns Hopkins Hospital and led dermatology research
              at Mayo Clinic. Over 15 years of professional experience.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-primary mb-1">
              Highlights
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Published 20+ papers in dermatological journals. Member of the
              American Academy of Dermatology. Recognized with "Best Doctor"
              award in 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;
