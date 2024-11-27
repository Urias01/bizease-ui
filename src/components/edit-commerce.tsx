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
import { Input, InputProps } from "./ui/input";
import { Button } from "./ui/button";
import { Form, FormField, FormItem } from "./ui/form";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

interface EditCommerceProps {
  onClose: () => void;
}

export function EditCommerce({ onClose }: EditCommerceProps) {
  const form = useForm({});

  return (
    <DialogContent className="min-w-fit">
      <DialogHeader>
        <DialogTitle>Edite seu comércio</DialogTitle>
        <DialogDescription>
          Aqui você pode editar os dados cadastrais do seu comércio.
        </DialogDescription>
      </DialogHeader>
      <Separator className="w-full" />
      <Form {...form}>
        <form>
          <div className="grid grid-cols-12 gap-4 py-4">
            <div className="grid-cols-6 col-span-6">
              <FormItem>
                <Label htmlFor="email" className="text-right">
                  CNPJ
                </Label>
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
              </FormItem>
              <FormItem>
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input id="name" className="col-span-3" />
              </FormItem>
              <FormItem>
                <Label htmlFor="phone" className="text-right">
                  Telefone
                </Label>
                <FormField
                  name="phone"
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
              </FormItem>
            </div>
            <div className="grid-cols-6 col-span-6">
              <FormItem className="">
                <Label htmlFor="cep" className="text-right">
                  CEP
                </Label>
                <FormField
                  name="cep"
                  control={form.control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputMask {...field} mask="99999-999">
                      {(inputProps: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>) => (
                        <Input
                          id="cep"
                          {...inputProps}
                          className="col-span-3"
                        />
                      )}
                    </InputMask>
                  )}
                />
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
                  <Label htmlFor="city" className="text-right">
                    Cidade
                  </Label>
                  <Input id="city" className="col-span-3" />
                </FormItem>
                <FormItem className="col-span-2">
                  <Label htmlFor="uf">UF</Label>
                  <Input id="uf" placeholder="Ex.. SP" />
                </FormItem>
              </div>
              <div className=""></div>
              <div className="">
                <Label htmlFor="neighborhood" className="text-right">
                  Bairro
                </Label>
                <Input id="neighborhood" className="col-span-3" />
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
      </Form>
    </DialogContent>
  );
}
