import { Categorie } from "@/@types/categorie";
import { api } from "@/lib/axios";

export interface GetProductsQuery {
  page?: number | null;
  size?: number | null;
  name?: string | null;
  commerceUuid?: string | null;
  categorieId?: string | null;
}

interface ProductsResponse {
  data: {
    id?: number;
    uuid?: string;
    name: string;
    unit: number;
    price: number;
    categorieId: number;
    categories?: Categorie;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getProducts({
  page,
  size = 10,
  name,
  commerceUuid,
  categorieId,
}: GetProductsQuery) {
  const response = await api.get<ProductsResponse>("/products", {
    params: {
      page,
      size,
      commerceUuid,
      name,
      categorieId,
    }
  });
  return response.data;
}
