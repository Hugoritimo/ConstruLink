"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("E-mail de recuperação enviado!");
      } else {
        toast.error("Erro ao enviar e-mail, tente novamente.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar e-mail, tente novamente.");
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
          Recuperar Senha
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-brand-dark dark:text-brand-white mb-1"
            >
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              className="w-full p-3 border border-brand-gray dark:border-gray-600 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:text-brand-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition duration-300 dark:bg-brand-primary dark:hover:bg-brand-secondary"
            >
              Enviar E-mail de Recuperação
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
