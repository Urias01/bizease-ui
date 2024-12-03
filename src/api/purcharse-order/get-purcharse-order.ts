import { api } from "@/lib/axios";

interface GetPurchaseOrderQuery {
  page?: number | null
  size?: number | null
  id?: string | null
  status?: string | null
}

interface GetPurchaseOrderResponse {
  data: any,
  pageIndex: number
  perPage: number,
  totalCount: number
}

export async function getPurchaseOrder({
  page,
  size = 5,
  id,
  status,
}: GetPurchaseOrderQuery) {
  if (status === "all") {
    status = "";
  }
  const response = await api.get<GetPurchaseOrderResponse>('/purchase_orders', {
    params: {
      page,
      size,
      id,
      status
    }
  });

  return response.data;
}
