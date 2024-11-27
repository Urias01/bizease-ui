import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const employeeSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z
    .string()
    .email("Formato de e-mail inválido")
    .min(1, "E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  role: z.enum(["EMPLOYEE", "OWNER"]),
  isActive: z.boolean(),
  commerceUuid: z.string(),
});

type EmployeeSchema = z.infer<typeof employeeSchema>;

export function EmployeesForm() {
  const form = useForm<EmployeeSchema>({
    resolver: zodResolver(employeeSchema),
  });

  const { register, handleSubmit, reset } = form;

  async function sendEmployeeForm(data: EmployeeSchema) {
    console.log(data);
    reset();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Funcionário</DialogTitle>
      </DialogHeader>
      <section>
        <Form {...form}>
          <form onSubmit={handleSubmit(sendEmployeeForm)} className="space-y-4">
            <FormItem>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register("name")} />
              <FormMessage />
            </FormItem>
            <FormItem>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="e-mail" {...register("email")} />
              <FormMessage />
            </FormItem>
            <FormItem>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register("password")} />
              <FormMessage />
            </FormItem>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="role">Função</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma função para o usuário" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="EMPLOYEE">Funcionário</SelectItem>
                      <SelectItem value="OWNER">Dono / Sócio</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Funcionário ativo?</Label>
                    <FormDescription>
                      Caso desativado ele não conseguirá logar no sistema
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Criar funcionário</Button>
            </DialogFooter>
          </form>
        </Form>
      </section>
    </DialogContent>
  );
}
