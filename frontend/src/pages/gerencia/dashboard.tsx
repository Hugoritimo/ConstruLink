"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaUserPlus, FaClipboardCheck, FaChartBar } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const GerenciaDashboard = () => {
  const router = useRouter();

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
