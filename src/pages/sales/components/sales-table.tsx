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
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function SalesTable() {
  const [searchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categorieId = searchParams.get("categorieId");
  const name = searchParams.get("name");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["products", page, name, categorieId],
    queryFn: (): any => {},
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Id.</TableHead>
              <TableHead>Quantidade de produtos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {isLoadingProduct && <ProductSkeletonTable />} */}
            {result?.data?.length !== undefined && result?.data?.length > 0
              ? result.data.map((product: any) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Button variant="outline" className="flex gap-2">
                          <Pencil className="h-3 w-3" />
                        </Button>
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
                    <TableCell>15</TableCell>
                    <TableCell>
                      {" "}
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="font-medium text-muted-foreground">
                        Vendido
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline">Cancelar venda</Button>
                    </TableCell>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* <ProductForm uuid={selectedProductUuid} /> */}
      </Dialog>
    </>
  );
}
