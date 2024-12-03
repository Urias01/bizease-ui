import { api } from "@/lib/axios";

interface GetSalesOrderQuery {
  page?: number | null
  size?: number | null
  id?: string | null
  status?: string | null
}

interface GetSalesOrderResponse {
  data: any,
  pageIndex: number
  perPage: number,
  totalCount: number
}

export async function getSalesOrder({
  page,
  size = 5,
  id,
  status,
}: GetSalesOrderQuery) {
  const response = await api.get<GetSalesOrderResponse>('/sales_orders', {
    params: {
      page,
      size,
      id,
      status
    }
  });

  return response.data;
}
