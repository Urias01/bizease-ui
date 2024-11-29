import { api } from "@/lib/axios";

interface UpdateMovementRequest {
  uuid: string
  type: string
  movementDate: Date
  productUuid: string
  quantity: number
  origin: string
  destination: string
  observation: string
}

export async function updateMovement({
  uuid,
  type,
  movementDate,
  productUuid,
  quantity,
  origin,
  destination,
  observation,
}: UpdateMovementRequest
) {
  await api.put(`/movements/${uuid}`, {
    type,
    movementDate,
    productUuid,
    quantity,
    origin,
    destination,
    observation,
  });
}
