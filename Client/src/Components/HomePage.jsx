import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
 const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col">
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold tracking-wide"
        >
          Skin_First
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-100 transition"
          onClick={() => {
            navigate("/login-user");
          }}
        >
          Login
        </motion.button>
      </nav>

      <div className="flex flex-col md:flex-row items-center justify-center flex-1 px-8 py-12 md:py-20">
        <motion.div
          className="max-w-lg text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
            Your Health, Our Priority
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Book your appointments with experienced doctors anytime, anywhere.
            <span className="text-blue-600 font-medium"> Skin_First</span> makes
            healthcare simple, fast, and reliable for both doctors and patients.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition"
          >
            Get Started
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-10 md:mt-0 md:ml-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="https://www.chesshealthsolutions.com/wp-content/uploads/2023/10/iStock-1473559425.jpg"
            alt="Doctor and patient"
            className="w-full max-w-md rounded-xl shadow-xl"
          />
        </motion.div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl font-bold text-blue-700 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Skin_First?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy Appointment Booking",
                desc: "Book doctor appointments in just a few clicks, anytime and anywhere.",
                icon: "📅",
              },
              {
                title: "Expert Doctors",
                desc: "Connect with certified and experienced dermatologists instantly.",
                icon: "👨‍⚕️",
              },
              {
                title: "Secure & Reliable",
                desc: "Your medical data is safe and protected with top-notch security.",
                icon: "🔒",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl font-bold text-blue-700 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            What Our Patients Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                feedback:
                  "Skin_First helped me connect with the best dermatologist in minutes. Amazing experience!",
              },
              {
                name: "James K.",
                feedback:
                  "Booking an appointment has never been easier. Highly recommend this service!",
              },
              {
                name: "Priya S.",
                feedback:
                  "The doctors are professional, and I felt secure sharing my health details here.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <p className="text-gray-600 italic mb-4">
                  "{testimonial.feedback}"
                </p>
                <h4 className="text-blue-700 font-semibold">
                  - {testimonial.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-blue-600 text-white text-center">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "500+", label: "Appointments Booked" },
            { number: "200+", label: "Certified Doctors" },
            { number: "100%", label: "Secure Data" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-4xl font-bold">{stat.number}</h3>
              <p className="text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-blue-700 text-center text-white">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Take Care of Your Skin?
        </motion.h2>
        <motion.p
          className="mb-6 text-lg text-blue-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join thousands of patients who trust Skin_First for expert care.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium shadow hover:bg-gray-100 transition"
        >
          Book an Appointment
        </motion.button>
      </section>

      <footer className="bg-white py-6 text-center text-gray-500 border-t">
        &copy; {new Date().getFullYear()} Skin_First. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
