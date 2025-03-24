import Swal from "sweetalert2";
import { apiCall } from "../../../../common/apiCall";

export const handleTransaction = async (type, row) => {
  const result = await Swal.fire({
    title: `${type} for ${row.id}`,
    input: "number",
    inputPlaceholder: `Enter ${type.toLowerCase()} amount`,
    showCancelButton: true,
    confirmButtonText: "Submit",
    inputAttributes: {
      min: "0.01", // Prevents negative values
      step: "0.01", // Allows decimals for precise amounts
    },
    preConfirm: (value_1) => {
      const amount = Number(value_1);
      if (!value_1 || isNaN(amount) || amount <= 0) {
        Swal.showValidationMessage(
          "Please enter a valid amount greater than 0"
        );
        return false;
      }
      return amount;
    },
    customClass: {
      popup: "custom-swal-popup",
      title: "custom-swal-title",
      confirmButton: "custom-swal-confirm",
      cancelButton: "custom-swal-cancel",
    },
  });
  if (result.isConfirmed) {
    const amount_1 = result.value;
    try {
      const response = await apiCall(
        "/auth-api/panel/walletTransaction",
        "POST",
        {
          userId: row.id,
          type: type.toLowerCase(),
          amount: amount_1,
          note: `${type} transaction`,
        }
      );

      if (response && response.uniqueCode === "CGP0062") {
        console.log("API Response: ", response);
        Swal.fire({
          title: "Success",
          text: `${type} of ${amount_1} completed successfully!`,
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm",
          },
        });
      } else {
        console.error("API Error:", response.data);
        Swal.fire({
          title: "Error",
          text: "Transaction failed. Please try again.",
          icon: "error",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm",
          },
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm",
        },
      });
    }
  }
};
