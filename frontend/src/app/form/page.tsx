"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

interface FormData {
  rdoNumber: string;
  empresa: string;
  cliente: string;
  usuarioPreencheu: string;
  dataRelatorio: string;
  localObra: string;
  gerenteResponsavel: string;
  tipoObra: string;
  etapaAtual: string;
  descricaoAtividade: string;
  efetivo: { nome: string; funcao: string; quantidade: string }[];
  equipamentos: { nome: string; quantidade: string }[];
}

const initialFormData: FormData = {
  rdoNumber: "001",
  empresa: "",
  cliente: "",
  usuarioPreencheu: "",
  dataRelatorio: "",
  localObra: "",
  gerenteResponsavel: "",
  tipoObra: "",
  etapaAtual: "",
  descricaoAtividade: "",
  efetivo: [{ nome: "", funcao: "", quantidade: "" }],
  equipamentos: [{ nome: "", quantidade: "" }],
};

const RelatorioDiarioObras: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    fieldName: string,
    arrayName: keyof FormData
  ) => {
    const { value } = e.target;
    setFormData((prevState) => {
      const updatedArray = [...(prevState[arrayName] as any)];
      updatedArray[index][fieldName] = value;
      return {
        ...prevState,
        [arrayName]: updatedArray,
      };
    });
  };

  const addArrayItem = (arrayName: keyof FormData, newItem: any) => {
    setFormData((prevState) => {
      const updatedArray = [...(prevState[arrayName] as any), newItem];
      return {
        ...prevState,
        [arrayName]: updatedArray,
      };
    });
  };

  const removeArrayItem = (arrayName: keyof FormData, index: number) => {
    setFormData((prevState) => {
      const updatedArray = [...(prevState[arrayName] as any)];
      updatedArray.splice(index, 1);
      return {
        ...prevState,
        [arrayName]: updatedArray,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "/api/generate-pdf",
        { formData },
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "construlink.pdf";
      link.click();

      await axios.post("/api/save-to-sharepoint", { formData });

      setIsSuccess(true);
    } catch (error) {
      setErrorMessage("Erro ao processar a solicitação.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <motion.h1
        className="text-4xl font-extrabold text-[#af1b1b] mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ConstruLink - Relatório Diário de Obras
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg space-y-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Label htmlFor="empresa">Empresa</Label>
        <Input id="empresa" name="empresa" value={formData.empresa} onChange={handleChange} />

        <Label htmlFor="cliente">Cliente</Label>
        <Input id="cliente" name="cliente" value={formData.cliente} onChange={handleChange} />

        <Label htmlFor="usuarioPreencheu">Usuário</Label>
        <Input id="usuarioPreencheu" name="usuarioPreencheu" value={formData.usuarioPreencheu} onChange={handleChange} />

        <Label htmlFor="dataRelatorio">Data</Label>
        <Input id="dataRelatorio" name="dataRelatorio" type="date" value={formData.dataRelatorio} onChange={handleChange} />

        <div>
          <h2 className="text-xl font-bold mt-6 mb-2">Efetivo</h2>
          {formData.efetivo.map((efetivo, index) => (
            <div key={index} className="border p-4 mb-4">
              <Label htmlFor={`efetivo-nome-${index}`}>Nome</Label>
              <Input id={`efetivo-nome-${index}`} name="nome" value={efetivo.nome} onChange={(e) => handleArrayChange(e, index, "nome", "efetivo")} />
              <Label htmlFor={`efetivo-funcao-${index}`}>Função</Label>
              <Input id={`efetivo-funcao-${index}`} name="funcao" value={efetivo.funcao} onChange={(e) => handleArrayChange(e, index, "funcao", "efetivo")} />
              <Label htmlFor={`efetivo-quantidade-${index}`}>Quantidade</Label>
              <Input id={`efetivo-quantidade-${index}`} name="quantidade" value={efetivo.quantidade} onChange={(e) => handleArrayChange(e, index, "quantidade", "efetivo")} />
              <Button type="button" onClick={() => removeArrayItem("efetivo", index)}>
                Remover
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => addArrayItem("efetivo", { nome: "", funcao: "", quantidade: "" })}>
            Adicionar Efetivo
          </Button>
        </div>

        <div>
          <h2 className="text-xl font-bold mt-6 mb-2">Descrição da Atividade</h2>
          <Textarea id="descricaoAtividade" name="descricaoAtividade" value={formData.descricaoAtividade} onChange={handleChange} />
        </div>

        <div className="flex justify-center mt-6">
          <Button type="submit" className="bg-[#af1b1b] text-white px-6 py-3 rounded-md hover:bg-[#951818] transition-colors duration-300" disabled={isSubmitting}>
            {isSubmitting ? "Processando..." : "Gerar PDF e Salvar"}
          </Button>
        </div>

        {isSuccess && (
          <motion.p className="text-green-500 mt-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            PDF gerado e dados salvos com sucesso!
          </motion.p>
        )}
        {isError && errorMessage && (
          <motion.p className="text-red-500 mt-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {errorMessage}
          </motion.p>
        )}
      </motion.form>
    </div>
  );
};

export default RelatorioDiarioObras;