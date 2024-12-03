import { getProducts } from "@/api/products/get-products";
import { createPurcharseOrder } from "@/api/purcharse-order/create-purcharse-order";
import { getSuppliers } from "@/api/suppliers/get-suppliers";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
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
import { queryClient } from "@/lib/react-query";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const purcharseOrderSchema = z.object({
  status: z.string(),
  orderDate: z.coerce.date(),
  expectedDeliveryDate: z.coerce.date(),
  quantity: z.coerce.number(),
  supplierUuid: z.string(),
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
  expirationDate: z.coerce.date(),
});

type PurcharseOrderSchema = z.infer<typeof purcharseOrderSchema>;

export function PurcharsesForm() {
  const [purcharseOrderItems, setPurcharseOrderItems] = useState<
    {
      quantity: number;
      unitPrice: number;
      productUuid: string;
      expirationDate: Date;
    }[]
  >([]);

  const form = useForm<PurcharseOrderSchema>({
    resolver: zodResolver(purcharseOrderSchema),
  });

  const { register, handleSubmit, reset, watch, setValue } = form;

  const { mutateAsync: createPurcharseOrderFn } = useMutation({
    mutationFn: createPurcharseOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["purcharse-order"],
      });
    },
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

  const { data: resultSupplier } = useQuery({
    queryKey: ["suppliers-to-select"],
    queryFn: () =>
      getSuppliers({
        page: 0,
        size: 999,
      }),
  });

  async function registerPurcharse(data: PurcharseOrderSchema) {
    const purcharseData = {
      status: data.status,
      orderDate: data.orderDate,
      expectedDeliveryDate: data.expectedDeliveryDate,
      supplierUuid: data.supplierUuid,
      purcharseOrderItems: purcharseOrderItems,
    };

    createPurcharseOrderFn(purcharseData);
    reset();
    setPurcharseOrderItems([]);
  }

  function addPurcharseOrderItem() {
    const quantity = watch("quantity");
    let unitPrice = watch("unitPrice");
    const productUuid = watch("productUuid");
    const expirationDate = watch("expirationDate");

    unitPrice = parseFloat(unitPrice.toString().replace(",", "."));

    if (quantity && unitPrice && productUuid) {
      setPurcharseOrderItems((prev) => [
        ...prev,
        { quantity, unitPrice, productUuid, expirationDate },
      ]);

      setValue("quantity", 0);
      setValue("unitPrice", 0);
      setValue("productUuid", "");
    }
  }

  return (
    <DialogContent className="min-w-fit">
      <DialogHeader>
        <DialogTitle>Criar nova compra</DialogTitle>
        <DialogDescription>
          Crie novas compras para ter controle de saída do seu estoque
        </DialogDescription>
      </DialogHeader>
      <Separator className="w-full" />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(registerPurcharse)}
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
                          <SelectValue placeholder="Selecione o status da compra" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="REALIZADO">Realizado</SelectItem>
                        <SelectItem value="CONFIRMADO">Confirmado</SelectItem>
                        <SelectItem value="RECEBIDO">Recebido</SelectItem>
                        <SelectItem value="CANCELADO">Cancelado</SelectItem>
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
                name="expectedDeliveryDate"
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
                name="supplierUuid"
                render={({ field }) => (
                  <FormItem>
                    <Label>Fornecedor</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um fornecedor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resultSupplier &&
                          Array.isArray(resultSupplier.data) &&
                          resultSupplier.data.map((supplier) => (
                            <SelectItem
                              key={supplier.uuid}
                              value={supplier.uuid}
                            >
                              {supplier.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
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

              <FormField
                control={form.control}
                name="expirationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Label>Validade do produto</Label>
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

              <div className="flex flex-row-reverse">
                <Button
                  variant="outline"
                  type="button"
                  onClick={addPurcharseOrderItem}
                >
                  Adicionar produto
                </Button>
              </div>
            </div>
            <div className="col-span-6">
              <Card className="min-h-full">
                {purcharseOrderItems.length > 0 ? (
                  <ul className="p-4 space-y-2">
                    {purcharseOrderItems.map((purcharseOrderItem, index) => (
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
                                  product.uuid ===
                                  purcharseOrderItem.productUuid
                              );
                              return foundProduct
                                ? foundProduct.name
                                : "Produto não encontrado";
                            })()}
                        </span>
                        <span>{purcharseOrderItem.quantity}</span> |
                        <span>
                          R$ {Number(purcharseOrderItem.unitPrice).toFixed(2)}
                        </span>{" "}
                        <span>
                          Total: R${" "}
                          {Number(
                            purcharseOrderItem.unitPrice *
                              purcharseOrderItem.quantity
                          ).toFixed(2)}
                        </span>{" "}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-muted-foreground col-span-6">
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
