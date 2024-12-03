import { api } from "@/lib/axios"

export const updatePurchaseOrderStatus = async (uuid: string, status: string) => {
    try {
        const response = await api.put(`/purchase_orders/${uuid}/status`, null, {
            params: { status },
        });
        return response.data
    } catch (error) {
        throw new Error("Erro ao atualizar o status da compra");
    }
}