import { api } from "@/lib/axios";


interface GetAnnualBuyingAndSellingResponse {
  data: {
    month: string,
    buyingTotal: number
    sellingTotal: number,
  }
}

export async function getAnnualBuyingAndSelling() {

  const response = await api.get<GetAnnualBuyingAndSellingResponse>("/sales_orders/annual_buying_selling");

  return response.data;
}
