import "./App.css";
import Layouts from "./Layouts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SplashScreen from "./Components/SplashScreen";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import SetPassword from "./Components/SetPassword";
import WebDoctorSchedule from "./Components/UserProfile";
import DoctorList from "./Components/DoctorsList";
import DoctorInfo from "./Components/DoctorInfo";
import RatingList from "./Components/RatingList";
import FavoriteDoctors from "./Components/FavoriteDoctors";
import ProfilePage from "./Profile";
import EditProfile from "./Components/UpdateProfile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        path: "/",
        element: <div>Home Page</div>,
      },
      {
        path: "/login-user",
        element: <Login />,
      },
      {
        path: "/signup-user",
        element: <Signup />,
      },
      {
        path: "/set-password",
        element: <SetPassword />,
      },
      {
        path: "/doctor-schedule",
        element: <WebDoctorSchedule />,
      },
      {
        path: "/doctor-list",
        element: <DoctorList />,
      },
      {
        path: "/doctor/:id",
        element: <DoctorInfo />,
      },
      {
        path: "/doctor-rating",
        element: <RatingList />,
      },
      {
        path: "/doctor-favorites",
        element: <FavoriteDoctors />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
    ],
  },
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  // loading ? <SplashScreen /> :
  return loading ? <SplashScreen /> : <RouterProvider router={router} />;
}

export default App;
