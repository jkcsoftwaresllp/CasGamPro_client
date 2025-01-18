export const fetchWalletPoints = async () => {
  try {
    const response = await fetch("/user/wallet"); // API endpoint to fetch wallet points
    if (!response.ok) {
      throw new Error("Failed to fetch wallet points");
    }
    const data = await response.json();

    // Expected response structure: { "walletPoints": 5000 }
    return {
      walletPoints: data.walletPoints || "Error : Unable to fetch", // Fallback to 0 if no data
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
