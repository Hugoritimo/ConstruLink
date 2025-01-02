"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "react-hot-toast";
import SignatureCanvas, { SignatureCanvasRef } from "react-signature-canvas";
import { FaExclamationCircle } from "react-icons/fa";
import Image from "next/image";

// Seus componentes de UI (ajuste os paths conforme necessário)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// ---------------------------------------------------------------------
// 1) DEFINIÇÃO DO SCHEMA ZOD (Adaptando as perguntas do RDO)
const rootSchema = z.object({
  // Step 1
  objeto: z.string().optional(),
  nrContrato: z.string().optional(),
  ccObra: z.string().optional(),
  contratante: z.string().optional(),
  responsavel: z.string().optional(),
  data: z.string().optional(),

  // Step 2
  observacoesProjeta: z.string().optional(),
  equipeExecucao: z
    .array(
      z.object({
        funcao: z.string(), // Engenheiro, Consultor, etc.
        qtd: z.string().optional(),
      })
    )
    .optional(),

  // Step 3
  servicosEmExecucao: z.string().optional(),
  equipamentos: z
    .array(
      z.object({
        nome: z.string(),
        qtd: z.string().optional(),
      })
    )
    .optional(),
  ferramentas: z
    .array(
      z.object({
        nome: z.string(),
        qtd: z.string().optional(),
      })
    )
    .optional(),

  // Step 4
  ocorrenciaGeral: z.string().optional(),
  observacoesCliente: z.string().optional(),

  // Step 5
  condMeteo: z.enum(["BOM", "CHUVOSO"]).optional(),
  regimeTrabalho: z.enum(["HORA_NORMAL", "HORA_EXTRA"]).optional(),
  assinaturaProjetista: z.string().optional(), // Base64
  assinaturaContratante: z.string().optional(), // Base64
});

// ---------------------------------------------------------------------
// 2) TIPAGEM DO FORMULÁRIO
type FormData = z.infer<typeof rootSchema>;

// 3) VALORES INICIAIS (defaultValues)
const defaultEquipe = [
  { funcao: "Engenheiro", qtd: "" },
  { funcao: "Especialista", qtd: "" },
  { funcao: "Consultor", qtd: "" },
  { funcao: "Projetista", qtd: "" },
  { funcao: "Cadista", qtd: "" },
  { funcao: "Encarregado", qtd: "" },
  { funcao: "Topógrafo", qtd: "" },
  { funcao: "Sondador", qtd: "" },
  { funcao: "Pedreiro", qtd: "" },
  { funcao: "Téc. Segurança", qtd: "" },
  { funcao: "Ajudante", qtd: "" },
  { funcao: "Eletricista", qtd: "" },
  { funcao: "Instalador", qtd: "" },
  { funcao: "Auxiliar", qtd: "" },
];

const defaultEquipamentos = [
  { nome: "Guindaste", qtd: "" },
  { nome: "Retroescavadeira", qtd: "" },
  { nome: "Plataforma Elevatória", qtd: "" },
];

const defaultFerramentas = [
  { nome: "Martelete", qtd: "" },
  { nome: "Furadeira", qtd: "" },
  { nome: "Esmerilhadeira", qtd: "" },
];

// ---------------------------------------------------------------------
// 4) STEPS

// Step 1: Dados gerais
const StepOne: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div className="space-y-4">
      {/* Objeto */}
      <div>
        <Label htmlFor="objeto">Objeto</Label>
        <Input
          id="objeto"
          {...register("objeto")}
          placeholder="Descrição do objeto (Obra)"
          className={`${errors.objeto ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.objeto && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.objeto.message}
          </div>
        )}
      </div>

      {/* Nr Contrato/Pedido */}
      <div>
        <Label htmlFor="nrContrato">Nº Contrato/Pedido</Label>
        <Input
          id="nrContrato"
          {...register("nrContrato")}
          placeholder="Ex: 12345"
          className={`${
            errors.nrContrato ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.nrContrato && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.nrContrato.message}
          </div>
        )}
      </div>

      {/* C.C / Obra */}
      <div>
        <Label htmlFor="ccObra">C.C / Obra</Label>
        <Input
          id="ccObra"
          {...register("ccObra")}
          placeholder="Centro de Custo / Obra"
          className={`${errors.ccObra ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.ccObra && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.ccObra.message}
          </div>
        )}
      </div>

      {/* Contratante */}
      <div>
        <Label htmlFor="contratante">Contratante</Label>
        <Input
          id="contratante"
          {...register("contratante")}
          placeholder="Empresa Contratante"
          className={`${
            errors.contratante ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.contratante && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.contratante.message}
          </div>
        )}
      </div>

      {/* Responsável */}
      <div>
        <Label htmlFor="responsavel">Responsável</Label>
        <Input
          id="responsavel"
          {...register("responsavel")}
          placeholder="Nome do responsável"
          className={`${
            errors.responsavel ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.responsavel && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.responsavel.message}
          </div>
        )}
      </div>

      {/* Data */}
      <div>
        <Label htmlFor="data">Data</Label>
        <Input
          id="data"
          type="date"
          {...register("data")}
          className={`${errors.data ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.data && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.data.message}
          </div>
        )}
      </div>
    </div>
  );
};

