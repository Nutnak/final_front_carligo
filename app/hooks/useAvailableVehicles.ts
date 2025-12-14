// useAvailableVehicles.ts
import { useQuery } from '@tanstack/react-query';
import { Vehicle } from '../types/vehicles';

type VehiclesResponse = { data: Vehicle[] };

export function useAvailableVehicles(params: { startDate: string; endDate: string } | null) {
  return useQuery<VehiclesResponse>({
    queryKey: ['available-vehicles', params],
    queryFn: async () => {
      if (!params) return { data: [] };
      const res = await fetch('http://localhost:3000/api/vehicles/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start_date: params.startDate,
          end_date: params.endDate,
        }),
      });
      if (!res.ok) {
        throw new Error('Erreur lors du chargement des véhicules disponibles');
      }
      return res.json();
    },
    enabled: !!params,
  });
}
