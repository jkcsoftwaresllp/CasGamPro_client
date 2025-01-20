export const login = async (setUser, credentials) => {
  try {
    const response = await apiCall("/api/login", "POST", credentials);
    // Save user data from the response
    setUser({
      userID: response.data.userID,
      name: response.data.name,
      profilePic: response.data.profilePic,
      role: response.data.role,
    });
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
  }
};
