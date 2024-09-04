import { api } from "@/lib/axios";

export interface RegisterFirstUserAccess {
  name: string
  email: string
  password: string
  commerceName: string
  cnpj: string
}

export async function createFirstAccess({
  name,
  email,
  password,
  commerceName,
  cnpj,
}: RegisterFirstUserAccess) {
  api.post('/users/first-access', {
    name,
    email,
    password,
    commerceName,
    cnpj,
  })
}
