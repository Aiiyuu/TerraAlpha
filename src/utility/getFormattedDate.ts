/**
 * Returns a human-readable time difference from the current date to the provided date.
 * For example, "36 minutes ago", "2 hours ago", or "5 days ago".
 *
 * @param {Date} dateInput - The date to compare against the current date.
 * @returns {string} A human-readable string representing the time difference.
 */
export function timeAgo(dateInput: string): string {
  const now = new Date();
  const date = new Date(dateInput);
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

  if (secondsAgo < 60) {
    return `${secondsAgo} секунд${secondsAgo === 1 ? '' : 's'} тому`;
  } else if (minutesAgo < 60) {
    return `${minutesAgo} хвилин${minutesAgo === 1 ? '' : 's'} тому`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} годин${hoursAgo === 1 ? '' : 's'} тому`;
  } else {
    return `${daysAgo} днів${daysAgo === 1 ? '' : 's'} тому`;
  }
}