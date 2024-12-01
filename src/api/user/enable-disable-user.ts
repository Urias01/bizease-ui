import { api } from "@/lib/axios"


interface enableDisableUserParam {
  uuid: string
}

export async function enableDisableUser({ uuid }: enableDisableUserParam) {

  await api.patch(`/users/${uuid}/enable-or-disable`)
  
}
