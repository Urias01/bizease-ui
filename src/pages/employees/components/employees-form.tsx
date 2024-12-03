import { createEmployee } from "@/api/user/create-employee";
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
import { queryClient } from "@/lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
});

type EmployeeSchema = z.infer<typeof employeeSchema>;

export function EmployeesForm() {
  const form = useForm<EmployeeSchema>({
    resolver: zodResolver(employeeSchema),
  });

  const { register, handleSubmit, reset } = form;

  const { mutateAsync: createEmployeeFn } = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  async function sendEmployeeForm(data: EmployeeSchema) {
    createEmployeeFn(data);
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
            <DialogFooter>
              <Button type="submit">Criar funcionário</Button>
            </DialogFooter>
          </form>
        </Form>
      </section>
    </DialogContent>
  );
}
