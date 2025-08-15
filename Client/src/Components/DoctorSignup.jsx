import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  specialization: "",
  experience: "",
  focus: "",
  rating: "",
  profileImage: null,
  licence: null,
  signatureImage: null,
  documents: [],
  clinicImages: [],
  certificateImages: [],
  gender: "",
  dob: "",
  profile: "",
  careerPath: "",
  highlight: "",
};

const validationSchema = Yup.object({
  name: Yup.string().max(15).min(3).required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be a valid 10-digit phone number")
    .required("Required"),
  specialization: Yup.string().required("Required"),
  experience: Yup.string().required("Required"),
});

const DoctorSignup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [tokenValid, setTokenValid] = useState(null);
  const token = new URLSearchParams(location.search).get("token");

  
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/doctor/verify-token?token=${token}`
        );
        if (res.data.valid) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
          setErrorMessage("Link expired or invalid.");
        }
      } catch (err) {
        setTokenValid(false);
        setErrorMessage(
          err.response?.data?.message || "Link expired or invalid."
        );
      }
    };

    if (!token) {
      setTokenValid(false);
      setErrorMessage("No token provided. Link expired.");
    } else {
      checkToken();
    }
  }, [token]);

  const handleSubmit = async (values) => {
    setErrorMessage("");

    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (
          ![
            "documents",
            "clinicImages",
            "certificateImages",
            "profileImage",
            "licence",
            "signatureImage",
          ].includes(key)
        ) {
          formData.append(key, values[key] ?? "");
        }
      });

      if (values.profileImage)
        formData.append("profileImage", values.profileImage);
      if (values.licence) formData.append("licence", values.licence);
      if (values.signatureImage)
        formData.append("signatureImage", values.signatureImage);

      values.documents.forEach((file) => formData.append("documents", file));
      values.clinicImages.forEach((file) =>
        formData.append("clinicImages", file)
      );
      values.certificateImages.forEach((file) =>
        formData.append("certificateImages", file)
      );

      const res = await axios.post(
        `http://localhost:3000/doctor/register?token=${token}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Registration successful!");
      console.log(res.data);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Something went wrong!");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const renderInput = (
    label,
    name,
    type = "text",
    isTextArea = false,
    multiple = false
  ) => (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label}</label>
      {type === "file" ? (
        <input
          type="file"
          name={name}
          multiple={multiple}
          onChange={(e) => {
            const files = e.currentTarget.files;
            formik.setFieldValue(name, multiple ? Array.from(files) : files[0]);
          }}
          onBlur={formik.handleBlur}
          className="p-2 border rounded-lg focus:ring focus:ring-blue-200"
        />
      ) : isTextArea ? (
        <textarea
          name={name}
          className="p-2 border rounded-lg focus:ring focus:ring-blue-200"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
        />
      ) : (
        <input
          type={type}
          name={name}
          className="p-2 border rounded-lg focus:ring focus:ring-blue-200"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
        />
      )}
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm">{formik.errors[name]}</p>
      )}
    </div>
  );

 
  if (tokenValid === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Checking link...</p>
      </div>
    );
  }


  if (!tokenValid) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">{errorMessage}</p>
      </div>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Doctor Registration
        </h1>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {renderInput("Name", "name")}
          {renderInput("Email", "email", "email")}
          {renderInput("Password", "password", "password")}
          {renderInput("Phone", "phone")}
          {renderInput("Specialization", "specialization")}
          {renderInput("Focus", "focus")}
          {renderInput("Experience", "experience", "number")}
          {renderInput("Rating", "rating", "number")}
          {renderInput("Profile Image", "profileImage", "file")}
          {renderInput("Licence", "licence", "file")}
          {renderInput("Signature Image", "signatureImage", "file")}
          {renderInput("Documents", "documents", "file", false, true)}
          {renderInput("Clinic Images", "clinicImages", "file", false, true)}
          {renderInput(
            "Certificate Images",
            "certificateImages",
            "file",
            false,
            true
          )}
          {renderInput("Gender", "gender")}
          {renderInput("Date of Birth", "dob", "date")}
          {renderInput("Profile", "profile", "text", true)}
          {renderInput("Career Path", "careerPath")}
          {renderInput("Highlight", "highlight")}

          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorSignup;
