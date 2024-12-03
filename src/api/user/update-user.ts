import { api } from "@/lib/axios";

interface UpdateUserRequest {
  uuid: string
  name: string
  email: string
  role: "EMPLOYEE" | "OWNER"
}

export async function updateUser({
  uuid,
  name,
  email,
  role,
}: UpdateUserRequest) {

  await api.put(`/users/${uuid}/manager`, {
    name,
    email,
    role,
  })

}
