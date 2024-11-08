import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { EmployeesForm } from "./components/employees-form";
import { EmployeesTable } from "./components/employees-table";

export function Employees() {
  return (
    <>
      <header className="flex justify-between align-middle p-4">
        <h1>Funcionários</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <PlusCircle className="h-4 w-4" /> Funcionário
            </Button>
          </DialogTrigger>
          <EmployeesForm />
        </Dialog>
      </header>

      <section>
        <EmployeesTable />
      </section>

      <footer></footer>
    </>
  );
}
