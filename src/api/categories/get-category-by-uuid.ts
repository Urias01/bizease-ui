import { api } from "@/lib/axios";

export interface GetCategoriesParams {
  uuid: string;
}

interface CategoriesResponse {
  id: string,
  uuid: string,
  name: string,
  description: string,
  isActive: "ACTIVE" | "INACTIVE"
}

export async function getCategoryByUuid({
  uuid
}: GetCategoriesParams) {
  const response = await api.get<CategoriesResponse>(`/categories/${uuid}`);
  return response.data;
}
