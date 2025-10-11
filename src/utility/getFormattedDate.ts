/**
 * Formats a date input into a string with format 'HH:MM'.
 *
 * @param dateInput - A Date object or a string/number that can be parsed into a Date.
 * @returns A string representing the time in 'HH:MM' 24-hour format.
 *
 * @example
 * formatTime('2025-10-11T12:50:00Z') // '12:50'
 * formatTime(new Date()) // '09:30' (depending on current time)
 */
export function formatTime(dateInput: Date | string | number): string {
  const date = new Date(dateInput);

  const hours: string = date.getHours().toString().padStart(2, '0');
  const minutes: string = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}
