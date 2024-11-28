import { api } from "@/lib/axios";


interface GetProductByUuidParams {
  uuid: string
}

interface GetProductByUuidResponse {
  id: number
  uuid: string
  name: string
  unit: number
  minimumStock: number
  location: string
  expirationDate: string
  description: string
  commerceUuid: string
  categoryUuid: string
}

export async function getProductByUuid({ uuid }: GetProductByUuidParams) {
  const response = await api.get<GetProductByUuidResponse>(`/products/${uuid}`);

  return response.data;
}
