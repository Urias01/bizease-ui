import { api } from "@/lib/axios";

export interface GetUsersQuery {
  page?: number | null;
  size?: number | null;
  id?: string | null;
  name?: string | null;
  email?: string | null;
  isActive?: string | null;
}

interface GetUsersByComerceResponse {
  data: {
    id: string,
    uuid: string,
    name: string,
    email: string
    isActive: string,
  }[];
  pageIndex: number;
  perPage: number;
  totalCount: number;
}

export async function getUsersByCommerce({
  page,
  size = 5,
  id,
  name,
  email,
  isActive
}: GetUsersQuery) {
  isActive = isActive === "all" ? "" : isActive;

  const response = await api.get<GetUsersByComerceResponse>('/users', {
    params: {
      page,
      size,
      id,
      name,
      email,
      isActive
    }
  })

  return response.data;
}
