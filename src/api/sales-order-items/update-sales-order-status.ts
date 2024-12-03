import { api } from "@/lib/axios"

export const updateSalesOrderStatus = async (uuid: string, status: string) => {
    try {
        const response = await api.put(`/sales_orders/${uuid}/status`, null, {
            params: { status },
        });
        return response.data;
    } catch (error) {
        throw new Error("Erro ao atualizar o status da venda");
    }
}