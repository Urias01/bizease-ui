import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { MovementsForm } from "./components/movements-form";
import { MovementsTable } from "./components/movements-table";
import { MovementsTableFilter } from "./components/movements-table-filter";

export function Movements() {
  
  return (
    <>
    <header className="flex justify-between align-middle p-4">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Movimentações</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex gap-2">
            <PlusCircle className="h-4 w-4" /> Movimentação
          </Button>
        </DialogTrigger>
        <MovementsForm />
      </Dialog>
    </header>

    <section className="space-y-4">
      <MovementsTableFilter />
      <MovementsTable />
    </section>

    <footer></footer>
  </>
  )
}
