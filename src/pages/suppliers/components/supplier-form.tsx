import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";

const supplierSchema = z.object({
  uuid: z.string().nullish(),
  cnpj: z.string(),
  name: z.string().min(1, "Nome é obrigatório"),
  address: z.string(),
  address_number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  uf: z.string(),
  postalCode: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
});

type SupplierSchema = z.infer<typeof supplierSchema>;

interface SupplierFormProps {
  uuid?: string;
}

export function SupplierForm({ uuid }: SupplierFormProps) {
  const form = useForm<SupplierSchema>({
    resolver: zodResolver(supplierSchema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  async function sendSupplierForm(data: SupplierSchema) {
    console.log(data, uuid);
    reset();
  }

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
                      {(inputProps: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>) => (
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
                      {(inputProps: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>) => (
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
                      {(inputProps: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>) => (
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
                  <Label htmlFor="address_number">Número</Label>
                  <Input
                    id="address_number"
                    placeholder="Ex.. 52A"
                    {...register("address_number")}
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
          <Button type="submit" disabled={isSubmitting}>
            Criar fornecedor
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
