export function getEndDate(duration: number) {
  return new Date(Date.now() + duration).toISOString();
}
