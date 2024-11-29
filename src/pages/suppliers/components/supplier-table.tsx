import { getSuppliers } from "@/api/suppliers/get-suppliers";
import { Pagination } from "@/components/pagination";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductSkeletonTable } from "@/pages/products/components/product-skeleton-table";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { SupplierEditForm } from "./supplier-edit-form";
import { useState } from "react";

export function SupplierTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isSupplierDetailsOpen, setIsSupplierDetailsOpen] = useState(false);

  const [selectedSupplierUuid, setSelectedSupplierUuid] = useState<string>("");

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingSupplier } = useQuery({
    queryKey: ["suppliers", page, name, id],
    queryFn: () =>
      getSuppliers({
        page,
        name,
        id,
      }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

  const handlSupplierSelect = (supplierUuid: string) => {
    setSelectedSupplierUuid(supplierUuid);
    setIsSupplierDetailsOpen(true);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Id.</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingSupplier && <ProductSkeletonTable />}
            {result?.data?.length !== undefined && result?.data?.length > 0
              ? result.data.map((supplier) => {
                  return (
                    <TableRow key={supplier.id}>
                      <TableCell>
                        <Dialog
                          open={
                            isSupplierDetailsOpen &&
                            selectedSupplierUuid === supplier.uuid
                          }
                          onOpenChange={setIsSupplierDetailsOpen}
                        >
                          <DialogTrigger asChild>
                            <Pencil
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => handlSupplierSelect(supplier.uuid)}
                            />
                          </DialogTrigger>
                          <SupplierEditForm
                            uuid={selectedSupplierUuid}
                            open={isSupplierDetailsOpen}
                          />
                        </Dialog>
                      </TableCell>
                      <TableCell>{supplier.id}</TableCell>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>{supplier.phoneNumber}</TableCell>
                    </TableRow>
                  );
                })
              : isLoadingSupplier !== true && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Nenhum fornecedor encontrado.
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
