import { api } from "@/lib/axios";

interface GetUserByUuidParam {
  uuid: string
}

interface GetUserByUuidResponse {
  name: string
  email: string
  role: "EMPLOYEE" | "OWNER"
}

export async function getUserByUuid({ uuid }: GetUserByUuidParam) {

  const response = await api.get<GetUserByUuidResponse>(`/users/${uuid}`);

  return response.data
}
