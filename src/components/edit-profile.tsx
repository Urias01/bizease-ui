import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export function EditProfile() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edite seu perfil</DialogTitle>
        <DialogDescription>
          Aqui você pode editar os seus dados cadastrais e/ou resetar a sua senha
        </DialogDescription>
      </DialogHeader>
      <Separator className="w-full" />
      <form>
        <div>
          <Label>Nome</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>E-mail</Label>
          <Input type="email" />
        </div>
      </form>
      <Button variant="ghost">Resetar senha</Button>
    </DialogContent>
  );
}
