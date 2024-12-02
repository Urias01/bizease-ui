import { api } from "@/lib/axios";

export interface ProductRequest {
  name: string;
  unit: number;
  minimumStock: number;
  location: string;
  categoryUuid: string;
  description: string;
}

export async function createProduct({
  name,
  unit,
  minimumStock,
  location,
  categoryUuid,
  description,
}: ProductRequest) {
  await api.post("/products", {
    name,
    unit,
    minimumStock,
    location,
    categoryUuid,
    description,
  });
}
