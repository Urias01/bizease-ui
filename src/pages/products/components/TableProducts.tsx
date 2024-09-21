import { getProducts } from "@/api/products/get-products";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { TableProductsSkeleton } from "./TableProductsSkeleton";
import { Pencil } from "lucide-react";

export function ProductTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  const commerceUuid = searchParams.get("commerceUuid");
  const categorieId = searchParams.get("categorieId");
  const name = searchParams.get("name");

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["products", page, commerceUuid, name, categorieId],
    queryFn: () =>
      getProducts({
        page,
        commerceUuid: "0f7b4a24-04b0-4b1f-b80b-48256e2bddb5",
        name,
        categorieId,
      }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());

      return state;
    });
  }

  return (
    <Table>
      <TableCaption>Lista de Produtos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Id.</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Categoria</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoadingProduct && <TableProductsSkeleton />}
        {result?.data?.length &&
          result.data.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell>
                  <Pencil className="h-3 w-3" />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>
                  {product.categories && product.categories.name}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
      <TableFooter>
        <TableRow className="h-8">
          <TableCell colSpan={4}></TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
