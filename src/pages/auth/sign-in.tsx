import { signIn } from "@/api/user/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signInForm = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha precisa ter pelo menos 6 caracteres"),
});

export type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  const { mutateAsync: signInFn } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: SignInForm) {
    await signInFn({ email: data.email, password: data.password })
      .then((response) => {
        localStorage.setItem("token", response.access_token);
        toast.success("Login realizado com sucesso!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Usuário ou senha incorretos!");
      });
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
                className="bg-secondary border-none"
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
                className="bg-secondary border-none"
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
