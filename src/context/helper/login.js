import { apiCall } from "../../component/common/apiCall";
import { getToastTypes, showToast } from "../../component/common/showToast";
import { blockLevels } from "../../utils/blockLevers";

export const login = async (setUser, credentials) => {
  try {
    const successCodes = ["CGP0046"];
    const response = await apiCall("/api/login", "POST", credentials);

    console.log("Login response:", response);

    if (response.uniqueCode === "CGP00U09") {
      showToast(
        getToastTypes.type4,
        "Your account is blocked. Please contact Agent"
      );
    }

    if (successCodes.includes(response.uniqueCode)) {
      if (response.data.blockingLevel === blockLevels[1]) {
        showToast(
          getToastTypes.type4,
          "Your account is blocked. Please contact Agent"
        );
      } else if (response.uniqueCode === "CGP0046") {
        // Save user data from the response
        setUser({
          status: response.data.status,
          userId: response.data.userId,
          username: response.data.username,
          profilePic: response.data.profilePic,
          userRole: response.data.userRole,
          clientName: response.data.clientName,
          blockingLevel: response.data.blockingLevel,
        });
        showToast(getToastTypes.type1, response.message);
      }
    }
  } catch (error) {
    showToast(getToastTypes.type4, error.message || "Failed to login");
  }
};
