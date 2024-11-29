import { api } from "@/lib/axios";

interface ChangeNameAndEmailRequest {
    name: string;
    email: string;
}

export async function changeNameAndEmail({ name, email }: ChangeNameAndEmailRequest): Promise<void> {
    await api.patch("/users/change-name-and-email", { name, email });
}