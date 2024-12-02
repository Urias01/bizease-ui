import { getUserByUuid } from "@/api/user/get-user-by-uuid";
import { updateUser } from "@/api/user/update-user";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface EmployeesEditFormProps {
  uuid: string;
  open: boolean;
}

const employeeSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z
    .string()
    .email("Formato de e-mail inválido")
    .min(1, "E-mail é obrigatório"),
  role: z.enum(["EMPLOYEE", "OWNER"]),
});

type EmployeeSchema = z.infer<typeof employeeSchema>;

export function EmployeesEditForm({ uuid, open }: EmployeesEditFormProps) {
  const form = useForm<EmployeeSchema>({
    resolver: zodResolver(employeeSchema),
  });

  const { register, handleSubmit, setValue } = form;

  const { data: user } = useQuery({
    queryKey: ["user", uuid],
    queryFn: () => {
      if (uuid) {
        return getUserByUuid({ uuid });
      }
    },
    enabled: open,
  });

  const { mutateAsync: updateUserFn } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  async function sendEmployeeForm(data: EmployeeSchema) {
    updateUserFn({ uuid, ...data }).then(() => {
      toast.success("Usuário atualizado com sucesso!");
    });
  }

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("role", user.role);
    }
  }, [user, setValue]);
  return (
    <DialogContent>
      <DialogDescription></DialogDescription>
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
              <Button type="submit">Editar funcionário</Button>
            </DialogFooter>
          </form>
        </Form>
      </section>
    </DialogContent>
  );
}
