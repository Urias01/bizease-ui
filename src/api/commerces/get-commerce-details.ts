import { api } from "@/lib/axios";

export async function getCommerceDetails() {
    const response = await api.get("/commerces/details");
    return response.data;
}