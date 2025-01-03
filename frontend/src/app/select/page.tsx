"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

// Opções de logos (caminhos no /public/logos/):
const VALE_LOGO = "/img/vale";
const ALUMAR_LOGO = "/logos/alumar-logo.png";
const PROJETA_LOGO = "/logos/projeta-logo.png";

// Propriedades para o componente SelectionButton
interface SelectionButtonProps {
  company: string;
  label: string;
  gradientFrom: string;
  gradientTo: string;
  logoSrc: string;
  onSelect: (company: string, imageSrc: string) => void;
}

const SelectionButton: React.FC<SelectionButtonProps> = ({
  company,
  label,
  gradientFrom,
  gradientTo,
  logoSrc,
  onSelect,
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
        border: "1px solid rgba(0, 0, 0, 0.1)",
        height: "140px",
        width: "100%",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(company, logoSrc)}
      role="button"
      aria-label={`Selecionar ${label}`}
      tabIndex={0}
    >
      {/* Exibindo a imagem do logo */}
      <div className="mb-2">
        <Image src={logoSrc} alt={label} width={48} height={48} />
      </div>
      <span className="mt-2 text-lg font-semibold text-white">{label}</span>
    </motion.div>
  );
};

export default function SelectPage() {
  const router = useRouter();

  // Recebe a seleção e salva no localStorage
  const handleSelect = (company: string, imageSrc: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "selectedCompany",
        JSON.stringify({ company, imageSrc })
      );
    }
    router.push("/form"); // Redireciona para o formulário
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6"
      >
        <h1 className="text-3xl font-extrabold text-[#af1b1b] text-center mb-8">
          Selecione a Empresa
        </h1>
        <div className="grid grid-cols-1 gap-6">
          <SelectionButton
            company="vale"
            label="Vale"
            gradientFrom="#af1b1b"
            gradientTo="#cc1f1f"
            logoSrc={VALE_LOGO}
            onSelect={handleSelect}
          />
          <SelectionButton
            company="alumar"
            label="Alumar"
            gradientFrom="#af1b1b"
            gradientTo="#cc1f1f"
            logoSrc={ALUMAR_LOGO}
            onSelect={handleSelect}
          />
          <SelectionButton
            company="projeta"
            label="Projeta"
            gradientFrom="#af1b1b"
            gradientTo="#cc1f1f"
            logoSrc={PROJETA_LOGO}
            onSelect={handleSelect}
          />
        </div>
      </motion.div>
    </div>
  );
}
