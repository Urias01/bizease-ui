import { getUsersByCommerce } from "@/api/user/get-users-by-commerce";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { TableCategoriesSkeleton } from "@/pages/categories/components/categories-skeleton-table";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

export function EmployeesTable() {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["users", page, name],
    queryFn: () =>
      getUsersByCommerce({
        page,
        name,
      }),
  });

  return (
    <Table>
      <TableCaption>Lista de Categorias</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Id.</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Ativo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoadingCategories && <TableCategoriesSkeleton />}
        {result?.data?.length !== undefined && result?.data?.length > 0
          ? result.data.map((employee) => {
              return (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Pencil className="h-3 w-3" />
                  </TableCell>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.isActive}</TableCell>
                </TableRow>
              );
            })
          : isLoadingCategories !== true && (
              // <TableRow>
              //   <TableCell colSpan={4} className="text-center">
              //     Nenhuma categoria encontrada.
              //   </TableCell>
              // </TableRow>
              <TableRow>
                <TableCell>
                  <Pencil className="h-3 w-3" />
                </TableCell>
                <TableCell>1</TableCell>
                <TableCell>Funcionário X</TableCell>
                <TableCell>
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="font-medium text-muted-foreground">
                    Ativo
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outline">
                    Desativar
                  </Button>
                </TableCell>
              </TableRow>
            )}
      </TableBody>
      <TableFooter>
        <TableRow className="h-8">
          <TableCell colSpan={3}></TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
