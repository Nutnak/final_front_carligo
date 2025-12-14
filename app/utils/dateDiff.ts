export function diffInDays(startDate: string | null, endDate: string | null) {
  if (!startDate || !endDate) return 0;

  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  const diffMs = endTime - startTime;

  if (diffMs <= 0) return 0;

  const oneDayMs = 1000 * 60 * 60 * 24;
  return Math.ceil(diffMs / oneDayMs);
}