// Step 2: Observações Projeta + Equipe
const StepTwo: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<FormData>();

  // Observações Projeta
  const obsProjeta = watch("observacoesProjeta");

  // Equipe Execução
  const equipeExecucao = watch("equipeExecucao");

  // Função para atualizar a qtd da equipe
  const handleChangeQtd = (index: number, newQtd: string) => {
    if (!equipeExecucao) return;
    const updated = [...equipeExecucao];
    updated[index].qtd = newQtd;
    setValue("equipeExecucao", updated, { shouldDirty: true });
  };

  return (
    <div className="space-y-4">
      {/* Observações Projeta */}
      <div>
        <Label htmlFor="observacoesProjeta">Observações Projeta</Label>
        <Textarea
          id="observacoesProjeta"
          placeholder="Informe observações do projeto..."
          {...register("observacoesProjeta")}
          className={`${
            errors.observacoesProjeta ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.observacoesProjeta && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.observacoesProjeta.message}
          </div>
        )}
      </div>

      {/* Equipe de Execução */}
      <div>
        <Label className="font-semibold text-lg">Equipe de Execução</Label>
        {equipeExecucao?.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 py-1">
            <Label className="w-32">{item.funcao}:</Label>
            <Input
              type="number"
              placeholder="Qtd"
              value={item.qtd}
              onChange={(e) => handleChangeQtd(index, e.target.value)}
              className="w-24"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Step 3: Serviços, Equipamentos, Ferramentas
const StepThree: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<FormData>();

  const servicosEmExecucao = watch("servicosEmExecucao");

  // Equipamentos
  const equipamentos = watch("equipamentos");
  const updateEquip = (index: number, qtd: string) => {
    if (!equipamentos) return;
    const updated = [...equipamentos];
    updated[index].qtd = qtd;
    setValue("equipamentos", updated, { shouldDirty: true });
  };

  // Ferramentas
  const ferramentas = watch("ferramentas");
  const updateFerrar = (index: number, qtd: string) => {
    if (!ferramentas) return;
    const updated = [...ferramentas];
    updated[index].qtd = qtd;
    setValue("ferramentas", updated, { shouldDirty: true });
  };

  return (
    <div className="space-y-4">
      {/* Serviços em Execução */}
      <div>
        <Label htmlFor="servicosEmExecucao">Serviços em Execução</Label>
        <Textarea
          id="servicosEmExecucao"
          placeholder="Descreva os serviços em execução"
          {...register("servicosEmExecucao")}
          className={`${
            errors.servicosEmExecucao ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.servicosEmExecucao && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.servicosEmExecucao.message}
          </div>
        )}
      </div>

      {/* Equipamentos */}
      <div>
        <Label className="font-semibold text-lg">Equipamentos</Label>
        {equipamentos?.map((eq, index) => (
          <div key={index} className="flex items-center space-x-2 py-1">
            <Label className="w-48">{eq.nome}:</Label>
            <Input
              type="number"
              placeholder="Qtd"
              value={eq.qtd}
              onChange={(e) => updateEquip(index, e.target.value)}
              className="w-24"
            />
          </div>
        ))}
      </div>

      {/* Ferramentas / Acessórios */}
      <div>
        <Label className="font-semibold text-lg">Ferramentas / Acessórios</Label>
        {ferramentas?.map((ferr, index) => (
          <div key={index} className="flex items-center space-x-2 py-1">
            <Label className="w-48">{ferr.nome}:</Label>
            <Input
              type="number"
              placeholder="Qtd"
              value={ferr.qtd}
              onChange={(e) => updateFerrar(index, e.target.value)}
              className="w-24"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Step 4: Ocorrências, Observações do Cliente
const StepFour: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div className="space-y-4">
      {/* Ocorrência Geral */}
      <div>
        <Label htmlFor="ocorrenciaGeral">Ocorrência Geral</Label>
        <Textarea
          id="ocorrenciaGeral"
          placeholder="Descreva ocorrências gerais"
          {...register("ocorrenciaGeral")}
          className={`${
            errors.ocorrenciaGeral ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.ocorrenciaGeral && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.ocorrenciaGeral.message}
          </div>
        )}
      </div>

      {/* Observações do Cliente */}
      <div>
        <Label htmlFor="observacoesCliente">Observações do Cliente</Label>
        <Textarea
          id="observacoesCliente"
          placeholder="Registre observações do cliente"
          {...register("observacoesCliente")}
          className={`${
            errors.observacoesCliente ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.observacoesCliente && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.observacoesCliente.message}
          </div>
        )}
      </div>
    </div>
  );
};

