import { getCategories } from "@/api/categories/get-categories";
import { createProduct } from "@/api/products/create-product";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { queryClient } from "@/lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2, "O campo nome é obrigatório o preenchimento"),
  unit: z.coerce.number(),
  minimumStock: z.coerce.number(),
  categoryId: z.string(),
  description: z.string(),
});

type ProductSchema = z.infer<typeof productSchema>;

export function ProductForm() {
  const [searchParams] = useSearchParams();

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });

  const { register, handleSubmit, reset } = form;

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const name = searchParams.get("name");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result } = useQuery({
    queryKey: ["categories", page, name],
    queryFn: () =>
      getCategories({
        page,
        name,
      }),
  });

  async function registerProduct(data: ProductSchema) {
    await createProductFn(data)
      .then(() => {
        toast.success("Produto criado com sucesso");
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Ocorreu um erro desconhecido");
        }
      });

    reset();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Criar novo produto</DialogTitle>
        <DialogDescription>
          Crie novos produtos para o seu comércio aqui, não se esqueça de
          cadastrar uma categoria para o seu produto
        </DialogDescription>
      </DialogHeader>
      <Separator className="w-full" />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(registerProduct)}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="name">Nome:</Label>
            <Input className="col-span-5" id="name" {...register("name")} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unit">Quantidade:</Label>
              <Input id="unit" {...register("unit")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimumStock">
                Quantidade mínima em estoque:
              </Label>
              <Input id="minimumStock" {...register("minimumStock")} />
            </div>
          </div>
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <Label>Categoria</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categorias</SelectLabel>
                      {result?.data?.length === 0 ? (
                        <SelectLabel>Nenhuma categoria cadastrada</SelectLabel>
                      ) : (
                        result?.data?.length &&
                        result.data.map((category) => {
                          return (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          );
                        })
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="description">Descrição:</Label>
            <Textarea
              className="col-span-5"
              {...register("description")}
              placeholder="Descreva seu produto aqui."
              id="description"
            />
          </div>
          <Separator className="w-full" />
          <DialogFooter>
            <Button type="submit">Criar produto</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
