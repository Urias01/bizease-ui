import { api } from "@/lib/axios";

interface GetMovementsByUuidParams {
  uuid: string
}

interface GetMovementsByUuidResponse {
  id: number
  uuid: string
  type: string,
  origin: string,
  observation: string,
  quantity: number,
  movementDate: Date,
  destination: string,
  product: {
    id: number,
    uuid: string,
    name: string,
    unit: string,
    minimumStock: number,
    location: string,
    expirationDate: Date,
    description: string,
    commerceUuid: string,
    categoryUuid: string,
  }

}

export async function getMovementsByUuid({
  uuid
}: GetMovementsByUuidParams) {
  const response = await api.get<GetMovementsByUuidResponse>(`/movements/${uuid}`);

  return response.data
}
