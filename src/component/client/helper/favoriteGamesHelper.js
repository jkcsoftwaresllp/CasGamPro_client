// src/helpers/favoriteGamesHelper.js

/**
 * Fetches favorite games from the backend.
 * @returns {Promise<Array>} An array of favorite game objects.
 */
export const fetchFavoriteGames = async () => {
  try {
    const response = await fetch("/user/favorite-games");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.favorites || [];
  } catch (error) {
    console.error("Failed to fetch favorite games:", error);
    return [];
  }
};
