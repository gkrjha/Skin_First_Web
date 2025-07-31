import React, { useState } from "react";
import Doctor from "../../assets/Doctor.png";
import Logo from "../../assets/Group 91.jpg";
import { useForm } from "@tanstack/react-form";
import {
  FaApple,
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
} from "react-icons/fa6";

const ErrorInfo = ({ field }) => (
  <>
    {field.state.meta.isTouched && !field.state.meta.isValid && (
      <em className="text-red-500 text-sm mt-1 block">
        {field.state.meta.errors.join(", ")}
      </em>
    )}
    {field.state.meta.isValidating && <span>Validating...</span>}
  </>
);

const Login = () => {
  const [type, setType] = useState("password");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
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
              Welcome back!
            </h1>
            <p className="text-xl font-bold text-primary">Login</p>
          </div>

          {/* Form Starts */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            {/* Email Field */}
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

            {/* Password Field */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Password is required";
                  if (value.length < 6)
                    return "Password must be at least 6 characters";
                  const specialCharRegex = /[^\w\s]/;
                  if (specialCharRegex.test(value))
                    return "Password must not contain special symbols";
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
                  <div className="flex justify-end mt-1">
                    <span className="text-sm text-blue-500 cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                </div>
              )}
            </form.Field>

            {/* Login Button */}
            <button
              type="submit"
              className="text-lg font-semibold w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition"
            >
              Login
            </button>
          </form>

          {/* Social Login */}
          <div className="flex flex-col mt-6 items-center">
            <h1 className="text-sm mb-2">Or login with</h1>
            <div className="flex justify-center gap-4">
              <span className="bg-secondary p-3 rounded-full cursor-pointer">
                <FaGoogle className="text-primary text-lg" />
              </span>
              <span className="bg-secondary p-3 rounded-full cursor-pointer">
                <FaFacebookF className="text-primary text-lg" />
              </span>
              <span className="bg-secondary p-3 rounded-full cursor-pointer">
                <FaApple className="text-primary text-lg" />
              </span>
            </div>
            <p className="text-sm mt-4">
              Don’t have an account?{" "}
              <span className="text-primary font-semibold cursor-pointer">
                Signup
              </span>
            </p>
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

export default Login;
