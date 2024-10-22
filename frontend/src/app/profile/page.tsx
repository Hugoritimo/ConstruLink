"use client"; // Indica que este código será executado no lado do cliente.

import React, { useState, useEffect } from "react"; // Importa React e hooks para gerenciamento de estado e efeitos colaterais.
import { Button } from "@/components/ui/button"; // Importa o componente Button personalizado.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Importa componentes Card, CardContent, CardHeader e CardTitle.
import { Input } from "@/components/ui/input"; // Importa o componente Input personalizado.
import { Label } from "@/components/ui/label"; // Importa o componente Label personalizado.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Importa o componente Avatar, AvatarImage e AvatarFallback.
import { useRouter } from "next/navigation"; // Importa o hook useRouter para navegação entre rotas no Next.js.

const ProfilePage = () => {
  // Estados para armazenar informações do perfil do usuário.
  const [name, setName] = useState(""); // Estado para armazenar o nome do usuário.
  const [email, setEmail] = useState(""); // Estado para armazenar o e-mail do usuário.
  const [avatarUrl, setAvatarUrl] = useState("/img/avatar-placeholder.png"); // Estado para armazenar a URL do avatar do usuário. Um avatar padrão é definido inicialmente.
  const router = useRouter(); // Hook para navegação de páginas.

  // Função para buscar o perfil do usuário autenticado.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Faz uma requisição GET para buscar o perfil do usuário.
        const response = await fetch("http://localhost:3001/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Usa o token de autenticação armazenado no localStorage.
          },
        });

        if (response.ok) {
          // Se a resposta for bem-sucedida, atualiza os estados com os dados recebidos.
          const data = await response.json();
          setName(data.name); // Atualiza o estado do nome do usuário.
          setEmail(data.email); // Atualiza o estado do e-mail.
          setAvatarUrl(data.avatarUrl || "/img/avatar-placeholder.png"); // Atualiza o avatar do usuário ou usa um avatar padrão.
        } else {
          console.error("Erro ao buscar perfil"); // Exibe uma mensagem de erro se não for possível buscar o perfil.
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error); // Exibe o erro no console se ocorrer uma exceção.
      }
    };

    fetchProfile(); // Chama a função fetchProfile ao montar o componente.
  }, []); // O array vazio [] indica que esse efeito será executado apenas uma vez, quando o componente for montado.

  // Função para salvar o perfil do usuário após a edição.
  const handleSave = async () => {
    try {
      // Faz uma requisição POST para salvar as alterações do perfil.
      const response = await fetch(
        "http://localhost:3001/auth/update-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Usa o token de autenticação.
          },
          body: JSON.stringify({ name, email }), // Envia o nome e o e-mail atualizados no corpo da requisição.
        }
      );

      if (response.ok) {
        alert("Perfil atualizado com sucesso!"); // Exibe uma mensagem de sucesso se o perfil for atualizado corretamente.
      } else {
        console.error("Erro ao atualizar perfil"); // Exibe uma mensagem de erro se ocorrer um problema ao atualizar o perfil.
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error); // Exibe o erro no console se ocorrer uma exceção.
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f9f9f9] p-6">
      {/* Layout principal da página de perfil com fundo claro e espaçamento interno */}
      <header className="w-full max-w-2xl flex justify-between items-center mb-8">
        {/* Cabeçalho com o título da página e o botão de salvar */}
        <h1 className="text-3xl font-extrabold text-[#333333]">Perfil</h1>{" "}
        {/* Título da página de perfil */}
        <Button
          variant="default"
          onClick={handleSave} // Chama a função handleSave quando o botão é clicado.
          className="bg-[#af1b1b] text-white hover:bg-[#cc1515]" // Estilos do botão com cores personalizadas.
        >
          Salvar Alterações
        </Button>
      </header>

      <Card className="w-full max-w-2xl mb-6 bg-[#ffffff] border border-[#cccccc]">
        {/* Card que contém o formulário de edição de perfil */}
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#333333]">
            Informações do Usuário
          </CardTitle>{" "}
          {/* Título da seção de informações do usuário */}
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            {/* Layout para o avatar e o formulário de edição */}
            <div className="cursor-pointer">
              {/* Avatar do usuário com opção de alterar */}
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl} alt="Avatar do usuário" />{" "}
                {/* Exibe a imagem do avatar do usuário */}
                <AvatarFallback>{name[0]}</AvatarFallback>{" "}
                {/* Exibe a inicial do nome do usuário se não houver avatar */}
              </Avatar>
              <p className="text-sm text-[#333333] text-center mt-2">
                Alterar Avatar {/* Texto para alterar o avatar */}
              </p>
            </div>

            <form className="flex-1 space-y-4">
              {/* Formulário para editar o nome e o e-mail */}
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#333333]"
                >
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name} // O valor do campo de texto é o estado "name"
                  onChange={(e) => setName(e.target.value)} // Atualiza o estado do nome quando o usuário digita
                  className="w-full p-3 border border-[#cccccc] rounded-lg" // Estilos de input
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#333333]"
                >
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email} // O valor do campo de texto é o estado "email"
                  onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do e-mail quando o usuário digita
                  className="w-full p-3 border border-[#cccccc] rounded-lg" // Estilos de input
                />
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage; // Exporta o componente ProfilePage.
