export default function generateTimeSlots(date: Date | undefined): string[] {
  if (!date) return [];

  const slots: string[] = [];
  const now = new Date();
  const minDateTime = new Date(now.getTime() + 12 * 60 * 60 * 1000); // maintenant + 12h

  const base = new Date(date);
  base.setHours(0, 0, 0, 0);

  for (let hour = 0; hour < 24; hour++) {
    for (let minutes of [0, 30]) {
      const slot = new Date(base);
      slot.setHours(hour, minutes, 0, 0);

      // si c'est aujourd'hui, on ne garde que les slots >= now + 12h
      if (slot < minDateTime && slot > now) continue;

      const h = String(hour).padStart(2, '0');
      const m = String(minutes).padStart(2, '0');
      slots.push(`${h}:${m}`);
    }
  }

  return slots;
}