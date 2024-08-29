import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const signInForm = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha precisa ter pelo menos 6 caracteres"),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });

  async function handleSignIn(data: SignInForm) {
    await new Promise((resolve, _) => {
      setInterval(() => {
        resolve(true);
      }, 2000);
    });
    return null;
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button
          variant={"ghost"}
          asChild
          className="absolute right-8 top-8 bg-primary dark:bg-secondary text-foreground"
        >
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col text-center">
            <p className="text-2xl font-semibold tracking-tighter text-foreground">
              Bem vindo ao BizEase, seu maior gestor para o estoque do seu
              comércio
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                className="bg-zinc-300 dark:bg-primary border-none"
                {...register("email")}
              />
              {errors.email && (
                <span className="mt-2 text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Sua senha</Label>
              <Input
                id="password"
                type="password"
                className="bg-zinc-300 dark:bg-primary border-none"
                {...register("password")}
              />
              {errors.password && (
                <span className="mt-2 text-red-500">
                  {errors.password.message}
                </span>
              )}
              <p className="text-xs text-end underline cursor-pointer">
                Esqueceu sua senha?
              </p>
            </div>
            <Button
              className="w-full bg-primary text-foreground hover:bg-secondary 
                enabled:hover:cursor-pointer disabled:hover:cursor-not-allowed disabled:opacity-50 "
              type="submit"
              disabled={isSubmitting}
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
