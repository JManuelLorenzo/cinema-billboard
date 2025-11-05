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
  const totalMinutes = Number(minutes);
  if (totalMinutes < 60) {
    return `${totalMinutes}min`;
  } else {
    let hours = Math.floor(totalMinutes / 60);
    let rest = Math.floor(totalMinutes % 60);
    return `${hours}h ${rest}min`;
  }
};
