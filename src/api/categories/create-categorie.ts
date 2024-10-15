import { api } from "@/lib/axios";

export interface CategorieRequest {
  name: string;
  description?: string | undefined;
}

export async function createCategorie({
  name,
  description,
}: CategorieRequest) {
  await api.post("/categories", {
    name,
    description,
  });
}
