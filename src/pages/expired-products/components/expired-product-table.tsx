import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Pagination } from "@/components/pagination";
import { ProductSkeletonTable } from "@/pages/products/components/product-skeleton-table";
import { getExpiredProducts } from "@/api/products/get-expired-products";

export function ExpiredProductTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["expired-products", page, name, id],
    queryFn: () =>
      getExpiredProducts({
        page,
        name,
        id,
      }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id.</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Categoria</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingProduct && <ProductSkeletonTable />}
            {result?.data?.length !== undefined && result?.data?.length > 0
              ? result.data.map((product) => {
                  return (
                    <TableRow key={product.product_id}>
                      <TableCell>{product.product_id}</TableCell>
                      <TableCell>{product.product_name}</TableCell>
                      <TableCell>{product.expired_quantity}</TableCell>
                      <TableCell>{product.category_name}</TableCell>
                    </TableRow>
                  );
                })
              : isLoadingProduct !== true && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Nenhum produto encontrado.
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      {result && (
        <Pagination
          pageIndex={result.pageIndex}
          totalCount={result.totalCount}
          perPage={result.perPage}
          onPageChange={handlePaginate}
        />
      )}
    </>
  );
}
