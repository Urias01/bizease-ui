import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProductTable } from "./components/TableProducts";

export function Products() {
  return (
    <>
      <header className="flex justify-between align-middle p-4">
        <h1>Produtos</h1>
        <Button variant="outline" className="flex gap-2">
          <PlusCircle className="h-4 w-4" /> Produto
        </Button>
      </header>

      <section>
        <ProductTable />
      </section>

      <footer></footer>
    </>
  );
}
