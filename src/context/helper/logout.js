import { apiCall } from "../../component/common/apiCall";

export const logout = async (setUser) => {
  try {
    await apiCall("/api/logout", "POST");
    setUser(null); // Clear user data
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
  }
};
