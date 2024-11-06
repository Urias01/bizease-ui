import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import { SupplierTable } from "./components/supplier-table";

export default function Suppliers() {
  return (
    <>
      <header className="flex justify-between align-middle p-4">
        <h1>Fornecedores</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <PlusCircle className="h-4 w-4" /> Fornecedor
            </Button>
          </DialogTrigger>
          {/* <ProductForm /> */}
        </Dialog>
      </header>

      <section>
        <SupplierTable />
      </section>

      <footer></footer>
    </>
  );
}
