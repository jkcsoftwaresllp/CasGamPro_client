// Helper function to check authentication status
export const checkAuthStatus = async (allowedRoles, setUser) => {
  try {
    const response = await apiCall("/api/auth/status", "GET");

    if (
      response?.status === "success" &&
      allowedRoles.includes(response.user?.role)
    ) {
      setUser({ role: response.user.role, userId: response.user.userId });
      localStorage.setItem("userRole", response.user.role);
      return { loading: false, authorized: true };
    } else {
      return { loading: false, authorized: false };
    }
  } catch (err) {
    console.error("Error checking authentication:", err);
    return { loading: false, authorized: false };
  }
};
