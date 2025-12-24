import { create } from 'zustand';

// Définir le type pour un supplément individuel
type Supplement = {
  id: number;
  name: string;
  price: number;
  // Ajoutez d'autres champs si nécessaire
};

type BookingState = {
  start: string | null;
  end: string | null;
  selectedSupplements: Supplement[];
  setDates: (start: string, end: string) => void;
  setSupplements: (supplements: Supplement[]) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  start: null,
  end: null,
  selectedSupplements: [],
  setDates: (start, end) => set({ start, end }),
  setSupplements: (supplements) => set({ selectedSupplements: supplements }),
}));
