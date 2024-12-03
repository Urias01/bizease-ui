import { Pagination } from "@/components/pagination";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Dialog } from "@radix-ui/react-dialog";
import { Pencil, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPurchaseOrder } from "@/api/purcharse-order/get-purcharse-order";
import { DialogTrigger } from "@/components/ui/dialog";
import { PurchaseDetails } from "./purchase-details";
import { toast } from "sonner";
import { updatePurchaseOrderStatus } from "@/api/purcharse-order/update-purchase-order-status";
import { queryClient } from "@/lib/react-query";

export function PurcharsesTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPurchaseOrderDetailOpen, setIsPurchaseOrderDetailOpen] =
    useState(false);
  const [selectedPurchaseOrderUuid, setSelectedPurchaseOrderUuid] =
    useState<string>("");

  const id = searchParams.get("id");
  const status = searchParams.get("status");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["purchase-orders", page, status, id],
    queryFn: () =>
      getPurchaseOrder({
        page,
        status,
        id,
      }),
  });

  console.log(result);

  const handlePurcharseOrderSelect = (purcharseUuid: string) => {
    setSelectedPurchaseOrderUuid(purcharseUuid);
    setIsPurchaseOrderDetailOpen(true);
  };

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

  const handleUpdateStatus = async (uuid: string, currentStatus: string) => {
    let newStatus: string;

    switch (currentStatus) {
      case "REALIZADO":
        newStatus = "CONFIRMADO"; // Exemplo: transição de PENDENTE para CONFIRMADO
        break;
      case "CONFIRMADO":
        newStatus = "RECEBIDO"; // Exemplo: transição de CONFIRMADO para ENVIADO
        break;
      default:
        toast.error("Transição de status inválida ou não permitida");
        return;
    }

    try {
      const updatedOrder = await updatePurchaseOrderStatus(
        uuid,
        newStatus
      ).then(() => {
        queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
      });
      toast.success(`Status alterado para ${newStatus}`);
    } catch (error) {
      toast.error("Erro ao atualizar o status da venda");
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Id.</TableHead>
              <TableHead>Produtos.</TableHead>
              <TableHead>Quantidade de produtos</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {isLoadingProduct && <ProductSkeletonTable />} */}
            {result?.data?.length !== undefined && result?.data?.length > 0
              ? result.data.map((purchaseOder: any) => {
                  return (
                    <TableRow key={purchaseOder.id}>
                      <TableCell>
                        <Dialog
                          open={
                            isPurchaseOrderDetailOpen &&
                            selectedPurchaseOrderUuid === purchaseOder.uuid
                          }
                          onOpenChange={setIsPurchaseOrderDetailOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() =>
                                handlePurcharseOrderSelect(purchaseOder.uuid)
                              }
                            >
                              <Search className="h-3 w-3 cursor-pointer" />
                            </Button>
                          </DialogTrigger>
                          <PurchaseDetails
                            uuid={selectedPurchaseOrderUuid}
                            open={isPurchaseOrderDetailOpen}
                          />
                        </Dialog>
                      </TableCell>
                      <TableCell>{purchaseOder.id}</TableCell>
                      <TableCell>
                        {purchaseOder.purchaseOrderItems.map(
                          (purchaseItem: any) => {
                            return <span>{purchaseItem.products.name}, </span>;
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        {purchaseOder.purchaseOrderItems.reduce(
                          (acc: number, curr: any) => acc + curr.quantity,
                          0
                        )}
                      </TableCell>
                      <TableCell>{purchaseOder.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="secondary"
                          disabled={["RECEBIDO"].includes(purchaseOder.status)}
                          onClick={() =>
                            handleUpdateStatus(
                              purchaseOder.uuid,
                              purchaseOder.status
                            )
                          }
                        >
                          Alterar Status
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              : isLoadingProduct !== true && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Nenhuma compra encontrada.
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      {result && (
        <Pagination
          pageIndex={result.pageIndex}
          totalCount={result.totalCount}
          perPage={result.perPage}
          onPageChange={handlePaginate}
        />
      )}
    </>
  );
}
