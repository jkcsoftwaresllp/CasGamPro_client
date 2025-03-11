import { apiCall } from "../../component/common/apiCall";
import { getToastTypes, showToast } from "../../component/common/showToast";
import { blockLevels } from "../../utils/blockLevers";

export const checkSession = async (setUser, setLoading) => {
  try {
    const response = await apiCall("/auth-api/checkSession", "GET");
    console.log("Check session response:", response);

    if (response.data.blockingLevel === blockLevels[1]) {
      showToast(
        getToastTypes.type4,
        "Your account is blocked. Please contact Agent"
      );
    }

    setUser({
      status: response.data.status,
      userId: response.data.userId,
      username: response.data.username,
      profilePic: response.data.profilePic,
      userRole: response.data.userRole,
      clientName: response.data.clientName,
      blockingLevel: response.data.blockingLevel,
    });
  } catch {
    console.error("Failed to check session");
    setUser(null);
  } finally {
    setLoading(false);
  }
};
