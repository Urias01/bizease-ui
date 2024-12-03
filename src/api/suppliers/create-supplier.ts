import { api } from "@/lib/axios";

interface CreateSupplierRequest {
  cnpj: string
  name: string
  phoneNumber: string
  email: string
  address: string
  addressNumber: string
  neighborhood: string
  city: string
  uf: string
  postalCode: string
  category: string
}

export async function createSupplier({
  cnpj,
  name,
  phoneNumber,
  email,
  address,
  addressNumber,
  neighborhood,
  city,
  uf,
  postalCode,
  category,
}: CreateSupplierRequest) {

  const response = await api.post("/suppliers", {
    cnpj,
    name,
    phoneNumber,
    email,
    address,
    addressNumber,
    neighborhood,
    city,
    uf,
    postalCode,
    category,
  })

  return response.data
}
