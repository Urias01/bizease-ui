import { api } from "@/lib/axios";

interface UpdateSupplierRequest {
  uuid: string
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

export async function updateSupplier({
  uuid,
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
}: UpdateSupplierRequest) {

  const response = await api.put(`/suppliers/${uuid}`, {
    uuid,
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
