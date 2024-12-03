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
import { Form, FormField, FormItem } from "./ui/form";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { getCommerceDetails } from "@/api/commerces/get-commerce-details";
import { useEffect } from "react";
import { updateCommerce } from "@/api/commerces/update-commerce";
import { UpdateCommerceRequest } from "@/api/commerces/update-commerce";
import { toast } from "sonner";

interface EditCommerceProps {
  onClose: () => void;
}

export function EditCommerce({ onClose }: EditCommerceProps) {
  const form = useForm();

  const { register, handleSubmit, setValue } = form;

  const { data: commerceDetails } = useQuery({
    queryKey: ["commerceDetails"],
    queryFn: async () => await getCommerceDetails(),
  });

  useEffect(() => {
    if (commerceDetails) {
      setValue("cnpj", commerceDetails.cnpj);
      setValue("name", commerceDetails.name);
      setValue("phoneNumber", commerceDetails.phoneNumber);
      setValue("postalCode", commerceDetails.postalCode);
      setValue("address", commerceDetails.address);
      setValue("addressNumber", commerceDetails.addressNumber);
      setValue("city", commerceDetails.city);
      setValue("uf", commerceDetails.uf);
      setValue("neighborhood", commerceDetails.neighborhood);
    }
  }, [commerceDetails, setValue]);

  const mutation: UseMutationResult<void, Error, UpdateCommerceRequest> = useMutation({
    mutationFn: updateCommerce,
    onSuccess: () => {
      toast.success("Dados do comércio atualizados com sucesso!");
      onClose();
    },
    onError: () => {
      toast.error("Erro ao atualizar os dados do comércio.");
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 py-4">
            <div className="grid-cols-6 col-span-6">
              <FormItem>
                <Label htmlFor="cnpj" className="text-right">
                  CNPJ
                </Label>
                <FormField
                  name="cnpj"
                  control={form.control}
                  render={({ field }) => (
                    <InputMask {...field} mask="99.999.999/9999-99">
                      {(inputProps) => (
                        <Input id="cnpj" {...inputProps} className="col-span-3" />
                      )}
                    </InputMask>
                  )}
                />
              </FormItem>
              <FormItem>
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input id="name" {...register('name')} className="col-span-3" />
              </FormItem>
              <FormItem>
                <Label htmlFor="phoneNumber" className="text-right">
                  Telefone
                </Label>
                <FormField
                  name="phoneNumber"
                  control={form.control}
                  render={({ field }) => (
                    <InputMask {...field} mask="(99) 99999-9999">
                      {(inputProps) => (
                        <Input id="phoneNumber" {...inputProps} className="col-span-3" />
                      )}
                    </InputMask>
                  )}
                />
              </FormItem>
            </div>
            <div className="grid-cols-6 col-span-6">
              <FormItem>
                <Label htmlFor="postalCode" className="text-right">
                  CEP
                </Label>
                <FormField
                  name="postalCode"
                  control={form.control}
                  render={({ field }) => (
                    <InputMask {...field} mask="99999-999">
                      {(inputProps) => (
                        <Input id="postalCode" {...inputProps} className="col-span-3" />
                      )}
                    </InputMask>
                  )}
                />
              </FormItem>
              <div className="grid grid-cols-6 gap-4">
                <FormItem className="col-span-4">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" {...register('address')} />
                </FormItem>
                <FormItem className="col-span-2">
                  <Label htmlFor="addressNumber">Número</Label>
                  <Input id="addressNumber" {...register('addressNumber')} />
                </FormItem>
              </div>
              <div className="grid grid-cols-6 gap-4">
                <FormItem className="col-span-4">
                  <Label htmlFor="city" className="text-right">
                    Cidade
                  </Label>
                  <Input id="city" {...register('city')} className="col-span-3" />
                </FormItem>
                <FormItem className="col-span-2">
                  <Label htmlFor="uf">UF</Label>
                  <Input id="uf" {...register('uf')} placeholder="Ex.. SP" />
                </FormItem>
              </div>
              <FormItem>
                <Label htmlFor="neighborhood" className="text-right">
                  Bairro
                </Label>
                <Input id="neighborhood" {...register('neighborhood')} className="col-span-3" />
              </FormItem>
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
