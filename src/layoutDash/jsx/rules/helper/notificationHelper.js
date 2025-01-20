export const fetchNotifications = async () => {
  try {
    const response = await fetch("/user/notifications");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.notifications || [];
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return [];
  }
};

// code to see output--->

// export const fetchNotifications = async () => {
//   try {
//     // Simulating an API delay using setTimeout
//     return await new Promise((resolve) => {
//       setTimeout(() => {
//         resolve([
//           "Server maintenance at 2 AM",
//           "New game added: Lucky 7-B",
//           "Don't miss the weekly jackpot draw!",
//         ]);
//       }, 1000); // Simulates a 1-second delay
//     });
//   } catch (error) {
//     console.error("Failed to fetch notifications:", error);
//     return [];
//   }
// };
