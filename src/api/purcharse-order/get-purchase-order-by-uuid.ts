import { api } from "@/lib/axios";

interface GetPurchaseOrderParams {
  uuid: string
}

interface GetPurchaseOrderResponse {
  data: any,
}

export async function getPurchaseOrderByUuid({
  uuid,
}: GetPurchaseOrderParams) {
  const response = await api.get<GetPurchaseOrderResponse>(`/purchase_orders/${uuid}`);

  return response.data;
}
