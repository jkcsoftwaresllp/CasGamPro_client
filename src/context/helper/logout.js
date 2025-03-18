import { apiCall } from "../../component/common/apiCall";
import { getToastTypes, showToast } from "../../component/common/showToast";

export const logout = async (setUser, navigate) => {
  try {
    await apiCall("/auth-api/logout", "POST");

    setUser(null); // Clear user data
    showToast(getToastTypes.type1, "You have successfully logged out.");
    navigate("/");
  } catch (error) {
    showToast(getToastTypes.type4, error.response?.data || error.message);
    console.error("Logout failed:", error.response?.data || error.message);
  }
};
