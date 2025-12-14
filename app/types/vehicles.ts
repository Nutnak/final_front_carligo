export type Reservation = {
  id: number;
  from: string; // ISO date string
  to: string;   // ISO date string
  vehicle_id: number;
};

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  price_per_day: number;
  reservations?: Reservation[];
}

export interface VehicleResponse {
  vehicles: Vehicle;
}