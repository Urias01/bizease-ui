import { Categorie } from "@/@types/categorie";
import { getSuppliers } from "@/api/suppliers/get-suppliers";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import { z } from "zod";

interface Supplier {
  id?: number;
  uuid?: string;
  name: string;
  phoneNumber: string;
  categorieId: number;
  categories?: Categorie;
}

export function SupplierTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  const name = searchParams.get("name");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingSupplier } = useQuery({
    queryKey: ["suppliers", page, name],
    queryFn: () =>
      getSuppliers({
        page,
        name,
      }),
  });

  const handleEditClick = (_: string) => {
    console.log(_);
    toast.info("Uuid não encontrado");
  };

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

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
              ? result.data.map((supplier: Supplier) => {
                  return (
                    <TableRow key={supplier.id}>
                      <TableCell>
                        <Button
                          variant="outline"
                          className="flex gap-2"
                          onClick={() =>
                            handleEditClick(
                              supplier.uuid !== undefined ? supplier.uuid : ""
                            )
                          }
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
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
