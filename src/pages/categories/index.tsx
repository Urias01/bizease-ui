import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import { CategoriesTable } from "./components/CategoriesTable";
import { CategoriesForm } from "./components/CategoriesForm";

export function Categories() {
  return (
    <>
      <header className="flex justify-between align-middle p-4">
        <h1>Categorias</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <PlusCircle className="h-4 w-4" /> Categoria
            </Button>
          </DialogTrigger>
          <CategoriesForm />
        </Dialog>
      </header>

      <section>
        <CategoriesTable />
      </section>

      <footer></footer>
    </>
  );
}
