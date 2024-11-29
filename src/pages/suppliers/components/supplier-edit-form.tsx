import { getSuppliersByUuid } from "@/api/suppliers/get-supplier-by-uuid";
import { updateSupplier } from "@/api/suppliers/update-suppliers";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { queryClient } from "@/lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { toast } from "sonner";
import { z } from "zod";

interface SupplierEditFormProps {
  uuid: string;
  open: boolean;
}

const supplierSchema = z.object({
  cnpj: z.string(),
  name: z.string().min(1, "Nome é obrigatório"),
  address: z.string(),
  addressNumber: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  uf: z.string(),
  postalCode: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  category: z.string(),
});

type SupplierSchema = z.infer<typeof supplierSchema>;

export function SupplierEditForm({ uuid, open }: SupplierEditFormProps) {
  const form = useForm<SupplierSchema>({
    resolver: zodResolver(supplierSchema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = form;

  const { mutateAsync: updateSupplierFn } = useMutation({
    mutationFn: updateSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });

  const { data: result } = useQuery({
    queryKey: ["supplier", uuid],
    queryFn: () => {
      if (uuid) {
        return getSuppliersByUuid({ uuid });
      }
    },
    enabled: open,
  });

  async function sendSupplierForm(data: SupplierSchema) {
    updateSupplierFn({ uuid, ...data }).then(() => {
      toast.success("Fornecedor atualizado com sucesso");
    });
  }

  useEffect(() => {
    if (result) {
      setValue("name", result.name);
      setValue("cnpj", result.cnpj);
      setValue("email", result.email);
      setValue("phoneNumber", result.phoneNumber);
      setValue("category", result.category);
      setValue("postalCode", result.postalCode);
      setValue("address", result.address);
      setValue("addressNumber", result.addressNumber);
      setValue("city", result.city);
      setValue("uf", result.uf);
      setValue("neighborhood", result.neighborhood);
    }
  }, [result, setValue]);

  return (
    <DialogContent className="min-w-fit">
      <DialogHeader>
        <DialogTitle>Criar novo fornecedor</DialogTitle>
        <DialogDescription>
          Crie novos fornecedores para o seu comércio aqui
        </DialogDescription>
      </DialogHeader>
      <Separator className="w-full" />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(sendSupplierForm)}
          className="w-full space-y-4"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormItem>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" {...register("name", { required: true })} />
                <FormMessage />
              </FormItem>
              <FormItem>
                <Label htmlFor="cnpj">CNPJ</Label>
                <FormField
                  name="cnpj"
                  control={form.control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputMask {...field} mask="99.999.999/9999-99">
                      {(
                        inputProps: React.ForwardRefExoticComponent<
                          InputProps & React.RefAttributes<HTMLInputElement>
                        >
                      ) => (
                        <Input
                          id="cnpj"
                          {...inputProps}
                          className="col-span-3"
                        />
                      )}
                    </InputMask>
                  )}
                />
                <FormMessage />
              </FormItem>
              <FormItem>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  placeholder="fulano@example.com"
                  {...register("email")}
                />
                <FormMessage />
              </FormItem>
              <FormItem>
                <Label htmlFor="phoneNumber">Telefone</Label>
                <FormField
                  name="phoneNumber"
                  control={form.control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputMask {...field} mask="(99) 99999-9999">
                      {(
                        inputProps: React.ForwardRefExoticComponent<
                          InputProps & React.RefAttributes<HTMLInputElement>
                        >
                      ) => (
                        <Input
                          id="phone"
                          {...inputProps}
                          className="col-span-3"
                        />
                      )}
                    </InputMask>
                  )}
                />
                <FormMessage />
              </FormItem>
              <FormItem>
                <Label htmlFor="category">Categoria</Label>
                <Input id="category" {...register("category")} />
                <FormMessage />
              </FormItem>
            </div>
            <div className="col-span-6">
              <FormItem className="col-span-4">
                <Label htmlFor="postalCode">CEP</Label>
                <FormField
                  name="postalCode"
                  control={form.control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputMask {...field} mask="99999-999">
                      {(
                        inputProps: React.ForwardRefExoticComponent<
                          InputProps & React.RefAttributes<HTMLInputElement>
                        >
                      ) => (
                        <Input
                          id="postalCode"
                          {...inputProps}
                          className="col-span-3"
                        />
                      )}
                    </InputMask>
                  )}
                />
                <FormMessage />
              </FormItem>
              <div className="grid grid-cols-6 gap-4">
                <FormItem className="col-span-4">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" {...register("address")} />
                  <FormMessage />
                </FormItem>
                <FormItem className="col-span-2">
                  <Label htmlFor="addressNumber">Número</Label>
                  <Input
                    id="addressNumber"
                    placeholder="Ex.. 52A"
                    {...register("addressNumber")}
                  />
                  <FormMessage />
                </FormItem>
              </div>
              <FormItem className="col-span-4">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" {...register("neighborhood")} />
                <FormMessage />
              </FormItem>
              <div className="grid grid-cols-6 gap-4">
                <FormItem className="col-span-4">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" {...register("city")} />
                  <FormMessage />
                </FormItem>
                <FormItem className="col-span-2">
                  <Label htmlFor="uf">Estado</Label>
                  <Input id="uf" placeholder="Ex.. SP" {...register("uf")} />
                  <FormMessage />
                </FormItem>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-row-reverse">
            <Button type="submit" disabled={isSubmitting}>
              Editar fornecedor
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
