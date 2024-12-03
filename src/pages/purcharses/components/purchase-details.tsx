import { getSalesOrderByUuid } from "@/api/sales-order-items/get-sales-order-by-uuid";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { getPurchaseOrderByUuid } from "@/api/purcharse-order/get-purchase-order-by-uuid";

interface PurchaseDetailsProps {
  uuid: string;
  open: boolean;
}

export function PurchaseDetails({ uuid, open }: PurchaseDetailsProps) {
  const { data: purchaseOrder } = useQuery({
    queryKey: ["purchase-order-details", uuid],
    queryFn: () => getPurchaseOrderByUuid({ uuid }),
    enabled: open,
  });

  return (
    <DialogContent className="min-w-fit">
      <DialogHeader>
        <DialogTitle>Pedido: {purchaseOrder && purchaseOrder.id}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      {purchaseOrder && (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  {purchaseOrder.status}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Data do pedido
                </TableCell>
                <TableCell className="flex justify-end">
                  {format(purchaseOrder.orderDate, "PPP", {
                    locale: ptBR,
                  })}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Data de entrega
                </TableCell>
                <TableCell className="flex justify-end">
                  {format(purchaseOrder.deliveryDate, "PPP", {
                    locale: ptBR,
                  })}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>
                <TableCell className="flex justify-end">
                  {formatDistanceToNow(purchaseOrder.createdAt, {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrder.purchaseOrderItems.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.products.name}</TableCell>

                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>

                    <TableCell className="text-right">
                      {item.unitPrice.toFixed(2)}
                    </TableCell>

                    <TableCell className="text-right">
                      {(item.quantity * item.unitPrice).toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right font-medium">
                  {" "}
                  {purchaseOrder.purchaseOrderItems
                    .reduce(
                      (total: number, item: any) =>
                        total + item.quantity * item.unitPrice,
                      0
                    )
                    .toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </DialogContent>
  );
}
