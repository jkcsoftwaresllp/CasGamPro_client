export const logout = async () => {
  try {
    await apiCall("/api/logout", "POST");
    setUser(null); // Clear user data
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
  }
};
