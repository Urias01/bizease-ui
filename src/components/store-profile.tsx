import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChangePasswordModal } from "./change-password-modal";
import { useForm } from "react-hook-form";
import { getMe } from "@/api/user/get-me";
import { useQuery } from "@tanstack/react-query";
import { changeNameAndEmail } from "@/api/user/change-name-and-email";
import { toast } from "sonner";

type StoreProfileProps = {
  onClose: () => void;
};

export function StoreProfile({ onClose }: StoreProfileProps) {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const { register, handleSubmit, setValue } = form;

  const handleOpenChangePassword = () => {
    setIsChangePasswordOpen(true);
  };

  const handleCloseChangePassword = () => {
    setIsChangePasswordOpen(false);
  };

  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: async () => await getMe(),
  });

  useEffect(() => {
    if (me) {
      setValue("name", me.name);
      setValue("email", me.email);
    }
  }, [me, setValue]);

  const onSubmit = async (data: { name: string; email: string }) => {
    try {
      await changeNameAndEmail(data);
      toast.success("Dados atualizados com sucesso!");
      onClose();
    } catch (error) {
      toast.error("Não foi possível atualizar os dados.");
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Seu perfil</DialogTitle>
          <DialogDescription>
            Visualize ou atualize aqui suas informações de usuário.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input id="name" className="col-span-3" {...register("name")} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                className="col-span-3"
                {...register("email")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={handleOpenChangePassword}
            >
              Alterar senha
            </Button>
            <Button type="submit" variant="success" onClick={onClose}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={handleCloseChangePassword}
      />
    </>
  );
}
