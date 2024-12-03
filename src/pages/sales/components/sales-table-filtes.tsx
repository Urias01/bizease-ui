import { CalendarIcon, Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ptBR } from "date-fns/locale";

const salesTableFiltersSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

type SalesTableFiltersSchema = z.infer<typeof salesTableFiltersSchema>;

export function SalesTableFilters() {
  const [date, setDate] = useState<Date>();

  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const status = searchParams.get("status");

  const { register, handleSubmit, reset, control } = useForm({
    resolver: zodResolver(salesTableFiltersSchema),
    defaultValues: {
      status: status || "all",
    },
  });

  function handleFilter(data: SalesTableFiltersSchema) {
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full md:w-1/3 justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="h-4 w-4" />
              {date ? (
                format(date, "PPP", {
                  locale: ptBR,
                })
              ) : (
                <span>Selecione uma data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
            <Select
              onValueChange={(value) =>
                setDate(addDays(new Date(), parseInt(value)))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="0">Today</SelectItem>
                <SelectItem value="1">Tomorrow</SelectItem>
                <SelectItem value="3">In 3 days</SelectItem>
                <SelectItem value="7">In a week</SelectItem>
              </SelectContent>
            </Select>
            <div className="rounded-md border">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </div>
          </PopoverContent>
        </Popover>
        |
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
                  <SelectItem value="PENDENTE">Pendente</SelectItem>
                  <SelectItem value="CONFIRMADO">Confirmado</SelectItem>
                  <SelectItem value="ENVIADO">Enviado</SelectItem>
                  <SelectItem value="ENTREGUE">Entregue</SelectItem>
                  <SelectItem value="CANCELADO">Cancelado</SelectItem>
                  <SelectItem value="DEVOLVIDO">Devolvido</SelectItem>
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
