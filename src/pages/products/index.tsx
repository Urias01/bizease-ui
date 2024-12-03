import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProductTable } from "./components/product-table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProductForm } from "./components/product-form";
import { ProductsTableFilters } from "./components/products-table-filters";

export function Products() {
  return (
    <>
      <header className="flex justify-between align-middle p-4">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Produtos</h1>
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
        <ProductTable />
      </section>

      <footer></footer>
    </>
  );
}
