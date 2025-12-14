import { Reservation } from '../types/vehicles';

export async function fetchBookingsForVehicle(vehicleId: number): Promise<Reservation[]> {
  const res = await fetch(`http://localhost:3000/api/booking/${vehicleId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!res.ok) {
    throw new Error('Erreur lors du chargement des réservations pour le véhicule');
  }

  return res.json();
}
