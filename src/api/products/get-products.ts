import { Categorie } from "@/@types/categorie";
import { api } from "@/lib/axios";

export interface GetProductsQuery {
  page?: number | null;
  size?: number | null;
  name?: string | null;
  id?: string | null;
  isActive?: string | null;
}

interface ProductsResponse {
  data: {
    id?: number;
    uuid: string;
    name: string;
    unit: number;
    price: number;
    categorieId: number;
    categories?: Categorie;
  }[];
  pageIndex: number;
  perPage: number;
  totalCount: number;
}

export async function getProducts({
  page,
  size = 5,
  name,
  id,
  isActive,
}: GetProductsQuery) {
  const response = await api.get<ProductsResponse>("/products", {
    params: {
      page,
      size,
      name,
      id,
      isActive,
    }
  });

  console.log(response.data)
  return response.data;
}
