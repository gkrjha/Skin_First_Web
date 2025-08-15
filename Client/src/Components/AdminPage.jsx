import React from "react";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { LuMessageCircleMore } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import Doctor from "../assets/Doctor.png";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiLogin } from "react-icons/ci";
import { FaBed } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { CiMedicalCross } from "react-icons/ci";
import { FaHandshakeSimple } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const token = localStorage.getItem("token");

const countDoctor = async () => {
  const response = await axios.get(`http://localhost:3000/doctor/count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.count;
};

const patientCount = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/patient/coutn/patient",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);

    return response?.data ?? 0;
  } catch (err) {
    console.error("Error fetching appointment count:", err);
    throw err;
  }
};

const appointmentCount = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/appointment/appointments/count",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);

    return response?.data ?? 0;
  } catch (err) {
    console.error("Error fetching appointment count:", err);
    throw err;
  }
};

const alldoctor = async () => {
  try {
    const response = await axios.get("http://localhost:3000/doctor/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("sdxfcgvbhnjmdfcgvbhnj", response);

    return response?.data;
  } catch (err) {
    console.error("Error fetching appointment count:", err);
    throw err;
  }
};
// http://localhost:3000/patient/recent-patient

const recentpatient = async () => {
  const response = await axios.get(
    "http://localhost:3000/patient/recent-patient",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  return response?.data;
};
const AdminPage = () => {
  const {
    data: doctorCount,
    isLoading: doctorLoading,
    error: doctorError,
  } = useQuery({
    queryKey: ["doctorCount"],
    queryFn: countDoctor,
  });

  const {
    data: appointmentCountData,
    isLoading: appointmentLoading,
    error: appointmentError,
  } = useQuery({
    queryKey: ["appointmentCount"],
    queryFn: appointmentCount,
  });

  const {
    data: patientCountData,
    isLoading: patientLoading,
    error: patientError,
  } = useQuery({
    queryKey: ["patientCount"],
    queryFn: patientCount,
  });

  const {
    data: alldoctorData,
    isLoading: alldoctorLoading,
    error: alldoctorError,
  } = useQuery({
    queryKey: ["alldoctor"],
    queryFn: alldoctor,
  });

  const {
    data: patientData,
    isLoading: recentLoding,
    error,
  } = useQuery({
    queryKey: ["recent"],
    queryFn: recentpatient,
  });

  console.log(patientData);

  return (
    <>
      <div className="flex flex-wrap justify-around items-center bg-white shadow p-5 w-full gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center text-3xl cursor-pointer">
            <CiMenuBurger />
          </div>
          <div className="font-bold text-2xl p-2 rounded-2xl text-primary hidden sm:block">
            Skin_First
          </div>
        </div>
        <div className="flex w-full sm:w-[50%] md:w-[25%] relative">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 p-2 border border-gray-300 outline-none text-blue-700 text-[16px] font-medium
             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-3xl px-5"
          />
          <CiSearch className="text-gray-500 mr-2 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <FaBell className="cursor-pointer text-primary text-2xl sm:text-3xl" />
            <GoDotFill className="absolute top-0 right-0 text-blue-950" />
          </div>

          <LuMessageCircleMore className="cursor-pointer text-blue-800 text-2xl sm:text-3xl" />

          <img
            src={Doctor}
            alt="Profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex w-full">
        {/* Sidebar */}
        <div className="w-[16%] p-2 h-[91vh] flex flex-col justify-end bg-[#461c1c] shadow-2xl">
          <ul>
            <li>
              <div className="flex items-center gap-2 text-white rounded-lg hover:bg-white hover:text-blue-900 p-4 cursor-pointer">
                <IoSettingsOutline className="text-2xl" />
                <span className="text-2xl">Settings</span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2 text-white rounded-lg hover:bg-white hover:text-blue-900 p-4 cursor-pointer">
                <CgProfile className="text-2xl" />
                <span className="text-2xl">Profile</span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2 text-white rounded-lg hover:bg-white hover:text-blue-900 p-4 cursor-pointer">
                <CiLogin className="text-2xl" />
                <span className="text-2xl">Logout</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex w-[80%] flex-col">
          {/* Stats Cards */}
          <div className="w-[98%] flex m-[20px] gap-4">
            {/* Doctors */}
            <div className="w-[22%] p-2 h-[180px] border bg-[#ECF0FE] rounded-lg flex justify-between items-center">
              <div>
                <h1 className="text-[#7A8CC8] text-1xl font-extrabold">
                  Total Doctors
                </h1>
                {doctorLoading ? (
                  <h1 className="text-3xl font-extrabold">Loading...</h1>
                ) : doctorError ? (
                  <h1 className="text-3xl font-extrabold text-red-500">
                    Error
                  </h1>
                ) : (
                  <h1 className="text-3xl font-extrabold">{doctorCount}</h1>
                )}
              </div>
              <div className="h-full w-[120px]">
                <FaUserDoctor className="h-full w-full" />
              </div>
            </div>

            {/* Patients */}
            <div className="w-[22%] p-2 h-[180px] border bg-[#ECF0FE] rounded-lg flex justify-between items-center">
              <div>
                <h1 className="text-[#7A8CC8] text-1xl font-extrabold">
                  Total Patients
                </h1>
                {patientLoading ? (
                  <h1 className="text-3xl font-extrabold">Loading...</h1>
                ) : appointmentError ? (
                  <h1 className="text-3xl font-extrabold text-red-500">
                    Error
                  </h1>
                ) : (
                  <h1 className="text-3xl font-extrabold">
                    {patientCountData}
                  </h1>
                )}
              </div>
              <div className="h-full w-[120px]">
                <FaBed className="h-full w-full" />
              </div>
            </div>

            {/* Appointments */}
            <div className="w-[22%] p-2 h-[180px] border bg-[#ECF0FE] rounded-lg flex justify-between items-center">
              <div>
                <h1 className="text-[#7A8CC8] text-1xl font-extrabold">
                  Total Appointments
                </h1>
                {appointmentLoading ? (
                  <h1 className="text-3xl font-extrabold">Loading...</h1>
                ) : appointmentError ? (
                  <h1 className="text-3xl font-extrabold text-red-500">
                    Error
                  </h1>
                ) : (
                  <h1 className="text-3xl font-extrabold">
                    {appointmentCountData}
                  </h1>
                )}
              </div>
              <div className="h-full w-[120px]">
                <FaHandshakeSimple className="h-full w-full" />
              </div>
            </div>

            {/* Available Doctors */}
            <div className="w-[22%] p-2 h-[180px] border bg-[#ECF0FE] rounded-lg flex justify-between items-center">
              <div>
                <h1 className="text-[#7A8CC8] text-1xl font-extrabold">
                  Available Doctors
                </h1>
              </div>
              <div className="h-full w-[120px]">
                <FaUserDoctor className="h-full w-full" />
              </div>
            </div>
          </div>

          {/* Doctors List */}
          <div className="w-[90%]">
            <div className="flex justify-between mx-[20px] mt-4 shadow p-1 w-full items-center">
              <h1 className="text-2xl font-bold text-blue-900 m-4">Doctors</h1>
              <button className="flex justify-center items-center bg-primary px-5 rounded-2xl text-white h-11 cursor-pointer">
                <CiMedicalCross className="text-white font-bold" />
                <span className="text-white font-bold"> Add Doctor</span>
              </button>
            </div>
          </div>

          {/* Doctor Avatars */}
          <div className="scrollbar-hide w-[90%] m-[20px]">
            <div className="flex overflow-auto no-scrollbar">
              {Array.isArray(alldoctorData) &&
                alldoctorData.map((data, index) => (
                  <div className="min-w-[130px] h-[200px] shadow p-2 bg-white flex flex-col justify-center items-center m-2 cursor-pointer">
                    <img
                      src={data?.profileImage}
                      alt=""
                      className="w-[150px] h-[150px] rounded-full object-cover border bg-black p-1"
                    />
                    <p className="text-primary font-semibold">
                      {data?.specialization}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Patients */}
          <div className="flex flex-col m-5 overflow-auto no-scrollbar h-[300px] w-[90%]">
            <h1 className="text-blue-800 font-bold text-3xl mb-4 sticky top-0 bg-white">
              Recent Patients
            </h1>

            <div className="grid grid-cols-5 bg-blue-50 text-blue-800 font-semibold text-lg shadow rounded-t-md p-3 sticky top-0">
              <span>Name</span>
              <span>Date In</span>
              <span>Age</span>
              <span>Gender</span>
              <span>Status</span>
            </div>

            {Array.isArray(patientData) &&
              patientData.map((data, index) => (
                <div
                  // key={i}
                  className="grid grid-cols-5 items-center text-gray-700 font-medium text-base shadow border-t p-3 hover:bg-gray-50 transition"
                >
                  <span>{data.name}</span>
                  <span> {data.createdAt}</span>
                  <span>{data.dob}</span>
                  <span>{data.gender}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
