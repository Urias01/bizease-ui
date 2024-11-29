import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorie } from "@/api/categories/create-categorie";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";

const categorieSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(500).optional(),
});

type CategorieSchema = z.infer<typeof categorieSchema>;

export function CategoriesForm() {
  const form = useForm<CategorieSchema>({
    resolver: zodResolver(categorieSchema),
  });

  const { register, handleSubmit, reset } = form;

  const { mutateAsync: createCategorieFn } = useMutation({
    mutationFn: createCategorie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories", "categories-to-select"],
      });
    },
  });

  async function registerCategorie(data: CategorieSchema) {
    await createCategorieFn(data)
      .then(() => {
        toast.success("Categoria criada com sucesso");
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
        <DialogTitle>Criar nova categoria</DialogTitle>
        <DialogDescription>
          Crie novas categorias para os seus produtos aqui
        </DialogDescription>
      </DialogHeader>
      <Separator className="w-full" />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(registerCategorie)}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="name">Nome:</Label>
            <Input className="col-span-5" id="name" {...register("name")} />
          </div>

          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="description">Descrição:</Label>
            <Textarea
              className="col-span-5"
              {...register("description")}
              placeholder="Descreva sua categoria aqui."
              id="description"
            />
          </div>
          <Separator className="w-full" />
          <DialogFooter>
            <Button type="submit">Criar categoria</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
