import { ExpiredProductTable } from "./components/expired-product-table";

export function ExpiredProducts() {
  return (
    <>
      <header className="flex justify-between align-middle p-4">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
          Produtos Expirados
        </h1>
      </header>

      <section className="space-y-4">
        <ExpiredProductTable />
      </section>

      <footer></footer>
    </>
  );
}
