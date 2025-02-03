import Swal from "sweetalert2";

// Function to show Swal confirmation with custom theme
export const showUnblockUserSwal = async (username) => {
  return Swal.fire({
    title: "Unblock User?",
    text: `Do you want to unblock user ${username}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Unblock",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "custom-swal-popup",
      title: "custom-swal-title",
      confirmButton: "custom-swal-confirm",
      cancelButton: "custom-swal-cancel",
    },
  });
};
