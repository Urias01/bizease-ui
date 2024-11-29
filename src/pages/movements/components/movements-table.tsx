import { Pagination } from "@/components/pagination";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ProductSkeletonTable } from "@/pages/products/components/product-skeleton-table";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

export function MovementsTable() {
  const [searchParams] = useSearchParams();

  const categorieId = searchParams.get("categorieId");
  const name = searchParams.get("name");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["movements", page, name, categorieId],
    queryFn: () => {
      return {
        data: [] as {
          id: string;
          uuid: string;
          product: string;
          type: string;
        }[],
      };
    },
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
              <TableHead>Produto</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Local</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingProduct && <ProductSkeletonTable />}
            {result?.data?.length !== undefined && result?.data?.length > 0
              ? result.data.map((movement) => {
                  return (
                    <TableRow key={movement.id}>
                      <TableCell>
                        <Button
                          variant="outline"
                          className="flex gap-2"
                          onClick={() =>
                            handleEditClick(
                              movement.uuid !== undefined ? movement.uuid : ""
                            )
                          }
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </TableCell>
                      <TableCell>{movement.uuid}</TableCell>
                      <TableCell>{movement.product}</TableCell>
                      <TableCell>{movement.type}</TableCell>
                      <TableCell>
                        {movement.product && movement.product}
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
                    <TableCell>Movimentação</TableCell>
                    <TableCell>11953237408</TableCell>
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
