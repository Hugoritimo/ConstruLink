"use client";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        {
          username,
          password,
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Usuário adicionado com sucesso!");
        setUsername("");
        setPassword("");
        setErrorMessage("");
      } else {
        setErrorMessage("Erro ao adicionar o usuário.");
      }
    } catch (error) {
      setErrorMessage("Erro ao adicionar usuário. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f9f9f9] p-6">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-[#af1b1b]">ConstruLink</h1>

        {/* Voltar Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="text-[#af1b1b] hover:bg-[#fce4e4] p-2 rounded-md flex items-center"
        >
          Voltar
        </Button>
      </header>

      {/* Formulário de Adicionar Usuário */}
      <main className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-[#af1b1b] mb-6">
          Adicionar Usuário
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="username"
              className="block text-[#333333] font-semibold mb-2"
            >
              Nome de Usuário
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#af1b1b]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[#333333] font-semibold mb-2"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#af1b1b]"
            />
          </div>

          {successMessage && (
            <p className="text-green-600 font-semibold">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-600 font-semibold">{errorMessage}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#af1b1b] text-white p-3 rounded-md hover:bg-[#951818]"
          >
            Adicionar Usuário
          </Button>
        </form>
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

export default AddUser;
