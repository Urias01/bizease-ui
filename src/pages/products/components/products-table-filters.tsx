import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";

const productsFiltersSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  isActive: z.string().optional(),
});

type ProductsFiltersSchema = z.infer<typeof productsFiltersSchema>;

export function ProductsTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const isActive = searchParams.get("status");

  const { register, handleSubmit, reset, control } =
    useForm<ProductsFiltersSchema>({
      resolver: zodResolver(productsFiltersSchema),
      defaultValues: {
        id: id || "",
        name: name || "",
        isActive: isActive || "",
      },
    });

  function handleFilter(data: ProductsFiltersSchema) {
    const id = data.id?.toString();
    const name = data.name?.toString();
    const isActive = data.isActive?.toString();

    setSearchParams((prev) => {
      if (id) {
        prev.set("id", id);
      } else {
        prev.delete("id");
      }

      if (name) {
        prev.set("name", name);
      } else {
        prev.delete("name");
      }

      if (isActive) {
        prev.set("isActive", isActive);
      } else {
        prev.delete("isActive");
      }

      prev.set("page", "1");

      return prev;
    });
  }

  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete("id");
      prev.delete("name");
      prev.delete("isActive");
      prev.set("page", "1");

      return prev;
    });

    reset({
      id: "",
      name: "",
      isActive: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex flex-col md:flex-row items-start gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <div className="flex flex-wrap md:flex-row items-center gap-2 flex-1">
        <Input
          placeholder="ID do produto"
          className="h-8 w-full md:w-1/3"
          {...register("id")}
        />
        <Input
          placeholder="Nome do produto"
          className="h-8 w-full md:w-1/3"
          {...register("name")}
        />
        <Controller
          control={control}
          name="isActive"
          render={({ field: { name, onChange, value, disabled } }) => {
            return (
              <Select
                name={name}
                onValueChange={onChange}
                defaultValue={value}
                disabled={disabled}
              >
                <SelectTrigger className="h-8 w-full md:w-1/4">
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Ativo</SelectItem>
                  <SelectItem value="INACTIVE">Inativo</SelectItem>
                </SelectContent>
              </Select>
            );
          }}
        />
      </div>
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
