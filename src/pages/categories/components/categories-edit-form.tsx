import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { getCategoryByUuid } from "@/api/categories/get-category-by-uuid";
import { useEffect, useState } from "react";
import { updateCategories } from "@/api/categories/update-categories";
import { deleteCategories } from "@/api/categories/delete-categories";

interface CategoriesFormProps {
  uuid: string;
  open: boolean;
}

const categorieSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(500).optional(),
});

type CategorieSchema = z.infer<typeof categorieSchema>;

export function CategoriesEditForm({ uuid, open }: CategoriesFormProps) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const form = useForm<CategorieSchema>({
    resolver: zodResolver(categorieSchema),
  });

  const { register, handleSubmit, reset, setValue } = form;

  const { mutateAsync: updateCategoryFn } = useMutation({
    mutationFn: updateCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const { mutateAsync: deleteCategoriesFn } = useMutation({
    mutationFn: deleteCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const { data: result } = useQuery({
    queryKey: ["category", uuid],
    queryFn: () => getCategoryByUuid({ uuid }),
    enabled: open,
  });

  async function updateCategory(data: CategorieSchema) {
    await updateCategoryFn({
      uuid,
      name: data.name,
      description: data.description,
    })
      .then(() => {
        toast.success("Categoria atualizada com sucesso");
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

  useEffect(() => {
    if (result) {
      setValue("name", result.name);
      setValue("description", result.description);
    }
  }, [result, setValue]);

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
          onSubmit={handleSubmit(updateCategory)}
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
            {result && result.isActive === "ACTIVE" && (
              <Dialog
                open={isConfirmDialogOpen}
                onOpenChange={setIsConfirmDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button type="button" variant="destructive">Desativar</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Atenção !</DialogTitle>
                  <Separator orientation="horizontal" />
                  <h2>Tem certeza que deseja desativar essa categoria?</h2>
                  <div className="flex flex-row-reverse gap-4">
                    <Button
                      variant="destructive"
                      onClick={() => {
                        deleteCategoriesFn({ uuid: result ? result.uuid : "" })
                          .then(() => {
                            toast.success("Categoria excluída com sucesso");
                          })
                          .catch(() => {
                            toast.error("Não foi possível excluir a categoria");
                          });
                        setIsConfirmDialogOpen(false);
                      }}
                    >
                      Sim
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsConfirmDialogOpen(false);
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <Button type="submit">Editar categoria</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
