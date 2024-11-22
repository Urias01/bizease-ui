import { ProductTable } from "../products/components/product-table";
import { ProductsTableFilters } from "../products/components/products-table-filters";

export function ExpiredProducts() {
  return (
    <>
      <header className="flex justify-between align-middle p-4">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
          Produtos Expirados
        </h1>
      </header>

      <section className="space-y-4">
        <ProductsTableFilters />
        <ProductTable />
      </section>

      <footer></footer>
    </>
  );
}
