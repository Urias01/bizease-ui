import { api } from "@/lib/axios";

interface getMeResponse {
  uuid: string
  id: number
  name: string
  email: string
  commerce: {
    id: 1,
    uuid: string
    cnpj: string
    name: string
    phoneNumber: string
    postalCode: string
    address: string
    addressNumber: string
    neighborhood: string
    city: string
    uf: string
    createdAt: string
    updatedAt: string
    active: string
  }
}

export async function getMe() {
  const response = await api.get<getMeResponse>('/users/see-my-profile');

  return response.data;
}
