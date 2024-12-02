import { api } from "@/lib/axios";

export interface UpdateProductRequest {
  uuid: string;
  name: string;
  unit: number;
  location: string;
  minimumStock: number;
  categoryUuid: string;
  description: string;
}

export async function updateProduct({
  uuid,
  name,
  unit,
  location,
  minimumStock,
  categoryUuid,
  description,
}: UpdateProductRequest) {
  await api.put(`/products/${uuid}`, {
    name,
    unit,
    minimumStock,
    location,
    categoryUuid,
    description,
  });
}
