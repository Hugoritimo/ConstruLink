"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>(""); // Estado para o e-mail
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email) {
      // Verificação de ambos campos
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    // Extraindo o primeiro e o último nome
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length < 2) {
      toast.error("Por favor, insira pelo menos um nome e um sobrenome.");
      return;
    }
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    const username = `${firstName}.${lastName}`.toLowerCase();

    try {
      const response = await fetch("/api/request-user-creation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email }), // Incluindo email na requisição
      });

      if (response.ok) {
        toast.success("Solicitação enviada com sucesso!");
        router.push("/");
      } else {
        toast.error("Erro ao enviar solicitação, tente novamente.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar solicitação, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <ToastContainer />
      <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-3xl">
        <CardHeader>
          <div className="flex flex-col items-center mb-4">
            <Image
              src="/img/projeta.png"
              alt="Logo"
              width={120}
              height={120}
              className="animate-bounce"
            />
            <CardTitle className="text-center text-3xl font-extrabold text-gray-800 mt-4">
              Solicitação de Registro de Funcionário
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nome Completo
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Digite seu nome completo"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <div className="mb-6">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#af1b1b] hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition duration-300"
            >
              Solicitar Registro
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
