import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const movementsFiltersSchema = z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  origin: z.string().optional(),
});

type MovementsFiltersSchema = z.infer<typeof movementsFiltersSchema>;

export function MovementsTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const origin = searchParams.get("origin");

  const { register, handleSubmit, reset, control } =
    useForm<MovementsFiltersSchema>({
      resolver: zodResolver(movementsFiltersSchema),
      defaultValues: {
        id: id || "",
        type: type || "",
        origin: origin || "",
      },
    });

  function handleFilter(data: MovementsFiltersSchema) {
    const id = data.id?.toString();
    const type = data.type?.toString();
    const origin = data.origin?.toString();

    setSearchParams((prev) => {
      if (id) {
        prev.set("id", id);
      } else {
        prev.delete("id");
      }

      if (type) {
        prev.set("type", type);
      } else {
        prev.delete("type");
      }

      if (origin) {
        prev.set("origin", origin);
      } else {
        prev.delete("origin");
      }

      prev.set("page", "1");

      return prev;
    });
  }

  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete("id");
      prev.delete("type");
      prev.delete("origin");
      prev.set("page", "1");

      return prev;
    });

    reset({
      id: "",
      type: "",
      origin: "",
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
          placeholder="ID da movimentação"
          className="h-8 w-full md:w-1/3"
          {...register("id")}
        />
        <Input
          placeholder="Localização da movimentação"
          className="h-8 w-full md:w-1/3"
          {...register("origin")}
        />
        <Controller
          control={control}
          name="type"
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
                  <SelectItem value="ENTRADA">Entrada</SelectItem>
                  <SelectItem value="SAIDA">Saída</SelectItem>
                  <SelectItem value="PERDA">Perda</SelectItem>
                  <SelectItem value="DEVOLUCAO">Devolução</SelectItem>
                  <SelectItem value="AJUSTE">Ajuste</SelectItem>
                  <SelectItem value="TRANSFERENCIA">Transferência</SelectItem>
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
