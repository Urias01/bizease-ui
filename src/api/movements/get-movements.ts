import { api } from "@/lib/axios";

interface GetMovementsQuery {
  page?: number | null;
  size?: number | null;
  id?: string | null;
  type?: string | null;
  origin?: string | null;
}

interface GetMovementsResponse {
  data: {
    id: number
    uuid: string
    type: string,
    origin: string,
    productId: number,
    destination: string,
    product: {
      id: number,
      uuid: string,
      name: string,
      unit: number,
      minimumStock: number,
      location: string,
      expirationDate: string,
      description: string,
      commerceUuid: string,
      categoryUuid: string,
    }
  }[],
  pageIndex: number;
  perPage: number;
  totalCount: number;
}
export async function getMovements({
  page,
  size = 5,
  id,
  type,
  origin,
}: GetMovementsQuery) {
  
  const response = await api.get<GetMovementsResponse>('/movements', {
    params: {
      page,
      size,
      id,
      type,
      origin,
    }
  });

  return response.data
}
