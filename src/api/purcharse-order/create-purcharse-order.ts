import { api } from "@/lib/axios"


interface CreatePurcharseOrderRequest {
  expectedDeliveryDate: Date,
  orderDate: Date,
  status: string,
  supplierUuid: string,
  purcharseOrderItems: {
    quantity: number,
    unitPrice: number,
    expirationDate: Date,
    productUuid: string,
  }[]
}

export async function createPurcharseOrder({ expectedDeliveryDate,
  orderDate,
  status,
  supplierUuid,
  purcharseOrderItems
}: CreatePurcharseOrderRequest) {
  await api.post('purchase_orders', {
    expectedDeliveryDate,
    orderDate,
    status,
    supplierUuid,
    purcharseOrderItems,
  })
}
