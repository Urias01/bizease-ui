import { api } from "@/lib/axios";

export interface ProductRequest {
  name: string;
  unit: number;
  minimumStock: number;
  categoryUuid: string;
  description: string;
}

export async function createProduct({
  name,
  unit,
  minimumStock,
  categoryUuid,
  description,
}: ProductRequest) {
  await api.post("/products", {
    name,
    unit,
    minimumStock,
    categoryUuid,
    description,
  });
}
