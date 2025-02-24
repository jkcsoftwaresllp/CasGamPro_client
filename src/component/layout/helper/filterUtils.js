export const filterDataBySearch = (data, searchQuery) => {
  if (!searchQuery.trim()) return data; // Return full data if search is empty

  const lowerCaseQuery = searchQuery.toLowerCase();

  return data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value && value.toString().toLowerCase().includes(lowerCaseQuery) // Case-insensitive search
    )
  );
};
