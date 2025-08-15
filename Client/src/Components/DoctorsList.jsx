import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:3000/doctor/getdoctor/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors((prev) => prev.filter((doc) => doc._id !== id));
      alert("Doctor deleted successfully");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-blue-600">Loading...</p>;

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mb-6 sticky items-center flex justify-around top-0 bg-white z-10 py-2 shadow-sm">
        <h1 className="text-3xl font-bold text-blue-700 ">Doctor List</h1>
        <input
          type="text"
          placeholder="Search doctor by name..."
          className="w-full md:w-1/3 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="min-w-full text-left border border-blue-200"
        >
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Specialization</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor, index) => (
                <motion.tr
                  key={doctor._id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-blue-100 hover:bg-blue-50 transition"
                >
                  <td className="py-3 px-6">{doctor.name}</td>
                  <td className="py-3 px-6">{doctor.specialization}</td>
                  <td className="py-3 px-6">{doctor.status}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => deleteDoctor(doctor._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default DoctorList;
