import { apiCall } from "../../../common/apiCall";

export const getLedgerData = async () => {
  const response = await apiCall("/auth-api/client/ledger", "GET");
  console.log(response);
  if (response) {
    const { uniqueCode } = response;

    if (uniqueCode === "CGP0085") {
      console.log(response.data);
      return response.data;
    }
  } else {
    return [];
  }

  
};
