"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaBuilding, FaBell, FaUser, FaKey } from "react-icons/fa";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const correctPassword = "teste"; // Defina a senha correta aqui

  // Função para verificar a senha
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setErrorMessage("");
      setShowPasswordModal(false);
      router.push("/gerencia/add-user"); // Redireciona para a página de criar usuário na área de gerência
    } else {
      setErrorMessage("Senha incorreta, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f9f9f9] p-6">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-[#af1b1b]">ConstruLink</h1>

        {/* Perfil Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/profile")}
          className="text-[#af1b1b] hover:bg-[#fce4e4] p-2 rounded-md flex items-center"
        >
          <FaUser className="mr-2" />
          Perfil
        </Button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          onClick={() => router.push("/select")}
          className="cursor-pointer hover:shadow-lg transition-shadow bg-white border border-[#cccccc] rounded-lg overflow-hidden"
        >
          <CardHeader className="flex flex-col items-center bg-[#af1b1b] p-6">
            <FaBuilding className="text-5xl text-white" />
          </CardHeader>
          <CardTitle className="text-center mt-4 text-xl font-semibold text-[#333333]">
            Selecionar Empresa
          </CardTitle>
          <CardContent className="text-center text-[#666666]">
            <p>Escolha a empresa para visualizar relatórios.</p>
          </CardContent>
        </Card>

        <Card
          onClick={() => router.push("/notification")}
          className="cursor-pointer hover:shadow-lg transition-shadow bg-white border border-[#cccccc] rounded-lg overflow-hidden"
        >
          <CardHeader className="flex flex-col items-center bg-[#af1b1b] p-6">
            <FaBell className="text-5xl text-white" />
          </CardHeader>
          <CardTitle className="text-center mt-4 text-xl font-semibold text-[#333333]">
            Notificações
          </CardTitle>
          <CardContent className="text-center text-[#666666]">
            <p>Veja as últimas atualizações e notificações.</p>
          </CardContent>
        </Card>

        {/* Botão para Área de Gerência */}
        <Card
          onClick={() => router.push("/gerencia/dashboard")}
          className="cursor-pointer hover:shadow-lg transition-shadow bg-white border border-[#cccccc] rounded-lg overflow-hidden"
        >
          <CardHeader className="flex flex-col items-center bg-[#af1b1b] p-6">
            <FaKey className="text-5xl text-white" />
          </CardHeader>
          <CardTitle className="text-center mt-4 text-xl font-semibold text-[#333333]">
            Área de Gerência
          </CardTitle>
          <CardContent className="text-center text-[#666666]">
            <p>Gerencie usuários e visualize RDOS.</p>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mt-12 text-center text-[#666666]">
        <p>
          &copy; 2024 Projeta. <br />
          Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
