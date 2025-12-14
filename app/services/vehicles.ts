
import { Vehicle } from "../types/vehicles";

export interface GetAvailableVehiclesParams {
  startDate: string; // ISO string
  endDate: string;   // ISO string
}

export async function fetchAvailableVehicles({
  startDate,
  endDate,
}: GetAvailableVehiclesParams): Promise<Vehicle[]> {
  const res = await fetch('http://localhost:3000/api/vehicles/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      start_date: startDate,
      end_date: endDate,
    }),
  });

  if (!res.ok) {
    throw new Error('Erreur lors du chargement des véhicules disponibles');
  }

  return res.json();
}
