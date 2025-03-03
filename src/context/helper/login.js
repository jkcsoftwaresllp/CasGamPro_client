import { apiCall } from "../../component/common/apiCall";
import { getToastTypes, showToast } from "../../component/common/showToast";

export const login = async (setUser, credentials) => {
  try {
    const successCodes = ["CGP00U05", "CGP00U11", "CGP00U10"];
    const response = await apiCall("/api/login", "POST", credentials);

    if (successCodes.includes(response.uniqueCode)) {
      // Save user data from the response
      setUser({
        status: response.data.status,
        userId: response.data.userId,
        username: response.data.username,
        profilePic: response.data.profilePic,
        userRole: response.data.userRole,
        clientName: response.data.clientName,
      });
      showToast(getToastTypes.type1, response.message);
    }
  } catch (error) {
    showToast(getToastTypes.type4, error.message || "Failed to login");
  }
};
