import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { EmployeesForm } from "./components/employees-form";
import { EmployeesTable } from "./components/employees-table";
import { EmployeesTableFilters } from "./components/employees-table-filters";

export function Employees() {
  return (
    <>
      <header className="flex justify-between align-middle p-4">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Funcionários</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <PlusCircle className="h-4 w-4" /> Funcionário
            </Button>
          </DialogTrigger>
          <EmployeesForm />
        </Dialog>
      </header>

      <section className="space-y-4">
        <EmployeesTableFilters />
        <EmployeesTable />
      </section>

      <footer></footer>
    </>
  );
}
