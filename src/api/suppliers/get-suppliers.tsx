import { Categorie } from "@/@types/categorie";
import { api } from "@/lib/axios";

export interface GetSupplierQuery {
  page?: number | null;
  size?: number | null;
  name?: string | null;
  categorieId?: string | null;
}

interface SupplierResponse {
  data: {
    id?: number;
    uuid?: string;
    name: string;
    phone: string;
    categorieId: number;
    categories?: Categorie;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}


export async function getSuppliers({
  page,
  size,
  name,
  categorieId,
}: GetSupplierQuery) {
  const response = await api.get<SupplierResponse>("/products", {
    params: {
      page,
      size,
      name,
      categorieId,
    }
  });

  return response.data;
}
