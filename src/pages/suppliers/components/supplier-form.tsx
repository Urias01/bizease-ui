import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const supplierSchema = z.object({
  uuid: z.string().nullish(),
  cnpj: z.string(),
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Nome é obrigatório"),
  address: z.string(),
  address_number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  uf: z.string(),
  postalCode: z.string(),
  category: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
});

type SupplierSchema = z.infer<typeof supplierSchema>;

interface SupplierForm {
  uuid?: string;
}

export function SupplierForm({ uuid }: SupplierForm) {
  const form = useForm<SupplierSchema>({
    resolver: zodResolver(supplierSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  async function sendSupplierForm(data: SupplierSchema) {
    data.uuid = uuid || "";
    console.log(data);
    alert(data);
  }

  console.log(isValid);

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
          className="grid gap-4 py-4"
        >
          <section className="grid grid-cols-12 gap-4">
            <div className="col-span-6 gap-4">
              <div className="space-y-4">
                <Label htmlFor="name">Nome:</Label>
                <Input
                  className="col-span-5"
                  id="name"
                  {...(register("name"), { required: true })}
                />
                {errors.name && (
                  <span className="mt-2 text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="space-y-4">
                <Label htmlFor="cnpj">Cnpj:</Label>
                <Input className="col-span-5" id="cnpj" {...register("cnpj")} />
              </div>
              <div className="space-y-4">
                <Label htmlFor="category">Categoria:</Label>
                <Input
                  className="col-span-5"
                  id="category"
                  {...register("category")}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="space-y-4">
                <Label htmlFor="postalCode">CEP:</Label>
                <Input
                  className="col-span-5"
                  id="postalCode"
                  {...register("postalCode")}
                />
              </div>

              <div className="grid grid-cols-6 gap-4">
                <div className="space-y-2 col-span-4">
                  <Label htmlFor="address">Endereço:</Label>
                  <Input id="address" {...register("address")} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address_number">Número:</Label>
                  <Input
                    id="address_number"
                    placeholder="Ex.. 52A"
                    {...register("address_number")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-4">
                <div className="space-y-2 col-span-4">
                  <Label htmlFor="city">Cidade:</Label>
                  <Input id="city" {...register("city")} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="uf">Estado:</Label>
                  <Input id="uf" placeholder="Ex.. SP" {...register("uf")} />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="neighborhood">Bairro:</Label>
                <Input
                  className="col-span-5"
                  id="neighborhood"
                  {...register("neighborhood")}
                />
              </div>
            </div>
          </section>

          <Separator className="w-full" />
          <DialogFooter>
            <Button
              className="disabled:opacity-75 disabled:cursor-not-allowed"
              disabled={isValid}
            >
              Criar fornecedor
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
