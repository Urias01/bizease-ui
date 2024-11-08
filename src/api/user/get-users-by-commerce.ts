
export interface GetUsersQuery {
  page?: number | null;
  size?: number | null;
  name?: string | null;
}

interface GetUsersByComerceResponse {
  data: {
    id: string,
    uuid: string,
    name: string,
    isActive: true,
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getUsersByCommerce({ page, size, name }: GetUsersQuery) {
  const response: GetUsersByComerceResponse = {} as GetUsersByComerceResponse

  return response;
}
