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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
});

type SalesSchame = z.infer<typeof salesSchema>;

export function PurcharsesForm() {
  const form = useForm<SalesSchame>({
    resolver: zodResolver(salesSchema),
  });

  const { register, handleSubmit, reset } = form;

  async function registerSales(data: SalesSchame) {
    console.log(data);
    reset();
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Criar nova compra</DialogTitle>
        <DialogDescription>
          Crie novas compras para ter controle de saída do seu estoque
        </DialogDescription>
      </DialogHeader>
      <Separator className="w-full" />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(registerSales)}
          className="grid gap-4 py-4"
        >
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
                    <SelectItem value="112fasfa">Solicitado</SelectItem>
                    <SelectItem value="121rtrfas">A caminho</SelectItem>
                    <SelectItem value="121rtrfas">Recebido</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="asdad984as">Product 1</SelectItem>
                    <SelectItem value="asdqw198dqw">Product 2</SelectItem>
                    <SelectItem value="a4s9d4q9w1dqw">Product 3</SelectItem>
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

          <Separator className="w-full" />
          <DialogFooter>
            <Button type="submit">Cradastrar Compra</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
