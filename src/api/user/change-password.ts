import { api } from "@/lib/axios";

interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export async function changePassword({ currentPassword, newPassword }: ChangePasswordRequest): Promise<void> {
    await api.patch("/users/change-password", { currentPassword, newPassword });
}