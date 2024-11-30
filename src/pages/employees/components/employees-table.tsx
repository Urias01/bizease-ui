import { getUsersByCommerce } from "@/api/user/get-users-by-commerce";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { TableCategoriesSkeleton } from "@/pages/categories/components/categories-skeleton-table";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

export function EmployeesTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const isActive = searchParams.get("isActive");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["users", page, id, name, email, isActive],
    queryFn: () =>
      getUsersByCommerce({
        page,
        id,
        name,
        email,
        isActive,
      }),
  });

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
              <TableHead>E-mail</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingCategories && <TableCategoriesSkeleton />}
            {result?.data?.length !== undefined && result?.data?.length > 0
              ? result.data.map((employee) => {
                  return (
                    <TableRow key={employee.id}>
                      <TableCell className="w-[64px]">
                        <Pencil className="h-3 w-3" />
                      </TableCell>
                      <TableCell className="w-[64px]">{employee.id}</TableCell>
                      <TableCell className="w-[180px]">
                        {employee.name}
                      </TableCell>
                      <TableCell className="w-[180px]">
                        {employee.email}
                      </TableCell>
                      <TableCell className="w-[140px]">
                        {employee.isActive === "ACTIVE" ? (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="font-medium text-muted-foreground">
                              Ativo
                            </span>
                          </div>
                        ) : (
                          <div className="flex gap-2 items-center">
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                            <span className="font-medium text-muted-foreground">
                              Inativo
                            </span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="w-[132px]">
                        {employee.isActive === "ACTIVE" ? (
                          <Dialog
                            open={isConfirmDialogOpen}
                            onOpenChange={setIsConfirmDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button type="button" variant="destructive">
                                Desativar
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogTitle>
                                Atenção você estará desativando um usuário!
                              </DialogTitle>
                              <Separator orientation="horizontal" />
                              <h2>
                                Tem certeza que deseja desativar esse usuário?
                              </h2>
                              <div className="flex flex-row-reverse gap-4">
                                <Button
                                  variant="destructive"
                                  onClick={() => {}}
                                >
                                  Sim
                                </Button>
                                <Button
                                  variant="ghost"
                                  onClick={() => {
                                    setIsConfirmDialogOpen(false);
                                  }}
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <Button variant="outline">Ativar</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              : isLoadingCategories !== true && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Nenhum usuário encontrado.
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
