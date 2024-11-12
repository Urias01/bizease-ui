import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import { CategoriesTable } from "./components/categories-table";
import { CategoriesForm } from "./components/categories-form";
import { CategoriesTableFilters } from "./components/categories-table-filters";

export function Categories() {
  return (
    <>
      <header className="flex justify-between align-middle p-4">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Categorias</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <PlusCircle className="h-4 w-4" /> Categoria
            </Button>
          </DialogTrigger>
          <CategoriesForm />
        </Dialog>
      </header>

      <section className="space-y-4 w-full">
        <CategoriesTableFilters />
        <CategoriesTable />
      </section>

      <footer></footer>
    </>
  );
}
