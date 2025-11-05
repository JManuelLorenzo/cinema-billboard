/**
 * Converts a rating (0-10) to stars (1-5)
 * @param {number} rating - Movie rating from 0 to 10
 * @returns {string} - Star emoji string
 */
export const getRatingStars = (rating) => {
  let stars = 0;

  if (rating >= 0 && rating < 2) {
    stars = 1;
  } else if (rating >= 2 && rating < 4) {
    stars = 2;
  } else if (rating >= 4 && rating < 6) {
    stars = 3;
  } else if (rating >= 6 && rating < 8) {
    stars = 4;
  } else if (rating >= 8 && rating <= 10) {
    stars = 5;
  }

  return "⭐".repeat(stars);
};

/**
 * Converts a time of a film of minutes to hours and minutes.
 * @param {number} minutes - Movie time duration.
 * @returns {string} - Star emoji string.
 */
export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes}min`;
  } else {
    let hours = minutes / 60;
    let minutes = minutes % 60;
    return `${hours}h ${minutes}min`;
  }
};
