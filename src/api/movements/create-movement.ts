import { api } from "@/lib/axios";

interface CreateMovementRequest {
  type: string
  movementDate: Date
  productUuid: string
  quantity: number
  origin: string
  destination: string
  observation: string
}

export async function createMovement({
  type,
  movementDate,
  productUuid,
  quantity,
  origin,
  destination,
  observation,
}: CreateMovementRequest
) {
  await api.post('/movements', {
    type,
    movementDate,
    productUuid,
    quantity,
    origin,
    destination,
    observation,
  });
}
