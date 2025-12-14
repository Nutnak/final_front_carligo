// src/app/store/bookingStore.ts
import { create } from 'zustand';

type BookingState = {
  start: string | null;
  end: string | null;
  setDates: (start: string, end: string) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  start: null,
  end: null,
  setDates: (start, end) => set({ start, end }),
}));
