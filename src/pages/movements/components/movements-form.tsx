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

const movementSchema = z.object({
  uuid: z.string(),
  observation: z.string().min(1, "O nome para a movimentação é obrigatório"),
  quantity: z.coerce
    .number()
    .min(1, "Precisa de pelo menos 1 produto para movimentar"),
  origin: z.string(),
  movementDate: z.date(),
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

  async function sendMovementForm(data: MovementSchema) {
    console.log(data);
    reset();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Movimentação</DialogTitle>
      </DialogHeader>
      <section>
        <Form {...form}>
          <form onSubmit={handleSubmit(sendMovementForm)} className="space-y-4">
            <FormItem>
              <Label htmlFor="type">Tipo</Label>
              <Input id="type" {...register("type")} />
              <FormMessage />
            </FormItem>
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
                      <SelectItem value="112fasfa">Produto 1</SelectItem>
                      <SelectItem value="121rtrfas">Produto 2</SelectItem>
                      <SelectItem value="112ff1rba">Produto 3</SelectItem>
                      <SelectItem value="15rtfh23qdf">Produto 4</SelectItem>
                      <SelectItem value="qtagf22tgwe">Produto 5</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <Label htmlFor="quantity">Quantidade</Label>
              <Input id="quantity" type="number" {...register("quantity")} />
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

            <Separator className="w-full" />
            <DialogFooter className="flex justify-end">
              <Button>Criar Movimentação</Button>
            </DialogFooter>
          </form>
        </Form>
      </section>
      <DialogFooter></DialogFooter>
    </DialogContent>
  );
}
