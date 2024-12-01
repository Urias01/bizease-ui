import { enableDisableUser } from "@/api/user/enable-disable-user";
import { getUsersByCommerce } from "@/api/user/get-users-by-commerce";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { queryClient } from "@/lib/react-query";
import { TableCategoriesSkeleton } from "@/pages/categories/components/categories-skeleton-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

export function EmployeesTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isConfirmActivateDialogOpen, setIsConfirmActivateDialogOpen] =
    useState(false);

  const [selectedEmployeeUuid, setSelectedEmployeeUuid] = useState<string>("");

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

  const { mutateAsync: enableDisableUserFn } = useMutation({
    mutationFn: enableDisableUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const handleEmployeeSelect = (employeeUuid: string) => {
    setSelectedEmployeeUuid(employeeUuid);
    setIsConfirmDialogOpen(true);
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
                            open={
                              isConfirmDialogOpen &&
                              selectedEmployeeUuid === employee.uuid
                            }
                            onOpenChange={setIsConfirmDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() =>
                                  handleEmployeeSelect(employee.uuid)
                                }
                              >
                                Desativar
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogDescription></DialogDescription>
                              <DialogTitle>
                                Atenção você estará desativando um usuário!
                              </DialogTitle>
                              <Separator orientation="horizontal" />
                              <h2>
                                Tem certeza que deseja desativar o usuário{" "}
                                {employee.name}?
                              </h2>
                              <div className="flex flex-row-reverse gap-4">
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    enableDisableUserFn({ uuid: employee.uuid })
                                  }
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
                          <Dialog
                            open={
                              isConfirmActivateDialogOpen &&
                              selectedEmployeeUuid === employee.uuid
                            }
                            onOpenChange={setIsConfirmActivateDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button
                                type="button"
                                variant="success"
                                onClick={() =>
                                  handleEmployeeSelect(employee.uuid)
                                }
                              >
                                Ativar
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogDescription></DialogDescription>
                              <DialogTitle>
                                Atenção você estará ativando um usuário!
                              </DialogTitle>
                              <Separator orientation="horizontal" />
                              <h2>
                                Tem certeza que deseja re-ativar o usuário{" "}
                                {employee.name}?
                              </h2>
                              <div className="flex flex-row-reverse gap-4">
                                <Button
                                  variant="success"
                                  onClick={() =>
                                    enableDisableUserFn({ uuid: employee.uuid })
                                  }
                                >
                                  Sim
                                </Button>
                                <Button
                                  variant="ghost"
                                  onClick={() => {
                                    setIsConfirmActivateDialogOpen(false);
                                  }}
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
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
