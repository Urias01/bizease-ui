import { api } from "@/lib/axios"

interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
  accessToken: string
}

export async function signIn({ email, password }: SignInRequest): Promise<SignInResponse> {
  const response = await api.post('/auth/users', { email: email, password: password }).then((response) => {
    return response.data
  })

  return response;
}
