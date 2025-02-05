import Swal from "sweetalert2";

export const handleTransaction = (type, row) => {
  return Swal.fire({
    title: `${type} for ${row.id}`,
    input: "number",
    inputPlaceholder: `Enter ${type.toLowerCase()} amount`,
    showCancelButton: true,
    confirmButtonText: "Submit",
    inputAttributes: {
      min: "0.01", // Prevents negative values
      step: "0.01", // Allows decimals for precise amounts
    },
    preConfirm: (value) => {
      const amount = Number(value);
      if (!value || isNaN(amount) || amount <= 0) {
        Swal.showValidationMessage(
          "Please enter a valid amount greater than 0"
        );
      }
    },
    customClass: {
      popup: "custom-swal-popup",
      title: "custom-swal-title",
      confirmButton: "custom-swal-confirm",
      cancelButton: "custom-swal-cancel",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(`${type} of ${result.value} for client ${row.id}`);
      Swal.fire({
        title: "Success",
        text: `${type} of ${result.value} completed successfully!`,
        icon: "success",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm",
        },
      });
    }
  });
};
