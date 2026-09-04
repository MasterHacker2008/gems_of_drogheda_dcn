export function daysUntil(targetIso?: string) {
  if (!targetIso) return null;
  const target = new Date(targetIso);
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.ceil((target.getTime() - now.getTime()) / msPerDay);
  return { days, target };
}
