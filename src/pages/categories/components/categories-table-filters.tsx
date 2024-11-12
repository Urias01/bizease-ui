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

// const ordersFiltersSchema = z.object({
//   orderId: z.string().optional(),
//   customerName: z.string().optional(),
//   status: z.string().optional(),
// })

// type OrderFiltersSchema = z.infer<typeof ordersFiltersSchema>

export function CategoriesTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // const orderId = searchParams.get('orderId')
  // const customerName = searchParams.get('customerName')
  const status = searchParams.get("status");

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      status: status || "all",
    },
  });

  // function handleFilter(data: OrderFiltersSchema) {
  //   const orderId = data.orderId?.toString()
  //   const customerName = data.customerName?.toString()
  //   const status = data.status?.toString()

  //   setSearchParams((prev) => {
  //     if (orderId) {
  //       prev.set('orderId', orderId)
  //     } else {
  //       prev.delete('orderId')
  //     }

  //     if (customerName) {
  //       prev.set('customerName', customerName)
  //     } else {
  //       prev.delete('customerName')
  //     }

  //     if (status) {
  //       prev.set('status', status)
  //     } else {
  //       prev.delete('status')
  //     }

  //     prev.set('page', '1')

  //     return prev
  //   })
  // }

  // function handleClearFilters() {
  //   setSearchParams((prev) => {
  //     prev.delete('orderId')
  //     prev.delete('customerName')
  //     prev.delete('status')
  //     prev.set('page', '1')

  //     return prev
  //   })

  //   reset({
  //     orderId: '',
  //     customerName: '',
  //     status: 'all',
  //   })
  // }

  // const hasAnyFilter = !!orderId || !!customerName || !!status

  return (
    <form className="flex flex-col md:flex-row items-start gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="ID da categoria" className="h-8 w-full md:w-1/2" />
      <Input placeholder="Nome da categoria" className="h-8 w-full md:w-1/2" />
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
              <SelectTrigger className="h-8 w-full md:w-1/3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Ativo</SelectItem>
                <SelectItem value="canceled">Inativo</SelectItem>
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

        <Button type="button" variant="outline" size="xs">
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      </div>
    </form>
  );
}