// Step 5: Condições, Regime, Assinaturas
const StepFive: React.FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<FormData>();

  // Ref p/ assinatura projetista
  const projCanvasRef = useRef<SignatureCanvasRef | null>(null);
  // Ref p/ assinatura contratante
  const contrCanvasRef = useRef<SignatureCanvasRef | null>(null);

  const condMeteo = watch("condMeteo");
  const regimeTrabalho = watch("regimeTrabalho");
  const assinaturaProjetista = watch("assinaturaProjetista");
  const assinaturaContratante = watch("assinaturaContratante");

  // Funções para salvar/limpar
  const saveProjAssinatura = () => {
    if (projCanvasRef.current) {
      const signature = projCanvasRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setValue("assinaturaProjetista", signature, { shouldValidate: true });
    }
  };

  const clearProjAssinatura = () => {
    if (projCanvasRef.current) {
      projCanvasRef.current.clear();
      setValue("assinaturaProjetista", "", { shouldValidate: true });
    }
  };

  const saveContrAssinatura = () => {
    if (contrCanvasRef.current) {
      const signature = contrCanvasRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setValue("assinaturaContratante", signature, { shouldValidate: true });
    }
  };

  const clearContrAssinatura = () => {
    if (contrCanvasRef.current) {
      contrCanvasRef.current.clear();
      setValue("assinaturaContratante", "", { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-4">
      {/* Condições Meteorológicas */}
      <div>
        <Label className="font-semibold text-lg">
          Condições Meteorológicas
        </Label>
        <div className="space-x-4">
          <label>
            <input
              type="radio"
              value="BOM"
              {...register("condMeteo")}
              checked={condMeteo === "BOM"}
            />
            <span className="ml-1">Bom</span>
          </label>
          <label>
            <input
              type="radio"
              value="CHUVOSO"
              {...register("condMeteo")}
              checked={condMeteo === "CHUVOSO"}
            />
            <span className="ml-1">Chuvoso</span>
          </label>
        </div>
        {errors.condMeteo && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.condMeteo.message}
          </div>
        )}
      </div>

      {/* Regime de Trabalho */}
      <div>
        <Label className="font-semibold text-lg">Regime de Trabalho</Label>
        <div className="space-x-4">
          <label>
            <input
              type="radio"
              value="HORA_NORMAL"
              {...register("regimeTrabalho")}
              checked={regimeTrabalho === "HORA_NORMAL"}
            />
            <span className="ml-1">Hora Normal</span>
          </label>
          <label>
            <input
              type="radio"
              value="HORA_EXTRA"
              {...register("regimeTrabalho")}
              checked={regimeTrabalho === "HORA_EXTRA"}
            />
            <span className="ml-1">Hora Extra</span>
          </label>
        </div>
        {errors.regimeTrabalho && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.regimeTrabalho.message}
          </div>
        )}
      </div>

      {/* Assinatura Projetista */}
      <div>
        <Label className="font-semibold text-lg">
          Assinatura (Projetista)
        </Label>
        <div className="border p-2 rounded-md">
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              width: 400,
              height: 200,
              className: "sigCanvas",
            }}
            ref={projCanvasRef}
            onEnd={saveProjAssinatura}
          />
        </div>
        <div className="flex space-x-2 mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={clearProjAssinatura}
          >
            Limpar
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={saveProjAssinatura}
          >
            Salvar
          </Button>
        </div>
        {/* Campo oculto p/ base64 */}
        <input
          type="hidden"
          {...register("assinaturaProjetista")}
          value={assinaturaProjetista}
        />
      </div>

      {/* Assinatura Contratante */}
      <div>
        <Label className="font-semibold text-lg">
          Assinatura (Contratante)
        </Label>
        <div className="border p-2 rounded-md">
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              width: 400,
              height: 200,
              className: "sigCanvas",
            }}
            ref={contrCanvasRef}
            onEnd={saveContrAssinatura}
          />
        </div>
        <div className="flex space-x-2 mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={clearContrAssinatura}
          >
            Limpar
          </Button>
          <Button type="button" variant="default" onClick={saveContrAssinatura}>
            Salvar
          </Button>
        </div>
        <input
          type="hidden"
          {...register("assinaturaContratante")}
          value={assinaturaContratante}
        />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------
