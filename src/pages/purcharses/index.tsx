import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "../products/components/product-form";
import { ProductsTableFilters } from "../products/components/products-table-filters";
import { PurcharsesTable } from "./components/purcharses-table";

export function Purcharses() {
  return (
    <>
      <header className="flex justify-between align-middle p-4">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
          Compras
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <PlusCircle className="h-4 w-4" /> Produto
            </Button>
          </DialogTrigger>
          <ProductForm />
        </Dialog>
      </header>

      <section className="space-y-4">
        <ProductsTableFilters />
        <PurcharsesTable />
      </section>

      <footer></footer>
    </>
  );
}
