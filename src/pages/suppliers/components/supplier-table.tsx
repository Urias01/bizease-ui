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
import { formatPhoneNumber } from "@/utils/format-phone-number";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

interface Supplier {
  id?: number;
  uuid?: string;
  name: string;
  phone: string;
  categorieId: number;
  categories?: Categorie;
}

export function SupplierTable() {
  const [searchParams] = useSearchParams();

  const categorieId = searchParams.get("categorieId");
  const name = searchParams.get("name");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingSupplier } = useQuery({
    queryKey: ["suppliers", page, name, categorieId],
    queryFn: () =>
      getSuppliers({
        page,
        name,
        categorieId,
      }),
  });

  const handleEditClick = (_: string) => {
    console.log(_);
    toast.info("Uuid não encontrado");
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
              <TableHead>Categoria</TableHead>
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
                      <TableCell>{formatPhoneNumber(supplier.phone)}</TableCell>
                      <TableCell>
                        {supplier.categories && supplier.categories.name}
                      </TableCell>
                    </TableRow>
                  );
                })
              : isLoadingSupplier !== true && (
                  // <TableRow>
                  //   <TableCell colSpan={5} className="text-center">
                  //     Nenhum produto encontrado.
                  //   </TableCell>
                  // </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button variant="outline" className="flex gap-2">
                        <Pencil className="h-3 w-3" />
                      </Button>
                    </TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>Supplier</TableCell>
                    <TableCell>{formatPhoneNumber("11953237408")}</TableCell>
                    <TableCell>Category</TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        pageIndex={0}
        totalCount={10}
        perPage={5}
        onPageChange={() => {}}
      />
    </>
  );
}
