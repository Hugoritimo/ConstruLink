"use client"; // Indica que este código será executado no lado do cliente (Client-side rendering).

import { useRouter } from "next/navigation"; // Hook do Next.js para redirecionamento de rotas.
import { useState } from "react"; // Importa o hook useState para gerenciar estados.
import { motion } from "framer-motion"; // Importa animações do Framer Motion.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Importa componentes de Card personalizados.
import { FaIndustry, FaBuilding, FaChessPawn } from "react-icons/fa"; // Importa ícones da biblioteca react-icons.
import { IconType } from "react-icons"; // Define o tipo IconType para o ícone, usado na tipagem.

interface SelectionButtonProps {
  company: string; // Nome da empresa que será armazenado.
  icon: IconType; // O tipo IconType permite passar ícones como componentes.
  label: string; // Rótulo visível que aparecerá no botão.
  gradientFrom: string; // Cor de início do gradiente de fundo.
  gradientTo: string; // Cor de término do gradiente de fundo.
  onSelect: (company: string) => void; // Função callback chamada quando o botão é clicado.
}

// Componente SelectionButton que renderiza o botão de seleção de empresa.
const SelectionButton: React.FC<SelectionButtonProps> = ({
  company, // Nome da empresa.
  icon: Icon, // Ícone passado para o botão.
  label, // Rótulo do botão.
  gradientFrom, // Cor inicial do gradiente.
  gradientTo, // Cor final do gradiente.
  onSelect, // Função que será executada ao clicar no botão.
}) => (
  <motion.div
    className="flex flex-col items-center justify-center p-6 bg-white text-[#333333] rounded-lg shadow-md cursor-pointer hover:shadow-lg" // Classes de estilo para o layout do botão.
    onClick={() => onSelect(company)} // Quando o botão é clicado, a empresa é selecionada e passada para a função `onSelect`.
    role="button" // Define o elemento como um botão acessível.
    aria-label={`Selecionar ${label}`} // Rótulo para acessibilidade.
    style={{
      backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`, // Define o gradiente de fundo.
      border: "1px solid rgba(0, 0, 0, 0.1)", // Define a borda do botão.
      height: "140px", // Altura fixa do botão.
      width: "100%", // Largura total do botão (ocupa toda a largura disponível).
    }}
    whileHover={{ scale: 1.05 }} // Animação de escala ao passar o mouse.
    whileTap={{ scale: 0.95 }} // Animação de escala ao clicar no botão.
    tabIndex={0} // Torna o botão navegável pelo teclado.
  >
    <Icon size={48} className="mb-2 text-white" />{" "}
    {/* Renderiza o ícone com tamanho e cor definidos */}
    <span className="mt-2 text-lg font-semibold text-white">{label}</span>{" "}
    {/* Exibe o rótulo abaixo do ícone */}
  </motion.div>
);

// Componente principal que renderiza a página de seleção de empresa.
const SelectPage = () => {
  const router = useRouter(); // Hook para navegação e redirecionamento de páginas.
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null); // Estado para armazenar a empresa selecionada.

  // Função chamada ao clicar em uma empresa.
  const handleSelect = (company: string) => {
    setSelectedCompany(company); // Atualiza o estado com a empresa selecionada.

    // Verifica se o localStorage está disponível no navegador (evita erros em SSR).
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCompany", company); // Armazena a empresa selecionada no localStorage.
    }

    router.push("/form"); // Redireciona o usuário para a página do formulário após a seleção.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] p-4">
      {/* Container principal com altura mínima da tela, centralizando o conteúdo com fundo claro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Animação inicial com opacidade 0 e translação para baixo.
        animate={{ opacity: 1, y: 0 }} // Animação final com opacidade 1 e posição normal.
        transition={{ duration: 0.5 }} // Transição suave de 0.5 segundos.
      >
        <Card className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6">
          {/* Card que contém o conteúdo de seleção de empresa */}
          <CardHeader>
            <CardTitle className="text-center text-3xl font-extrabold text-[#af1b1b] mb-8">
              Selecione a Empresa
            </CardTitle>{" "}
            {/* Título principal da página de seleção */}
          </CardHeader>
          <CardContent className="text-center">
            {/* Conteúdo principal do Card */}
            <div className="grid grid-cols-1 gap-6">
              {/* Layout de grade com 1 coluna e espaçamento entre os botões */}
              <SelectionButton
                company="vale" // Nome da empresa Vale.
                icon={FaIndustry} // Ícone da indústria.
                label="Vale" // Rótulo visível do botão.
                gradientFrom="#af1b1b" // Cor inicial do gradiente (vermelho).
                gradientTo="#cc1f1f" // Cor final do gradiente (vermelho mais claro).
                onSelect={handleSelect} // Função executada ao clicar.
              />
              <SelectionButton
                company="alumar" // Nome da empresa Alumar.
                icon={FaBuilding} // Ícone de prédio.
                label="Alumar" // Rótulo visível do botão.
                gradientFrom="#af1b1b" // Cor inicial do gradiente.
                gradientTo="#cc1f1f" // Cor final do gradiente.
                onSelect={handleSelect} // Função executada ao clicar.
              />
              <SelectionButton
                company="projeta" // Nome da empresa Projeta.
                icon={FaChessPawn} // Ícone de pião de xadrez.
                label="Projeta" // Rótulo visível do botão.
                gradientFrom="#af1b1b" // Cor inicial do gradiente.
                gradientTo="#cc1f1f" // Cor final do gradiente.
                onSelect={handleSelect} // Função executada ao clicar.
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SelectPage; // Exporta o componente principal para uso na aplicação.
