import { api } from "@/lib/axios";

interface GetSupplierByUuidRequest {
  uuid: string
}

interface SupplierResponse {
  data: {
    id?: number;
    uuid?: string;
    name: string;
    phoneNumber: string;
    category: string;
  }
  pageIndex: number;
  perPage: number;
  totalCount: number;
}

export async function getSuppliersByUuid({ uuid }: GetSupplierByUuidRequest) {
  const response = await api
    .get<SupplierResponse>(`/suppliers/${uuid}`)
    .catch((err) => {
      return { data: err };
    });

  return response.data;
}
