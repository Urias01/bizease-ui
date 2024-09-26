import { api } from "@/lib/axios";

export interface getCategoriesQuery {
  page?: number | null;
  size?: number | null;
  name?: string | null;
}

interface CategoriesResponse {
  data: {
    id: string,
    uuid: string,
    name: string,
    description: string,
    commerce: any // Por enquanto
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getCategories({
  page,
  size = 10,
  name,
}: getCategoriesQuery) {
  const response = await api.get<CategoriesResponse>("/categories", {
    params: {
      page,
      size,
      name,
    }
  });
  return response.data;
}
