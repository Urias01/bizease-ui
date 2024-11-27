import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";

import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormItem } from "./ui/form";

interface EditCommerceProps {
  onClose: () => void;
}

export function EditCommerce({ onClose }: EditCommerceProps) {
  return (
    <DialogContent className="min-w-fit">
      <DialogHeader>
        <DialogTitle>Edite seu comércio</DialogTitle>
        <DialogDescription>
          Aqui você pode editar os seus dados cadastrais e/ou resetar a sua
          senha
        </DialogDescription>
      </DialogHeader>
      <Separator className="w-full" />
      <form>
        <div className="grid grid-cols-12 gap-4 py-4">
          <div className="grid-cols-6 col-span-6">
            <FormItem>
              <Label htmlFor="email" className="text-right">
                Cnpj
              </Label>
              <Input id="name" className="col-span-3" />
            </FormItem>
            <FormItem>
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input id="name" className="col-span-3" />
            </FormItem>
            <FormItem>
              <Label htmlFor="name" className="text-right">
                Telefone
              </Label>
              <Input id="name" className="col-span-3" />
            </FormItem>
          </div>
          <div className="grid-cols-6 col-span-6">
            <FormItem className="">
              <Label htmlFor="name" className="text-right">
                CEP
              </Label>
              <Input id="name" className="col-span-3" />
            </FormItem>
            <div className="grid grid-cols-6 gap-4">
              <FormItem className="col-span-4">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" />
              </FormItem>
              <FormItem className="col-span-2">
                <Label htmlFor="address_number">Número</Label>
                <Input id="address_number" placeholder="Ex.. 52A" />
              </FormItem>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <FormItem className="col-span-4">
                <Label htmlFor="name" className="text-right">
                  Cidade
                </Label>
                <Input id="name" className="col-span-3" />
              </FormItem>
              <FormItem className="col-span-2">
                <Label htmlFor="uf">UF</Label>
                <Input id="uf" placeholder="Ex.. SP" />
              </FormItem>
            </div>
            <div className=""></div>
            <div className="">
              <Label htmlFor="name" className="text-right">
                Bairro
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
          </div>
        </div>
        <DialogFooter className="space-y-4 sm:space-y-0">
          <DialogClose asChild>
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" type="button" onClick={onClose}>
              Desativar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" onClick={onClose}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