// 9) COMPONENTE PRINCIPAL MULTISTEP FORM
export default function MultiStepForm() {
  const methods = useForm<FormData>({
    resolver: zodResolver(rootSchema),
    defaultValues: {
      // Step 1
      objeto: "",
      nrContrato: "",
      ccObra: "",
      contratante: "",
      responsavel: "",
      data: "",

      // Step 2
      observacoesProjeta: "",
      equipeExecucao: defaultEquipe, // array com { funcao, qtd }

      // Step 3
      servicosEmExecucao: "",
      equipamentos: defaultEquipamentos,
      ferramentas: defaultFerramentas,

      // Step 4
      ocorrenciaGeral: "",
      observacoesCliente: "",

      // Step 5
      condMeteo: undefined,
      regimeTrabalho: undefined,
      assinaturaProjetista: "",
      assinaturaContratante: "",
    },
    mode: "onBlur",
  });

  const { watch, setValue, handleSubmit } = methods;
  const [currentStep, setCurrentStep] = useState(1);

  // Total de steps -> 5
  const totalSteps = 5;

  // Para salvar no localStorage, se desejar
  const formValues = watch();
  const localStorageKey = "multistepFormDataRDO";

  useEffect(() => {
    // Carrega do localStorage
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.keys(parsed).forEach((field) => {
        setValue(field as keyof FormData, parsed[field], {
          shouldValidate: false,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(formValues));
  }, [formValues]);

  // Navegação
  const goNext = () => setCurrentStep((prev) => prev + 1);
  const goBack = () => setCurrentStep((prev) => prev - 1);

  // Submit final
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/submit-rdo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Erro ao enviar o RDO.");
      }
      // Se sucesso
      console.log("Dados Finais RDO:", data);
      localStorage.removeItem(localStorageKey);
      toast.success("RDO finalizado e dados enviados.");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao enviar o RDO. Tente novamente.");
    }
  };

  // Progresso
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  // Render
  return (
    <FormProvider {...methods}>
      <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
        <Toaster position="top-right" />

        <motion.h1
          className="text-2xl md:text-3xl font-extrabold text-[#af1b1b] mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          RDO - Relatório Diário de Obra
        </motion.h1>

        {/* Barra de Progresso */}
        <div className="w-full max-w-3xl mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">
              Etapa {currentStep} de {totalSteps}
            </span>
            <span className="text-sm text-gray-600">
              {progressPercent}% completo
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-red-600 h-4 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-3xl bg-white p-4 md:p-8 rounded-lg shadow space-y-6"
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <StepOne />
              </motion.div>
            )}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <StepTwo />
              </motion.div>
            )}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <StepThree />
              </motion.div>
            )}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <StepFour />
              </motion.div>
            )}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <StepFive />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botões de navegação */}
          <div className="flex justify-between mt-4">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={goBack}>
                Voltar
              </Button>
            )}
            {currentStep < totalSteps && (
              <Button type="button" variant="default" onClick={goNext}>
                Próximo
              </Button>
            )}
            {currentStep === totalSteps && (
              <Button type="submit" variant="destructive">
                Finalizar
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
