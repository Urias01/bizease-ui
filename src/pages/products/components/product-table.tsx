import { getProducts } from "@/api/products/get-products";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { ProductSkeletonTable } from "./product-skeleton-table";
import { Pencil } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Pagination } from "@/components/pagination";
import { ProductEditForm } from "./product-edit-form";

export function ProductTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedProductUuid, setSelectedProductUuid] = useState<string>("");

  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const isActive = searchParams.get("isActive");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["products", page, name, id, isActive],
    queryFn: () =>
      getProducts({
        page,
        name,
        id,
        isActive,
      }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

  const handlProductSelect = (productUuid: string) => {
    setSelectedProductUuid(productUuid);
    setIsProductDetailsOpen(true);
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
              <TableHead>Quantidade</TableHead>
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
                        <Dialog
                          open={
                            isProductDetailsOpen &&
                            selectedProductUuid === product.uuid
                          }
                          onOpenChange={setIsProductDetailsOpen}
                        >
                          <DialogTrigger asChild>
                            <Pencil
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => handlProductSelect(product.uuid)}
                            />
                          </DialogTrigger>
                          <ProductEditForm
                            uuid={selectedProductUuid}
                            open={isProductDetailsOpen}
                          />
                        </Dialog>
                      </TableCell>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.unit}</TableCell>
                      <TableCell>
                        {product.categories && product.categories.name}
                      </TableCell>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ProductEditForm uuid={selectedProductUuid} />
      </Dialog>
    </>
  );
}
