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

const purcharsesFiltersSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

type PurcharsesFiltersSchema = z.infer<typeof purcharsesFiltersSchema>;

export function PurcharsesTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const status = searchParams.get("status");

  const { register, handleSubmit, reset, control } = useForm({
    resolver: zodResolver(purcharsesFiltersSchema),
    defaultValues: {
      status: status || "all",
      id: id || "",
    },
  });

  function handleFilter(data: PurcharsesFiltersSchema) {
    const id = data.id?.toString();
    const status = data.status?.toString();

    setSearchParams((prev) => {
      if (id) {
        prev.set("id", id);
      } else {
        prev.delete("id");
      }

      if (status) {
        prev.set("status", status);
      } else {
        prev.delete("status");
      }

      prev.set("page", "1");

      return prev;
    });
  }

  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete("id");
      prev.delete("customerName");
      prev.delete("status");
      prev.set("page", "1");

      return prev;
    });

    reset({
      id: "",
      status: "all",
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
          placeholder="ID da venda"
          className="h-10 w-full md:w-1/3"
          {...register("id")}
        />

        <Controller
          control={control}
          name="status"
          render={({ field: { name, onChange, value, disabled } }) => {
            return (
              <Select
                name={name}
                onValueChange={onChange}
                value={value}
                disabled={disabled}
              >
                <SelectTrigger className="h-10 w-full md:w-1/4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos status</SelectItem>
                  <SelectItem value="REALIZADO">Realizado</SelectItem>
                  <SelectItem value="CONFIRMADO">Confirmado</SelectItem>
                  <SelectItem value="RECEBIDO">Recebido</SelectItem>
                  <SelectItem value="CANCELADO">Cancelado</SelectItem>
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
