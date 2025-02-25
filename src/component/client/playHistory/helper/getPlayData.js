import { apiCall } from "../../../common/apiCall";

export const getPlayData = async () => {
  const response = await apiCall("/auth-api/client/playHistory", "GET");
  console.log(response);
  if (response) {
    const { uniqueCode } = response;

    if (uniqueCode === "CGP0034") {
      console.log(response.data);
    }
  } else {
    console.log(response);
  }
};
