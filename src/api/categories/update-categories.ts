import { api } from "@/lib/axios";

export interface UpdateCategoriesRequest {
  uuid: string
  name: string;
  description?: string | undefined;
}

export async function updateCategories({
  uuid,
  name,
  description,
}: UpdateCategoriesRequest) {
  await api.put(`/categories/${uuid}`, {
    name,
    description,
  });
}
