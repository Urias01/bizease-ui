import { api } from "@/lib/axios";

interface GetExpiredProductsQuery {
  page?: number | null
  size?: number | null
  id?: string | null
  name?: string | null
}
interface GetExpiredProductsResponse {
  data: {
    category_name: string
    product_id: number
    expired_quantity: number
    product_name: string
  }[],
  pageIndex: number
  perPage: number
  totalCount: number
}

export async function getExpiredProducts({
  page,
  size = 5,
  name,
  id,
}: GetExpiredProductsQuery) {
  const response = await api.get<GetExpiredProductsResponse>("/products/expired", {
    params: {
      page,
      size,
      name,
      id,
    }
  });

  console.log(response)

  return response.data
}
