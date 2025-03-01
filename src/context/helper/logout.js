import { apiCall } from "../../component/common/apiCall";

export const logout = async (setUser, navigate) => {
  try {
    await apiCall("/api/logout", "POST");

    setUser(null); // Clear user data
    navigate('/')

  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
  }
};
