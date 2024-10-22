"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        toast.success("Senha alterada com sucesso!");
        router.push("/login");
      } else {
        toast.error("Erro ao redefinir senha, tente novamente.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao redefinir senha, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-4">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 shadow-2xl bg-white dark:bg-gray-900 rounded-3xl border border-brand-primary"
      >
        <h1 className="text-3xl font-extrabold text-brand-dark dark:text-brand-white mb-6 text-center">
          Redefinir Senha
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="newPassword"
              className="block text-sm font-medium text-brand-dark dark:text-brand-white mb-1"
            >
              Nova Senha
            </Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Digite sua nova senha"
              className="w-full p-3 border border-brand-gray dark:border-gray-600 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:text-brand-white"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-brand-dark dark:text-brand-white mb-1"
            >
              Confirmar Nova Senha
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirme sua nova senha"
              className="w-full p-3 border border-brand-gray dark:border-gray-600 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:text-brand-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition duration-300 dark:bg-brand-primary dark:hover:bg-brand-secondary"
            >
              Redefinir Senha
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
