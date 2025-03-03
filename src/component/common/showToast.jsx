import { toast } from "react-toastify";

export const getToastTypes = {
  type1: "success",
  type2: "info",
  type3: "warning",
  type4: "error",
};

export const showToast = (type, message) => {
  if (type === getToastTypes.type1) {
    toast.success(message);
  } else if (type === getToastTypes.type2) {
    toast.info(message);
  } else if (type === getToastTypes.type3) {
    toast.warn(message);
  } else if (type === getToastTypes.type4) {
    toast.error(message);
  }
};
