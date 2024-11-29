import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

const suppliersFiltersSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

type SuppliersFiltersSchema = z.infer<typeof suppliersFiltersSchema>;

export function SuppliersTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const { register, handleSubmit, reset } =
    useForm<SuppliersFiltersSchema>({
      resolver: zodResolver(suppliersFiltersSchema),
      defaultValues: {
        id: id || "",
        name: name || "",
      },
    });

  function handleFilter(data: SuppliersFiltersSchema) {
    const id = data.id?.toString();
    const name = data.name?.toString();

    setSearchParams((prev) => {
      if (id && id !== "") {
        console.log(id);
        prev.set("id", id);
      } else {
        prev.delete("id");
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
      prev.delete("id");
      prev.delete("name");
      prev.set("page", "1");

      return prev;
    });

    reset({
      id: "",
      name: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex flex-col md:flex-row items-start gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID do fornecedor"
        className="h-8 w-full md:w-1/4"
        {...register("id")}
      />
      <Input
        placeholder="Nome do fornecedor"
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
