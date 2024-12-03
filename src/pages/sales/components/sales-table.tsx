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
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSalesOrder } from "@/api/sales-order-items/get-sales-order";
import { SalesDetails } from "./sales-details";
import { DialogTrigger } from "@/components/ui/dialog";

export function SalesTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSalesOrderDetailOpen, setIsSalesOrderDetailOpen] = useState(false);
  const [selectedSalesOrderUuid, setSelectedSalesOrderUuid] =
    useState<string>("");

  const id = searchParams.get("id");
  const status = searchParams.get("status");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["sales-orders", page, status, id],
    queryFn: () =>
      getSalesOrder({
        page,
        status,
        id,
      }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

  const handleSalesOrderSelect = (productUuid: string) => {
    setSelectedSalesOrderUuid(productUuid);
    setIsSalesOrderDetailOpen(true);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Id.</TableHead>
              <TableHead>Produtos</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result?.data?.length !== undefined && result?.data?.length > 0
              ? result.data.map((salesOder: any) => {
                  return (
                    <TableRow key={salesOder.id}>
                      <TableCell>
                        <Dialog
                          open={
                            isSalesOrderDetailOpen &&
                            selectedSalesOrderUuid === salesOder.uuid
                          }
                          onOpenChange={setIsSalesOrderDetailOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => handleSalesOrderSelect(salesOder.uuid)}
                            >
                              <Search className="h-3 w-3 cursor-pointer" />
                            </Button>
                          </DialogTrigger>
                          <SalesDetails
                            uuid={selectedSalesOrderUuid}
                            open={isSalesOrderDetailOpen}
                          />
                        </Dialog>
                      </TableCell>
                      <TableCell>{salesOder.id}</TableCell>
                      <TableCell>
                        {salesOder.salesOrderItems.map((salesItem: any) => {
                          return <span>{salesItem.products.name}, </span>;
                        })}
                      </TableCell>
                      <TableCell>
                        {salesOder.salesOrderItems.reduce(
                          (acc: number, curr: any) => acc + curr.quantity,
                          0
                        )}
                      </TableCell>
                      <TableCell>{salesOder.status}</TableCell>
                    </TableRow>
                  );
                })
              : isLoadingProduct !== true && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Nenhum produto encontrado.
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
