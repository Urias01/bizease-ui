import { api } from "@/lib/axios";

interface ForgotPasswordRequest {
    email: string;
}

export async function resetPassword({ email }: ForgotPasswordRequest): Promise<void> {
    await api.post("/auth/password-reset", { email });
}