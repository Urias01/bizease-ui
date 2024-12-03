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
import { z } from "zod";
import { getMovements } from "@/api/movements/get-movements";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { MovementsEditForm } from "./movements-edit-form";

export function MovementsTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isMovementDetailsOpen, setIsMovementDetailsOpen] = useState(false);
  const [selectedMovementUuid, setSelectedMovementUuid] = useState<string>("");

  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const origin = searchParams.get("origin");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["movements", page, id, type, origin],
    queryFn: () => getMovements({ page, id, type, origin }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

  const handlMovementSelect = (movementUuid: string) => {
    setSelectedMovementUuid(movementUuid);
    setIsMovementDetailsOpen(true);
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
                        <Dialog
                          open={
                            isMovementDetailsOpen &&
                            selectedMovementUuid === movement.uuid
                          }
                          onOpenChange={setIsMovementDetailsOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => handlMovementSelect(movement.uuid)}
                            >
                              <Pencil className="h-3 w-3 cursor-pointer" />
                            </Button>
                          </DialogTrigger>
                          <MovementsEditForm
                            uuid={selectedMovementUuid}
                            open={isMovementDetailsOpen}
                          />
                        </Dialog>
                      </TableCell>
                      <TableCell>{movement.id}</TableCell>
                      <TableCell>{movement.product.name}</TableCell>
                      <TableCell>{movement.type}</TableCell>
                      <TableCell>{movement.destination}</TableCell>
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
