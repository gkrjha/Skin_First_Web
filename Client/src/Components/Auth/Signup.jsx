import React, { useState } from "react";
import Doctor from "../../assets/Doctor.png";
import Logo from "../../assets/Group 91.jpg";
import { useForm } from "@tanstack/react-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const ErrorInfo = ({ field }) => (
  <>
    {field.state.meta.isTouched && !field.state.meta.isValid && (
      <em className="text-red-500 text-sm mt-1 block">
        {field.state.meta.errors.join(", ")}
      </em>
    )}
  </>
);

const Signup = () => {
  const [type, setType] = useState("password");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
      dob: "",
    },
    onSubmit: async (values) => {
      console.log("Signup Data:", values);
    },
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center gap-4 mb-6">
            <img src={Logo} alt="Logo" className="w-24 h-24 rounded-full" />
            <h1 className="text-2xl md:text-3xl font-semibold text-center text-primary">
              Create Account
            </h1>
            <p className="text-xl font-bold text-primary">Signup</p>
          </div>

          {/* Form Start */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            {/* Name */}
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Name is required";
                  if (value.length < 3)
                    return "Name must be at least 3 characters";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col">
                  <label htmlFor={field.name} className="mb-1 font-medium">
                    Name
                  </label>
                  <input
                    id={field.name}
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    placeholder="Enter your name"
                    onBlur={field.handleBlur}
                    className="p-2 border rounded-md"
                  />
                  <ErrorInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Email */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!value) return "Email is required";
                  if (!emailRegex.test(value)) return "Email must be valid";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col">
                  <label htmlFor={field.name} className="mb-1 font-medium">
                    Email
                  </label>
                  <input
                    id={field.name}
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    placeholder="Enter your email"
                    onBlur={field.handleBlur}
                    className="p-2 border rounded-md"
                  />
                  <ErrorInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Password */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Password is required";
                  if (value.length < 6) return "At least 6 characters";
                  const specialCharRegex = /[^\w\s]/;
                  if (specialCharRegex.test(value))
                    return "No special symbols allowed";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col relative">
                  <label htmlFor={field.name} className="mb-1 font-medium">
                    Password
                  </label>
                  <input
                    id={field.name}
                    type={type}
                    value={field.state.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    placeholder="Enter your password"
                    onBlur={field.handleBlur}
                    className="p-2 border rounded-md pr-10"
                  />
                  <span
                    className="absolute right-3 top-10 cursor-pointer text-gray-500"
                    onClick={() =>
                      setType((prev) =>
                        prev === "password" ? "text" : "password"
                      )
                    }
                  >
                    {type === "password" ? <FaEye /> : <FaEyeSlash />}
                  </span>
                  <ErrorInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Mobile Number */}
            <form.Field
              name="mobile"
              validators={{
                onChange: ({ value }) => {
                  const mobileRegex = /^[6-9]\d{9}$/;
                  if (!value) return "Mobile number required";
                  if (!mobileRegex.test(value))
                    return "Enter valid 10-digit Indian mobile";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col">
                  <label htmlFor={field.name} className="mb-1 font-medium">
                    Mobile Number
                  </label>
                  <input
                    id={field.name}
                    type="tel"
                    value={field.state.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    placeholder="Enter your mobile number"
                    onBlur={field.handleBlur}
                    className="p-2 border rounded-md"
                  />
                  <ErrorInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Date of Birth */}
            <form.Field
              name="dob"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Date of Birth is required";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col">
                  <label htmlFor={field.name} className="mb-1 font-medium">
                    Date of Birth
                  </label>
                  <input
                    id={field.name}
                    type="date"
                    value={field.state.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    onBlur={field.handleBlur}
                    className="p-2 border rounded-md"
                  />
                  <ErrorInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Submit Button */}
            <button
              type="submit"
              className="text-lg font-semibold w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition"
            >
              Signup
            </button>
          </form>

          {/* Already have an account */}
          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <span className="text-primary font-semibold cursor-pointer">
              Login
            </span>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-full md:w-1/2">
        <img src={Doctor} alt="Doctor" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Signup;
