import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableCategoriesSkeleton } from "./categories-skeleton-table";
import { getCategories } from "@/api/categories/get-categories";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { Pagination } from "@/components/pagination";

export function CategoriesTable() {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories", page, name],
    queryFn: () =>
      getCategories({
        page,
        name,
      }),
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Id.</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingCategories && <TableCategoriesSkeleton />}
            {result?.data?.length !== undefined && result?.data?.length > 0
              ? result.data.map((category) => {
                  return (
                    <TableRow key={category.id}>
                      <TableCell>
                        <Pencil className="h-3 w-3" />
                      </TableCell>
                      <TableCell>{category.id}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        {category.description.length > 84
                          ? category.description.substring(0, 84).concat("...")
                          : category.description}
                      </TableCell>
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
                    <TableCell>Category</TableCell>
                    <TableCell>Description</TableCell>
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
