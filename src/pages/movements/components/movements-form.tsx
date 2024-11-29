import {
  DialogContent,
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products/get-products";
import { SelectGroup } from "@radix-ui/react-select";
import { createMovement } from "@/api/movements/create-movement";
import { queryClient } from "@/lib/react-query";
import { Textarea } from "@/components/ui/textarea";

const movementSchema = z.object({
  observation: z.string().min(1, "O nome para a movimentação é obrigatório"),
  quantity: z.coerce
    .number()
    .min(1, "Precisa de pelo menos 1 produto para movimentar"),
  origin: z.string(),
  movementDate: z.coerce.date(),
  destination: z.string(),
  type: z.string(),
  productUuid: z.string(),
});

type MovementSchema = z.infer<typeof movementSchema>;

export function MovementsForm() {
  const form = useForm<MovementSchema>({
    resolver: zodResolver(movementSchema),
  });

  const { handleSubmit, reset, register } = form;

  const { mutateAsync: createMovementFn } = useMutation({
    mutationFn: createMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movements"],
      });
    },
  });

  async function sendMovementForm(data: MovementSchema) {
    console.log("Movement form sent");
    createMovementFn(data);
    reset();
  }

  const { data: products } = useQuery({
    queryKey: ["products-to-select"],
    queryFn: () =>
      getProducts({
        page: 0,
        size: 999,
      }),
  });

  return (
    <DialogContent className="min-w-fit">
      <DialogHeader>
        <DialogTitle>Movimentação</DialogTitle>
      </DialogHeader>
      <section>
        <Form {...form}>
          <form onSubmit={handleSubmit(sendMovementForm)} className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6 space-y-4">
                <FormField
                  control={form.control}
                  name="productUuid"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="">Produto</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o produto que irá ser movimentado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {products && products?.data.length > 0 ? (
                            products.data.map((product) => (
                              <SelectItem
                                key={product.uuid}
                                value={product.uuid}
                              >
                                {product.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectGroup>
                              <SelectLabel>
                                Nenhum produto encontrado
                              </SelectLabel>
                            </SelectGroup>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="type">Tipo</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de movimentação" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ENTRADA">Entrada</SelectItem>
                          <SelectItem value="SAIDA">Saída</SelectItem>
                          <SelectItem value="PERDA">Perda</SelectItem>
                          <SelectItem value="DEVOLUCAO">Devolução</SelectItem>
                          <SelectItem value="AJUSTE">Ajuste</SelectItem>
                          <SelectItem value="TRANSFERÊNCIA">
                            Transferência
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="movementDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Label>Data da movimentação</Label>
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
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="observation">Observação:</Label>
                  <Textarea
                    className="col-span-5"
                    {...register("observation")}
                    placeholder="Alguma observação da movimentação."
                    id="observation"
                  />
                </div>
              </div>
              <div className="col-span-6">
                <FormItem>
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    type="number"
                    {...register("quantity")}
                  />
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <Label htmlFor="origin">Origem</Label>
                  <Input id="origin" {...register("origin")} />
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <Label htmlFor="destination">Destino</Label>
                  <Input id="destination" {...register("destination")} />
                  <FormMessage />
                </FormItem>
              </div>
            </div>

            <Separator className="w-full" />
            <DialogFooter className="flex justify-end">
              <Button type="submit">Criar Movimentação</Button>
            </DialogFooter>
          </form>
        </Form>
      </section>
      <DialogFooter></DialogFooter>
    </DialogContent>
  );
}
