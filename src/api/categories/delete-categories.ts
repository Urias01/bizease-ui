import { api } from "@/lib/axios";

export interface DeleteCategoriesParams {
  uuid: string;
}



export async function deleteCategories({
  uuid
}: DeleteCategoriesParams) {
  await api.delete(`/categories/${uuid}`);
}
