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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { CategoriesEditForm } from "./categories-edit-form";

export function CategoriesTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCategoryDetailsOpen, setIsCategoryDetailsOpen] = useState(false);

  const [selectedCategoryUuid, setSelectedCategoryUuid] = useState<string>("");

  const handleCategorySelect = (categoryUuid: string) => {
    setSelectedCategoryUuid(categoryUuid);
    setIsCategoryDetailsOpen(true);
  };

  const categoriesId = searchParams.get("categoriesId");
  const name = searchParams.get("name");

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories", pageIndex, name, categoriesId],
    queryFn: () =>
      getCategories({
        page: pageIndex,
        name,
        id: categoriesId,
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
              <TableHead>Descrição</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingCategories && <TableCategoriesSkeleton />}
            {result?.data?.length !== undefined && result?.data?.length > 0
              ? result.data.map((category) => {
                  return (
                    <TableRow key={category.id}>
                      <TableCell>
                        <Dialog
                          open={
                            isCategoryDetailsOpen &&
                            selectedCategoryUuid === category.uuid
                          }
                          onOpenChange={setIsCategoryDetailsOpen}
                        >
                          <DialogTrigger asChild>
                            <Pencil
                              className="h-3 w-3 cursor-pointer"
                              onClick={() =>
                                handleCategorySelect(category.uuid)
                              }
                            />
                          </DialogTrigger>
                          <CategoriesEditForm
                            uuid={selectedCategoryUuid}
                            open={isCategoryDetailsOpen}
                          />
                        </Dialog>
                      </TableCell>
                      <TableCell>{category.id}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        {category.description.length > 84
                          ? category.description.substring(0, 84).concat("...")
                          : category.description}
                      </TableCell>
                      <TableCell className="w-48">
                        {category.isActive === "ACTIVE" ? (
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
                    </TableRow>
                  );
                })
              : isLoadingCategories !== true && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Nenhuma categoria encontrada.
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
