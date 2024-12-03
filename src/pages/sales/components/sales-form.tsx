import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { getProducts } from "@/api/products/get-products";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { createSalesOrder } from "@/api/sales-order-items/create-sales-order";

const salesSchema = z.object({
  status: z.string(),
  orderDate: z.coerce.date(),
  deliveryDate: z.coerce.date(),
  quantity: z.coerce.number(),
  unitPrice: z
    .string()
    .regex(
      /^\d+((,\d{2})|(\.\d{2}))?$/,
      "O preço deve estar no formato 00,00 ou 00.00"
    )
    .transform((value) =>
      value.includes(",")
        ? parseFloat(value.replace(".", "").replace(",", "."))
        : parseFloat(value)
    ),
  productUuid: z.string(),
  statusProduct: z.string(),
});

type SalesSchame = z.infer<typeof salesSchema>;

export function SalesForm() {
  const [salesOrdemItems, setSalesOrdemItems] = useState<
    {
      quantity: number;
      unitPrice: number;
      productUuid: string;
      status: string;
    }[]
  >([]);

  const form = useForm<SalesSchame>({
    resolver: zodResolver(salesSchema),
  });

  const { data: result } = useQuery({
    queryKey: ["products-to-select"],
    queryFn: () =>
      getProducts({
        page: 0,
        size: 999,
        isActive: "ACTIVE",
      }),
  });

  const { mutateAsync: createSalesOrderFn } = useMutation({
    mutationFn: createSalesOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sales-order"],
      });
    },
  });

  const { register, handleSubmit, reset, watch, setValue } = form;

  async function registerSales(data: SalesSchame) {
    const salesData = {
      status: data.status,
      orderDate: data.orderDate,
      deliveryDate: data.deliveryDate,
      salesOrdersItems: salesOrdemItems,
    };

    createSalesOrderFn(salesData);
    reset();
    setSalesOrdemItems([]);
  }

  function addSalesOrderItem() {
    const quantity = watch("quantity");
    let unitPrice = watch("unitPrice");
    const productUuid = watch("productUuid");
    const status = watch("statusProduct");

    unitPrice = parseFloat(unitPrice.toString().replace(",", "."));

    if (quantity && unitPrice && productUuid) {
      setSalesOrdemItems((prev) => [
        ...prev,
        { quantity, unitPrice, productUuid, status },
      ]);

      setValue("quantity", 0);
      setValue("unitPrice", 0);
      setValue("productUuid", "");
    }
  }

  return (
    <DialogContent className="min-w-fit">
      <DialogHeader>
        <DialogTitle>Criar nova venda</DialogTitle>
        <DialogDescription>
          Crie novas vendas para ter controle de saída do seu estoque
        </DialogDescription>
      </DialogHeader>
      <Separator className="w-full" />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(registerSales)}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 space-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="">Status</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status da venda" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PENDENTE">Pendente</SelectItem>
                        <SelectItem value="CONFIRMADO">Confirmado</SelectItem>
                        <SelectItem value="ENVIADO">Enviado</SelectItem>
                        <SelectItem value="ENTREGUE">Entregue</SelectItem>
                        <SelectItem value="CANCELADO">Cancelado</SelectItem>
                        <SelectItem value="DEVOLVIDO">Devolvido</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="orderDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Label>Data do pedido</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd 'de' MMMM 'de' yyyy", {
                                locale: ptBR,
                              })
                            ) : (
                              <span>Escolha uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Label>Data de entrega</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd 'de' MMMM 'de' yyyy", {
                                locale: ptBR,
                              })
                            ) : (
                              <span>Escolha uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productUuid"
                render={({ field }) => (
                  <FormItem>
                    <Label>Produto</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um produto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {result &&
                          Array.isArray(result.data) &&
                          result.data.map((product) => (
                            <SelectItem key={product.uuid} value={product.uuid}>
                              {product.name}
                            </SelectItem>
                          ))}
                        <SelectItem value="asdad984as">Product 1</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-6 gap-4">
                <FormItem className="col-span-2">
                  <Label>Quantidade</Label>
                  <Input type="number" {...register("quantity")} />
                </FormItem>
                <FormItem className="col-span-4">
                  <Label>Preço unitário</Label>
                  <Input {...register("unitPrice")} />
                </FormItem>
              </div>

              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="statusProduct"
                  render={({ field }) => (
                    <FormItem className="w-full mr-4">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status do produto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DISPONIVEL">Disponível</SelectItem>
                          <SelectItem value="RESERVADO">Reservado</SelectItem>
                          <SelectItem value="Devolvido">Devolvido</SelectItem>
                          <SelectItem value="DANIFICADO">Danificado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="outline"
                  type="button"
                  onClick={addSalesOrderItem}
                >
                  Adicionar produto
                </Button>
              </div>
            </div>
            <div className="col-span-6">
              <Card className="min-h-full">
                {salesOrdemItems.length > 0 ? (
                  <ul className="p-4 space-y-2">
                    {salesOrdemItems.map((salesOrderItem, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center border-b pb-2 gap-2"
                      >
                        <span>
                          {result &&
                            Array.isArray(result.data) &&
                            (() => {
                              const foundProduct = result.data.find(
                                (product) =>
                                  product.uuid === salesOrderItem.productUuid
                              );
                              return foundProduct
                                ? foundProduct.name
                                : "Produto não encontrado";
                            })()}
                        </span>
                        |<span>{salesOrderItem.status}</span> |
                        <span>{salesOrderItem.quantity}</span> |
                        <span>
                          R$ {Number(salesOrderItem.unitPrice).toFixed(2)}
                        </span>{" "}
                        <span>
                          Total: R${" "}
                          {Number(
                            salesOrderItem.unitPrice * salesOrderItem.quantity
                          ).toFixed(2)}
                        </span>{" "}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-muted-foreground">
                    Nenhum produto adicionado.
                  </div>
                )}
              </Card>
            </div>
          </div>

          <Separator className="w-full" />
          <DialogFooter>
            <Button type="submit">Cradastrar Venda</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
