"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import { setToken } from "@/lib/auth"; // Certifique-se de que a função está corretamente exportada

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username || !password) {
      toast.error("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const result = await response.json();
        const token = result.token;

        setToken(token, rememberMe);
        toast.success("Login bem-sucedido!");

        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } else {
        const result = await response.json();
        const errorMessage =
          result.message || "Erro ao fazer login. Tente novamente.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Erro na requisição de login:", error);
      toast.error("Erro ao tentar fazer login, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-4">
      <ToastContainer />
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md p-8 shadow-2xl bg-white dark:bg-gray-900 rounded-3xl border border-brand-primary"
      >
        <Card>
          <CardHeader className="flex flex-col items-center mb-6">
            <Image
              src="/img/projeta.png"
              alt="Logo da empresa"
              width={100}
              height={100}
              className="mb-4"
            />
            <CardTitle className="text-center text-4xl font-extrabold text-brand-dark dark:text-white">
              ConstruLink
            </CardTitle>
            <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
              Faça login para continuar
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Nome de Usuário
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu nome de usuário"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <Label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                >
                  Lembrar-me
                </Label>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <span className="loader mr-2" /> Carregando...
                    </span>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </motion.div>
            </form>
            <div className="mt-6 text-center">
              <Link href="/register">
                <span className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 cursor-pointer">
                  Não tem uma conta? Solicite uma
                </span>
              </Link>
              <br />
              <Link href="/forgot-password">
                <span className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 cursor-pointer">
                  Esqueceu sua senha?
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
