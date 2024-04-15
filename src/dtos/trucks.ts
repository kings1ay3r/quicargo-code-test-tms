export type Truck = {};
export type CreateTruckRequest = {
  licensePlate: string;
  name: string;
  make: string;
  brand: string;
  model: string;
  year: number;
  capacity: number;
};

export type UpdateTruckRequest = {
  licensePlate: string;
  name?: string;
  make?: string;
  brand?: string;
  model?: string;
  year?: number;
  capacity?: number;
};
