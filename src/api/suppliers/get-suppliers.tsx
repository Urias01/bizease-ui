import { api } from "@/lib/axios";

export interface GetSupplierQuery {
  page?: number | null;
  size?: number | null;
  name?: string | null;
  id?: string | null;
}

interface SupplierResponse {
  data: {
    id?: number;
    uuid?: string;
    name: string;
    phoneNumber: string;
    category: string;
  }[];
  pageIndex: number;
  perPage: number;
  totalCount: number;
}

export async function getSuppliers({
  page,
  size = 5,
  name,
  id,
}: GetSupplierQuery) {
  const response = await api
    .get<SupplierResponse>("/suppliers", {
      params: {
        page,
        size,
        name,
        id,
      },
    })
    .catch((err) => {
      return { data: err };
    });

  return response.data;
}
