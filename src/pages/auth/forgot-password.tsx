import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { z } from "zod";
import { resetPassword } from "@/api/user/forgot-password";

const forgotPasswordForm = z.object({
  email: z.string().email("E-mail inválido"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordForm>;

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordForm),
  });

  async function handleForgotPassword(data: ForgotPasswordForm) {
    try {
      await resetPassword({ email: data.email });
      toast.success("Um e-mail de recuperação foi enviado!");
    } catch (error) {
      toast.error("Erro ao solicitar recuperação de senha. Tente novamente.");
    }
  }

  return (
    <>
      <Helmet title="Recuperar Senha" />
      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col text-center">
            <p className="text-2xl font-semibold tracking-tighter text-foreground">
              Recuperar Senha
            </p>
          </div>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleForgotPassword)}
          >
            <div className="space-y-2">
              <Label htmlFor="email">
                Digite seu e-mail para a recuperação de sua senha
              </Label>
              <Input
                id="email"
                type="email"
                className="bg-secondary border-none"
                {...register("email")}
              />
              {errors.email && (
                <span className="mt-2 text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            <Button
              className="w-full bg-primary text-foreground hover:bg-secondary 
                enabled:hover:cursor-pointer disabled:hover:cursor-not-allowed disabled:opacity-50 "
              type="submit"
              disabled={isSubmitting}
            >
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
