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

const employeeFiltersSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  isActive: z.string().optional(),
});

type EmployeeFiltersSchema = z.infer<typeof employeeFiltersSchema>;

export function EmployeesTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const isActive = searchParams.get("isActive");

  const { register, handleSubmit, reset, control } =
    useForm<EmployeeFiltersSchema>({
      resolver: zodResolver(employeeFiltersSchema),
      defaultValues: {
        id: id || "",
        name: name || "",
        email: email || "",
        isActive: isActive || "all",
      },
    });

  function handleFilter(data: EmployeeFiltersSchema) {
    const id = data.id?.toString();
    const name = data.name?.toString();
    const email = data.email?.toString();
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

      if (email) {
        prev.set("email", email);
      } else {
        prev.delete("email");
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
      prev.delete("email");
      prev.delete("isActive");
      prev.set("page", "1");

      return prev;
    });

    reset({
      id: "",
      name: "",
      email: "",
      isActive: "all",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex flex-col md:flex-row items-start gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID do funcionário"
        className="h-8 w-full md:w-1/4"
        {...register("id")}
      />
      <Input
        placeholder="Nome do funcionário"
        className="h-8 w-full md:w-2/4"
        {...register("name")}
      />
      <Input
        placeholder="E-mail do funcionário"
        className="h-8 w-full md:w-2/4"
        {...register("email")}
      />
      <Controller
        control={control}
        name="isActive"
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-full md:w-1/4">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
                <SelectItem value="INACTIVE">Inativo</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
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
