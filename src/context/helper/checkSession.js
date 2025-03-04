import { apiCall } from "../../component/common/apiCall";

export const checkSession = async (setUser, setLoading) => {
  try {
    const response = await apiCall("/auth-api/checkSession", "GET");
    setUser({
      status: response.data.status,
      userId: response.data.userId,
      username: response.data.username,
      profilePic: response.data.profilePic,
      userRole: response.data.userRole,
      clientName: response.data.clientName,
    });
  } catch {
    setUser(null);
  } finally {
    setLoading(false);
  }
};
