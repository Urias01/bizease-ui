import { getCategories } from "@/api/categories/get-categories";
import { getProductByUuid } from "@/api/products/get-product-by-uuid";
import { updateProduct } from "@/api/products/update-product";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

interface ProductFormProps {
  uuid: string;
  open?: boolean;
}

const productSchema = z.object({
  name: z.string().min(2, "O campo nome é obrigatório o preenchimento"),
  unit: z.coerce.number(),
  minimumStock: z.coerce.number(),
  categoryUuid: z.string(),
  description: z.string(),
  location: z.string(),
});

type ProductSchema = z.infer<typeof productSchema>;

export function ProductEditForm({ uuid, open }: ProductFormProps) {
  const [searchParams] = useSearchParams();

  const { data: product } = useQuery({
    queryKey: ["product", uuid],
    queryFn: () => {
      if (uuid) {
        return getProductByUuid({ uuid });
      }
    },
    enabled: open,
  });

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });

  const { register, handleSubmit, setValue } = form;

  const { mutateAsync: updateProductFn } = useMutation({
    mutationFn: updateProduct,
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
    queryKey: ["categories-to-select", page, name],
    queryFn: () =>
      getCategories({
        page,
        name,
      }),
  });

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("unit", product.unit);
      setValue("minimumStock", product.minimumStock);
      setValue("description", product.description);
      setValue("location", product.location);
      setValue("categoryUuid", product.categoryUuid);
    }
  }, [product, setValue]);

  async function registerProduct(data: ProductSchema) {
    await updateProductFn({
      uuid,
      name: data.name,
      unit: data.unit,
      minimumStock: data.minimumStock,
      categoryUuid: data.categoryUuid,
      description: data.description,
    })
      .then(() => {
        toast.success("Produto atualizado com sucesso");
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Ocorreu um erro desconhecido");
        }
      });
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
            name="categoryUuid"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="categoryUuid">Categoria</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {result && result.data.length > 0 ? (
                      result.data.map((category) => (
                        <SelectItem key={category.id} value={category.uuid}>
                          {category.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectLabel> Nenhuma categoria encontrada</SelectLabel>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="location">Localização:</Label>
            <Textarea
              className="col-span-5"
              {...register("location")}
              placeholder="Onde seu produto esta localizado."
              id="location"
            />
          </div>
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
            <Button type="submit">Editar produto</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
