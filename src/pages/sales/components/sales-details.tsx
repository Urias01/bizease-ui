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

interface SalesDetailsProps {
  uuid: string;
  open: boolean;
}

export function SalesDetails({ uuid, open }: SalesDetailsProps) {
  const { data: salesOrder } = useQuery({
    queryKey: ["sales-order-details", uuid],
    queryFn: () => getSalesOrderByUuid({ uuid }),
    enabled: open,
  });

  return (
    <DialogContent className="min-w-fit">
      <DialogHeader>
        <DialogTitle>Pedido: {salesOrder && salesOrder.id}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      {salesOrder && (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  {salesOrder.status}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Data do pedido
                </TableCell>
                <TableCell className="flex justify-end">
                  {format(salesOrder.orderDate, "PPP", {
                    locale: ptBR,
                  })}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Data de entrega
                </TableCell>
                <TableCell className="flex justify-end">
                  {format(salesOrder.deliveryDate, "PPP", {
                    locale: ptBR,
                  })}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>
                <TableCell className="flex justify-end">
                  {formatDistanceToNow(salesOrder.createdAt, {
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
              {salesOrder.salesOrderItems.map((item) => {
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
                  {salesOrder.salesOrderItems
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
