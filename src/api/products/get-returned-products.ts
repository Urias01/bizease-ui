import { api } from "@/lib/axios";

interface GetReturnedProductsQuery {
  page?: number | null
  size?: number | null
  id?: string | null
  name?: string | null
}

interface GetReturnedProductsResponse {
  data: {
    category_name: string
    product_id: number
    returned_quantity: number
    product_name: string
  }[],
  pageIndex: number
  perPage: number
  totalCount: number
}

export async function getReturnedProducts({
  page,
  size = 5,
  name,
  id,
}: GetReturnedProductsQuery) {
  const response = await api.get<GetReturnedProductsResponse>("/products/returned", {
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
