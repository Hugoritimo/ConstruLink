"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from "@/components/ui/button"; // Importação Padrão
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaBuilding, FaBell, FaUser, FaKey } from "react-icons/fa";
import { useRouter } from "next/navigation";

// Componente Modal Simples
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  errorMessage: string;
}

const PasswordModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  errorMessage,
}) => {
  const [inputPassword, setInputPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(inputPassword);
    setInputPassword("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Área de Gerência</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const router = useRouter();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const correctPassword = "!PCS-43590"; // **Atenção:** Armazenar senhas no frontend não é seguro.

  // Função para verificar a senha
  const handlePasswordSubmit = (password: string) => {
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
          variant="ghost" // Agora válido após atualização do Button component
          onClick={() => router.push("/profile")}
          className="text-[#af1b1b] hover:bg-[#fce4e4] p-2 rounded-md flex items-center"
        >
          <FaUser className="mr-2" />
          Perfil
        </Button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card: Selecionar Empresa */}
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

        {/* Card: Notificações */}
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

        {/* Card: Área de Gerência */}
        <Card
          onClick={() => setShowPasswordModal(true)} // Abre o modal de senha
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
          Todos os direitos reservados. <br />
          Projetado e Desenvolvido por NITEP - Núcleo de Inovação e Tecnologia
          Projeta
        </p>
      </footer>

      {/* Modal de Senha */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordSubmit}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default HomePage;
