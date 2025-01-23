export const fetchLedgerData = async () => {
  try {
    const response = await fetch("/api/client/ledger");
    if (!response.ok) {
      throw new Error("Failed to fetch ledger data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ledger data:", error);
    return []; // Return an empty array in case of error
  }
};
