import { ProductsTableFilters } from "../products/components/products-table-filters";
import { ReturnedProductTable } from "./components/returned-product-table";

export function ReturnedProducts() {
  return (
    <>
      <header className="flex justify-between align-middle p-4">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
          Produtos Devolvidos
        </h1>
      </header>

      <section className="space-y-4">
        <ProductsTableFilters />
        <ReturnedProductTable />
      </section>

      <footer></footer>
    </>
  );
}
