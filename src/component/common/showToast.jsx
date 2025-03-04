import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getToastTypes = {
  type1: "success",
  type2: "info",
  type3: "warning",
  type4: "error",
};

export const showToast = (type, message) => {
  const toastOptions = {
    className: "custom-toast", // Custom class for styling
  };

  if (type === getToastTypes.type1) {
    toast.success(message, toastOptions);
  } else if (type === getToastTypes.type2) {
    toast.info(message, toastOptions);
  } else if (type === getToastTypes.type3) {
    toast.warn(message, toastOptions);
  } else if (type === getToastTypes.type4) {
    toast.error(message, toastOptions);
  }
};
