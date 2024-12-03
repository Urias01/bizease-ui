import { api } from "@/lib/axios";
import { format } from "date-fns";

interface getRevenueByPeriodResponse {
    data: {
        date: Date;
        receipt: number
    }
}

export async function getRevenueByPeriod(startDate: Date, endDate: Date) {
    const response = await api.get<getRevenueByPeriodResponse>('/sales_orders/revenue', {
        params: {
            startDate: format(startDate, 'yyyy-MM-dd'),
            endDate: format(endDate, 'yyyy-MM-dd'),
        }
    });
    return response.data;
}