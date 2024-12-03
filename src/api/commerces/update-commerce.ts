import { api } from "@/lib/axios";

export interface UpdateCommerceRequest {
    name: string;
    phoneNumber: string;
    postalCode: string;
    address: string;
    addressNumber: string;
    city: string;
    uf: string;
    neighborhood: string;
}

export async function updateCommerce(data: UpdateCommerceRequest): Promise<void> {
    await api.put("/commerces/update", data);
}
  