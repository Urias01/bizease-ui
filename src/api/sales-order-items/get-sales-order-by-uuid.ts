import { api } from "@/lib/axios";

interface GetSalesOrderParams {
  uuid: string
}

interface GetSalesOrderResponse {
  data: any,
}

export async function getSalesOrderByUuid({
  uuid,
}: GetSalesOrderParams) {
  const response = await api.get<GetSalesOrderResponse>(`/sales_orders/${uuid}`);

  return response.data;
}
