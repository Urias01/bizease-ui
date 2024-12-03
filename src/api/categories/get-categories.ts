import { api } from "@/lib/axios";

export interface getCategoriesQuery {
  page?: number | null;
  size?: number | null;
  name?: string | null;
  id?: string | null;
}

interface CategoriesResponse {
  data: {
    id: string,
    uuid: string,
    name: string,
    description: string,
    isActive: "ACTIVE" | "INACTIVE"
  }[];
  pageIndex: number;
  perPage: number;
  totalCount: number;
}

export async function getCategories({
  page,
  size = 5,
  name,
  id,
}: getCategoriesQuery) {
  const response = await api.get<CategoriesResponse>("/categories", {
    params: {
      page,
      size,
      name,
      id
    }
  });
  return response.data;
}
