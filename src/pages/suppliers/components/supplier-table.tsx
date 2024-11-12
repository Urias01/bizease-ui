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
import {
  Pencil,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

export function SupplierTable() {
  const [searchParams] = useSearchParams();

  const categorieId = searchParams.get("categorieId");
  const name = searchParams.get("name");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingProduct } = useQuery({
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
            {isLoadingProduct && <ProductSkeletonTable />}
            {result?.data?.length !== undefined && result?.data?.length > 0
              ? result.data.map((product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Button
                          variant="outline"
                          className="flex gap-2"
                          onClick={() =>
                            handleEditClick(
                              product.uuid !== undefined ? product.uuid : ""
                            )
                          }
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </TableCell>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{formatPhoneNumber(product.phone)}</TableCell>
                      <TableCell>
                        {product.categories && product.categories.name}
                      </TableCell>
                    </TableRow>
                  );
                })
              : isLoadingProduct !== true && (
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
