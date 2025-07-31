import React, { useState } from "react";
import Doctor from ".././assets/Doctor.png";
import Logo from ".././assets/Group 91.jpg";
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

const ResetPasswordColumn = () => {
  const [type, setType] = useState("password");
  const [confirmType, setConfirmType] = useState("password");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [email, setEmail] = useState("");

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      console.log("New Password Set:", values.password);
      alert("Password Set Successfully!");
    },
  });

  const handleGetOtp = () => {
    if (!email) return alert("Please enter email");
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otpInput === "1234") {
      setOtpVerified(true);
    } else {
      alert("Invalid OTP. Try 1234.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen sm:mt-[100px] md:m-0">
      {/* Left Side - Form Column */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center gap-4 mb-6">
            <img src={Logo} alt="Logo" className="w-24 h-24 rounded-full" />
            <h1 className="text-2xl md:text-3xl font-semibold text-center text-primary">
              Reset Password
            </h1>
            <p className="text-xl font-bold text-primary text-center">
              Reset in 3 Steps
            </p>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="p-2 border rounded-md w-full"
              />
              {!otpSent && (
                <button
                  onClick={handleGetOtp}
                  className="text-lg font-semibold w-full bg-primary text-white py-2 rounded-md mt-2 hover:bg-opacity-90 transition"
                >
                  Get OTP
                </button>
              )}
            </div>

            {/* OTP */}
            {otpSent && !otpVerified && (
              <div className="flex flex-col">
                <label htmlFor="otp" className="font-medium">
                  OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="Enter OTP"
                  className="p-2 border rounded-md w-full"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="text-lg font-semibold w-full bg-primary text-white py-2 rounded-md mt-2 hover:bg-opacity-90 transition"
                >
                  Verify OTP
                </button>
              </div>
            )}

            {/* Set Password */}
            {otpVerified && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                className="space-y-4"
              >
                {/* Password */}
                <form.Field
                  name="password"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) return "Password is required";
                      if (value.length < 6) return "Min 6 characters";
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
                        New Password
                      </label>
                      <input
                        id={field.name}
                        type={type}
                        value={field.state.value}
                        onChange={(e) => field.setValue(e.target.value)}
                        placeholder="Enter new password"
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

                {/* Confirm Password */}
                <form.Field
                  name="confirmPassword"
                  validators={{
                    onChange: ({ value, form }) => {
                      if (!value) return "Please confirm password";
                      if (value !== form.getFieldValue("password"))
                        return "Passwords do not match";
                      return undefined;
                    },
                  }}
                >
                  {(field) => (
                    <div className="flex flex-col relative">
                      <label htmlFor={field.name} className="mb-1 font-medium">
                        Confirm Password
                      </label>
                      <input
                        id={field.name}
                        type={confirmType}
                        value={field.state.value}
                        onChange={(e) => field.setValue(e.target.value)}
                        placeholder="Confirm password"
                        onBlur={field.handleBlur}
                        className="p-2 border rounded-md pr-10"
                      />
                      <span
                        className="absolute right-3 top-10 cursor-pointer text-gray-500"
                        onClick={() =>
                          setConfirmType((prev) =>
                            prev === "password" ? "text" : "password"
                          )
                        }
                      >
                        {confirmType === "password" ? (
                          <FaEye />
                        ) : (
                          <FaEyeSlash />
                        )}
                      </span>
                      <ErrorInfo field={field} />
                    </div>
                  )}
                </form.Field>

                <button
                  type="submit"
                  className="text-lg font-semibold w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition"
                >
                  Set Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-full md:w-1/2">
        <img src={Doctor} alt="Doctor" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ResetPasswordColumn;
