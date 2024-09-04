import { createFirstAccess } from "@/api/user/create-first-access";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUpForm = z.object({
  email: z.string().min(1, "O campo é obrigatório ser preenchido").email("E-mail inválido"),
  name: z.string().min(1, "O campo é obrigatório ser preenchido").min(3, "O nome precisa de no mínimo 3 caracteres"),
  password: z.string().min(1, "O campo é obrigatório ser preenchido").min(6, "Senha precisa ter pelo menos 6 caracteres"),
  cnpj: z.string().min(1, "O campo é obrigatório ser preenchido").min(14, "CNPJ é composto por 14 digítos"),
  commerceName: z.string().min(1, "O campo é obrigatório ser preenchido")
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  });

  const { mutateAsync: createFirstAccessFn } = useMutation({
    mutationFn: createFirstAccess
  })


  async function handleSignUp(data: SignUpForm) {
    try {
      await createFirstAccessFn({
        email: data.email,
        name: data.name,
        password: data.password,
        cnpj: data.cnpj,
        commerceName: data.commerceName
      })

      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch {
      toast.error('Erro ao cadastrar usuário e comércio')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8 mt-14 md:mt-0">
        <Button
          variant={"ghost"}
          asChild
          className="absolute right-8 top-8 bg-primary text-foreground"
        >
          <Link to="/sign-in">Sign-in</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">        
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="name">Seu nome</Label>
              <Input
                id="name"
                type="text"
                className="bg-secondary border-none"
                {...register("name")}
              />
              {errors.name && (
                <span className="mt-2 text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">Cnpj do seu comércio</Label>
              <Input
                id="cnpj"
                type="text"
                className="bg-secondary border-none"
                {...register("cnpj")}
              />
              {errors.cnpj && (
                <span className="mt-2 text-red-500">
                  {errors.cnpj.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="commerceName">Nome do seu comércio</Label>
              <Input
                id="commerceName"
                type="text"
                className="bg-secondary border-none"
                {...register("commerceName")}
              />
              {errors.commerceName && (
                <span className="mt-2 text-red-500">
                  {errors.commerceName.message}
                </span>
              )}
            </div>
            <Button
              className="w-full bg-primary text-foreground
                enabled:hover:cursor-pointer disabled:hover:cursor-not-allowed disabled:opacity-50 "
              type="submit"
              disabled={isSubmitting}
            >
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
