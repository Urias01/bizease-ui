import { api } from "@/lib/axios";

interface GetLostProductsResponse {
  data: {
    product: string;
    quantity: number;
    priceTotal: number;
  }[]
}

export async function getLostProducts() {
  const response = await api.get<GetLostProductsResponse>('/sales_order_items/lost_products');
  return response.data;
}
