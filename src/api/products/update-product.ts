import { api } from "@/lib/axios";

export interface UpdateProductRequest {
  uuid: string;
  name: string;
  unit: number;
  minimumStock: number;
  categoryUuid: string;
  description: string;
}

export async function updateProduct({
  uuid,
  name,
  unit,
  minimumStock,
  categoryUuid,
  description,
}: UpdateProductRequest) {
  await api.put(`/products/${uuid}`, {
    name,
    unit,
    minimumStock,
    categoryUuid,
    description,
  });
}
