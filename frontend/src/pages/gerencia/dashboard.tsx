"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaUserPlus, FaClipboardCheck, FaChartBar } from "react-icons/fa";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Definimos uma senha para acessar a página de gerência (apenas para teste)
const managerPassword = "PCS!-43590"; // Você pode alterar isso conforme necessário

const GerenciaDashboard = () => {
  const [password, setPassword] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Estado para verificar se o usuário autenticou
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Verifica se a senha digitada está correta
    if (password === managerPassword) {
      toast.success("Acesso concedido!");
      setIsAuthenticated(true);
    } else {
      toast.error("Senha incorreta. Tente novamente.");
    }
    setIsLoading(false);
  };

  // Caso o usuário ainda não tenha autenticado, mostra o campo de senha
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <ToastContainer />
        <Card className="w-full max-w-md p-6 shadow-md">
          <CardHeader className="mb-4">
            <CardTitle className="text-2xl font-bold text-center">
              Acesso Restrito
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Insira a senha de gerência
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Digite a senha"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#af1b1b] text-white p-3 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Verificando..." : "Acessar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Se a senha estiver correta, exibe o dashboard de gerência
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f9f9f9] p-6">
      <header className="w-full max-w-5xl flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-[#af1b1b]">
          Dashboard de Gerência
        </h1>
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="text-[#af1b1b] hover:bg-[#fce4e4] p-2 rounded-md"
        >
          Voltar
        </Button>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Adicionar Usuários */}
        <Card
          onClick={() => router.push("/gerencia/add-user")}
          className="cursor-pointer hover:shadow-lg transition-shadow bg-white border border-[#cccccc] rounded-lg overflow-hidden"
        >
          <CardHeader className="flex flex-col items-center bg-[#af1b1b] p-6">
            <FaUserPlus className="text-5xl text-white" />
          </CardHeader>
          <CardTitle className="text-center mt-4 text-xl font-semibold text-[#333333]">
            Adicionar Usuário
          </CardTitle>
          <CardContent className="text-center text-[#666666]">
            <p>Gerencie e adicione novos usuários ao sistema.</p>
          </CardContent>
        </Card>

        {/* Verificação de RDOs */}
        <Card
          onClick={() => router.push("/gerencia/verificar-rdos")}
          className="cursor-pointer hover:shadow-lg transition-shadow bg-white border border-[#cccccc] rounded-lg overflow-hidden"
        >
          <CardHeader className="flex flex-col items-center bg-[#af1b1b] p-6">
            <FaClipboardCheck className="text-5xl text-white" />
          </CardHeader>
          <CardTitle className="text-center mt-4 text-xl font-semibold text-[#333333]">
            Verificar RDOs
          </CardTitle>
          <CardContent className="text-center text-[#666666]">
            <p>Verifique quais RDOs foram preenchidos e por quem.</p>
          </CardContent>
        </Card>

        {/* Gráficos de Produção */}
        <Card
          onClick={() => router.push("/gerencia/graficos")}
          className="cursor-pointer hover:shadow-lg transition-shadow bg-white border border-[#cccccc] rounded-lg overflow-hidden"
        >
          <CardHeader className="flex flex-col items-center bg-[#af1b1b] p-6">
            <FaChartBar className="text-5xl text-white" />
          </CardHeader>
          <CardTitle className="text-center mt-4 text-xl font-semibold text-[#333333]">
            Acompanhamento Diário de Produção
          </CardTitle>
          <CardContent className="text-center text-[#666666]">
            <p>Gráficos de produtividade e preenchimento dos RDOs.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default GerenciaDashboard;
