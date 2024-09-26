import { api } from "@/lib/axios";

export interface ProductRequest {
  name: string;
  unit: number;
  minimumStock: number;
  categoryId: string;
  description: string;
}

export async function createProduct({
  name,
  unit,
  minimumStock,
  categoryId,
  description,
}: ProductRequest) {
  await api.post("/products", {
    name,
    unit,
    minimumStock,
    categoryId,
    description,
  });
}
