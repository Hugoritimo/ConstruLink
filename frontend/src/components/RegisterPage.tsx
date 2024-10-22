"use client"; // Indica que este código será executado no lado do cliente.

import React, { useState } from "react"; // Importa React e useState para gerenciar o estado dos componentes.
import { useRouter } from "next/navigation"; // Importa o hook useRouter para navegar entre as páginas.
import { Button } from "@/components/ui/button"; // Importa o componente de botão personalizado.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Importa os componentes de Card para estruturação.
import { Input } from "@/components/ui/input"; // Importa o componente de Input para entradas de dados.
import { Label } from "@/components/ui/label"; // Importa o componente de Label para rótulos de formulário.
import { ToastContainer, toast } from "react-toastify"; // Importa o Toast para exibir notificações.
import "react-toastify/dist/ReactToastify.css"; // Importa o estilo necessário para o Toast.
import Image from "next/image"; // Importa o componente Image do Next.js para otimizar imagens.

const RegisterPage: React.FC = () => {
  // Definindo um componente funcional chamado RegisterPage
  const [username, setUsername] = useState<string>(""); // Estado para o campo de nome de usuário.
  const [email, setEmail] = useState<string>(""); // Estado para o campo de e-mail.
  const [password, setPassword] = useState<string>(""); // Estado para o campo de senha.
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // Estado para o campo de confirmação de senha.
  const router = useRouter(); // Cria uma instância do hook useRouter para redirecionamento.

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário.

    // Validação para campos vazios
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos."); // Exibe um erro se algum campo estiver vazio.
      return;
    }

    // Validação para senhas que não correspondem
    if (password !== confirmPassword) {
      toast.error("As senhas não correspondem."); // Exibe um erro se as senhas não forem iguais.
      return;
    }

    try {
      // Enviando os dados para a API de criação de usuário
      const response = await fetch(
        "http://localhost:3001/api/request-user-creation", // URL da API onde os dados serão enviados.
        {
          method: "POST", // Define o método HTTP como POST.
          headers: {
            "Content-Type": "application/json", // Define o tipo de conteúdo como JSON.
          },
          body: JSON.stringify({
            username, // Envia o nome de usuário.
            email, // Envia o e-mail.
            password, // Envia a senha.
          }),
        }
      );

      // Verifica se a resposta foi bem-sucedida
      if (response.ok) {
        toast.success("Solicitação enviada com sucesso! Verifique seu e-mail."); // Notifica sucesso.
        router.push("/"); // Redireciona o usuário para a página inicial.
      } else {
        const result = await response.json(); // Caso contrário, pega a resposta de erro.
        toast.error(result.message || "Erro ao enviar solicitação."); // Exibe a mensagem de erro.
      }
    } catch (error) {
      console.error(error); // Caso ocorra um erro, exibe no console.
      toast.error("Erro ao enviar solicitação."); // Notifica um erro ao enviar a solicitação.
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      {/* Define o container principal com uma altura mínima de tela cheia e um gradiente de fundo. */}
      <ToastContainer /> {/* Componente para exibir notificações. */}
      <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-3xl">
        {/* Componente Card para exibir o formulário com um design visualmente apelativo. */}
        <CardHeader>
          <div className="flex flex-col items-center mb-4">
            {/* Centraliza o conteúdo do cabeçalho. */}
            <Image
              src="/img/projeta.png" // Fonte da imagem (logo).
              alt="Logo" // Texto alternativo.
              width={120} // Largura da imagem.
              height={120} // Altura da imagem.
              className="animate-bounce" // Classe de animação bounce.
            />
            <CardTitle className="text-center text-3xl font-extrabold text-gray-800 mt-4">
              {/* Título do formulário. */}
              AccuRead Registro
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Formulário para entrada de dados */}
            <div className="mb-6">
              <Label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nome de Usuário
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu nome de usuário"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <div className="mb-6">
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <div className="mb-6">
              <Label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirmar Senha
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#af1b1b] hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition duration-300"
            >
              {/* Botão de submissão */}
              Registrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage; // Exporta o componente para uso em outras partes do aplicativo.
