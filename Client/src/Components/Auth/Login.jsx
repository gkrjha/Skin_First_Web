import React, { useState } from "react";
import Doctor from "../../assets/Doctor.png";
import Logo from "../../assets/Group 91.jpg";
import { useNavigate } from "react-router";
import { useForm } from "@tanstack/react-form";
import { FaApple, FaEye, FaEyeSlash, FaFacebookF, FaGoogle } from "react-icons/fa6";
import SplashScreen from "../SplashScreen";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);
  const [splash, setSplash] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        console.log("Login data:", value);
        const res = await axios.post(
          "http://localhost:3000/auth/login",
          value,
          { withCredentials: true }
        );

        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        if(res.data.user.role === "admin") {
          navigate("/admin/dashboard");
        }
        else if(res.data.user.role === "doctor") {
          navigate("/doctor/dashboard");
        }
        // navigate("/dashboard");
      } catch (err) {
        console.error("Login failed:", err);
        alert(err.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen">
      <button
        onClick={() => setSplash((prev) => !prev)}
        className={`absolute z-50 text-2xl top-4 right-4 font-bold ${
          splash ? "text-primary" : "text-secondary"
        }`}
      >
        {splash ? "Hide Splash" : "Show Splash"}
      </button>

      {splash ? (
        <SplashScreen onClick={() => setSplash(false)} />
      ) : (
        <>
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md shadow-md p-9 rounded-lg">
              <div className="flex flex-col items-center gap-4 mb-6">
                <img src={Logo} alt="Logo" className="w-24 h-24 rounded-full" />
                <h1 className="text-2xl md:text-3xl font-semibold text-center text-primary">
                  Welcome back!
                </h1>
                <p className="text-xl font-bold text-primary">Login</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                className="space-y-5"
              >
                {form.Field({
                  name: "email",
                  validators: {
                    onChange: ({ value }) => {
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!value) return "Email is required";
                      if (!emailRegex.test(value)) return "Invalid email";
                      return undefined;
                    },
                  },
                  children: (field) => (
                    <div className="flex flex-col">
                      <label htmlFor={field.name} className="mb-1 font-medium">
                        Email
                      </label>
                      <input
                        id={field.name}
                        type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your email"
                        onBlur={field.handleBlur}
                        className="p-2 border rounded-md"
                      />
                      <ErrorInfo field={field} />
                    </div>
                  ),
                })}

                {form.Field({
                  name: "password",
                  validators: {
                    onChange: ({ value }) => {
                      if (!value) return "Password is required";
                      if (value.length < 6)
                        return "At least 6 characters required";
                      const specialCharRegex = /[^\w\s]/;
                      if (specialCharRegex.test(value))
                        return "No special symbols allowed";
                      return undefined;
                    },
                  },
                  children: (field) => (
                    <div className="flex flex-col relative">
                      <label htmlFor={field.name} className="mb-1 font-medium">
                        Password
                      </label>
                      <input
                        id={field.name}
                        type={type}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
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
                      <div
                        className="flex justify-end mt-1"
                        onClick={() => navigate("/set-password")}
                      >
                        <span className="text-sm text-blue-500 cursor-pointer">
                          Forgot password?
                        </span>
                      </div>
                    </div>
                  ),
                })}

                <button
                  type="submit"
                  disabled={loading}
                  className={`text-lg font-semibold w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>

          <div className="hidden md:block w-full md:w-1/2">
            <img
              src={Doctor}
              alt="Doctor"
              className="w-full h-full object-cover"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
