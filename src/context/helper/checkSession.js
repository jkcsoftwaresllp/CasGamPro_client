import { apiCall } from "../../component/common/apiCall";

export const checkSession = async (setUser, setLoading) => {
  try {
    const response = await apiCall("/api/checkSession", "GET");
    setUser({
      userID: response.data.userID,
      name: response.data.name,
      profilePic: response.data.profilePic,
      role: response.data.role,
    });
  } catch {
    setUser(null);
  } finally {
    setLoading(false);
  }
};
