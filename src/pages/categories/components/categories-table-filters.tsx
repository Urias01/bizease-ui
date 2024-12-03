import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

const categoriesFilterSchema = z.object({
  categoriesId: z.string().optional(),
  name: z.string().optional(),
});

type CategoriesFilterSchema = z.infer<typeof categoriesFilterSchema>;

export function CategoriesTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoriesId = searchParams.get("categoriesId");
  const name = searchParams.get("name");

  const { register, handleSubmit, reset } = useForm<CategoriesFilterSchema>({
    resolver: zodResolver(categoriesFilterSchema),
    defaultValues: {
      categoriesId: categoriesId ?? "",
      name: name ?? "",
    },
  });

  function handleFilter(data: CategoriesFilterSchema) {
    const categoriesId = data.categoriesId?.toString().trim();
    const name = data.name?.toString();

    setSearchParams((prev) => {
      if (categoriesId && categoriesId !== "") {
        prev.set("categoriesId", categoriesId);
      } else {
        prev.delete("categoriesId");
      }

      if (name) {
        prev.set("name", name);
      } else {
        prev.delete("name");
      }

      prev.set("page", "1");

      return prev;
    });
  }

  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete("categoriesId");
      prev.delete("name");

      prev.set("page", "1");

      return prev;
    });

    reset({
      categoriesId: "",
      name: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex flex-col md:flex-row items-start gap-2 align-middle"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID da categoria"
        className="h-8 w-full md:w-1/4"
        {...register("categoriesId")}
      />
      <Input
        placeholder="Nome da categoria"
        className="h-8 w-full md:w-3/4"
        {...register("name")}
      />
      <div className="flex gap-2">
        <Button type="submit" variant="secondary" size="xs">
          <Search className="mr-2 h-4 w-4" />
          Filtrar resultados
        </Button>

        <Button
          type="button"
          variant="outline"
          size="xs"
          onClick={handleClearFilters}
        >
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      </div>
    </form>
  );
}
