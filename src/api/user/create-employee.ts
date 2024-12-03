import { api } from "@/lib/axios";

interface CreateEmployeeRequest {
  name: string
  email: string
  password: string
  role: string
}

export async function createEmployee({
  name,
  email,
  password,
  role,
}: CreateEmployeeRequest) {
  await api.post('/users/create-employee', {
    name,
    email,
    password,
    role,
  })
}
