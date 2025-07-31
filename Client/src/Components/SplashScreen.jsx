import React from "react";
import splashImage from "../assets/Group 91.jpg";
const SplashScreen = () => {
  return (
    <div className="bg-gradient-to-r from-black to-[#0072ff] text-white h-[100vh] flex justify-center items-center text-[4rem]">
      <div className="flex flex-col items-center justify-center">
        <img
          src={splashImage}
          alt="Splash"
          style={{ width: "200px", height: "auto" }}
          className="rounded-full"
        />
        <p className="font-extrabold">Skin First</p>
      </div>
    </div>
  );
};

const styles = {
  splash: {
    color: "white",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
  },
};

export default SplashScreen;
