import axios from "axios";

export const logoutUser = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Token frontend se bhi hata do
      localStorage.removeItem("token");

      // Redirect to login page
      window.location.href = "/login-user";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  } else {
    console.warn("No token found in localStorage");
  }
};
