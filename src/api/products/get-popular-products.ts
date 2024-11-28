import { api } from "@/lib/axios";

interface GetPopularProductsResponse {
  data: {
    product: string,
    amount: number
  }[]
}

export async function getPopularProducts(): Promise<GetPopularProductsResponse>  {
  const response = await api.get("/products/popular");
  
  return response;
}
