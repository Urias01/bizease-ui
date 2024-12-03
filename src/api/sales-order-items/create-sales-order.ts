import { api } from "@/lib/axios"


interface CreateSalesOrderRequest {
  deliveryDate: Date,
  orderDate: Date,
  status: string,
  salesOrdersItems: {
    quantity: number,
    unitPrice: number,
    productUuid: string,
    status: string,
  }[]
}

export async function createSalesOrder({
  deliveryDate,
  orderDate,
  status,
  salesOrdersItems,
}: CreateSalesOrderRequest) {
  await api.post('sales_orders', {
    deliveryDate,
    orderDate,
    status,
    salesOrdersItems,
  })
}
