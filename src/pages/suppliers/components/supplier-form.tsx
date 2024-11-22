import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export function SupplierForm() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Criar novo fornecedor</DialogTitle>
        <DialogDescription>
          Crie novos fornecedores para o seu comércio aqui
        </DialogDescription>
      </DialogHeader>
      <Separator className="w-full" />
      <Form {...[]}>
        <form
          onSubmit={() =>{}}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="name">Nome:</Label>
            <Input className="col-span-5" id="name" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unit">Quantidade:</Label>
              <Input id="unit" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimumStock">
                Quantidade mínima em estoque:
              </Label>
              <Input id="minimumStock" />
            </div>
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="location">Localização:</Label>
            <Textarea
              className="col-span-5"
              placeholder="Onde seu produto esta localizado."
              id="location"
            />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="description">Descrição:</Label>
            <Textarea
              className="col-span-5"
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
