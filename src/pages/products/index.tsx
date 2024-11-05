import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProductTable } from "./components/product-table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProductForm } from "./components/product-form";

export function Products() {
  return (
    <>
      <header className="flex justify-between align-middle p-4">
        <h1>Produtos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <PlusCircle className="h-4 w-4" /> Produto
            </Button>
          </DialogTrigger>
          <ProductForm />
        </Dialog>
      </header>

      <section>
        <ProductTable />
      </section>

      <footer></footer>
    </>
  );
}
