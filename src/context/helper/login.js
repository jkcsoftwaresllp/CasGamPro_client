import { apiCall } from "../../component/common/apiCall";

export const login = async (setUser, credentials) => {
  try {
    const response = await apiCall("/api/login", "POST", credentials);
    // Save user data from the response

    setUser({
      status: response.data.status,
      userId: response.data.userId,
      username: response.data.username,
      profilePic: response.data.profilePic,
      userRole: response.data.userRole,
    });
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
  }
};
