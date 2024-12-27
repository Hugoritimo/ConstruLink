// src/app/form/page.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useForm,
  FormProvider,
  useFormContext,
  SubmitHandler,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "react-hot-toast";
import SignatureCanvas, { SignatureCanvasRef } from "react-signature-canvas";
import { FaExclamationCircle } from "react-icons/fa";
import Image from "next/image";
import {
  TooltipProviderCustom,
  TooltipCustom,
  TooltipTriggerCustom,
  TooltipContentCustom,
} from "../../components/TooltipComponents"; // Importação relativa

import Button from "../../components/Button";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Textarea from "../../components/Textarea";
import Checkbox from "../../components/Checkbox";

// ----------------------------------------------------------------------------
// 1) Definindo Schema de Validação com Zod (Todos os campos opcionais)
// ----------------------------------------------------------------------------
const stepOneSchema = z.object({
  nomeCompleto: z
    .string()
    .min(3, "Seu nome deve ter ao menos 3 letras.")
    .optional()
    .or(z.literal("")), // Permite campo vazio
  email: z.string().email("Email inválido.").optional().or(z.literal("")),
});

const stepTwoSchema = z.object({
  checklistSeguranca: z
    .array(
      z.object({
        item: z.string(),
        status: z.boolean(),
      })
    )
    .optional(),
  observacoes: z.string().optional(),
});

const stepThreeSchema = z.object({
  mensagemFinal: z.string().optional(),
  assinatura: z
    .string()
    .min(10, "Por favor, assine o formulário.")
    .optional()
    .or(z.literal("")),
});

const rootSchema = z.object({
  nomeCompleto: z
    .string()
    .min(3, "Seu nome deve ter ao menos 3 letras.")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Email inválido.").optional().or(z.literal("")),
  checklistSeguranca: z
    .array(
      z.object({
        item: z.string(),
        status: z.boolean(),
      })
    )
    .optional(),
  observacoes: z.string().optional(),
  mensagemFinal: z.string().optional(),
  assinatura: z
    .string()
    .min(10, "Por favor, assine o formulário.")
    .optional()
    .or(z.literal("")),
});

// ----------------------------------------------------------------------------
// 2) Estado inicial do checklist
// ----------------------------------------------------------------------------
const initialChecklist = [
  { item: "EPI Adequado", status: false },
  { item: "Área Sinalizada", status: false },
  { item: "Treinamento Atualizado", status: false },
  { item: "Equipamentos Revisados", status: false },
  { item: "Sistemas de Ventilação Funcionando", status: false },
  { item: "Extintores de Incêndio Disponíveis", status: false },
];

// ----------------------------------------------------------------------------
// 3) Hook para Tipagem do Formulário
// ----------------------------------------------------------------------------
type FormData = z.infer<typeof rootSchema>;

// ----------------------------------------------------------------------------
// 4) Componentes de Etapas
// ----------------------------------------------------------------------------

// Etapa 1: Informações Pessoais
const StepOne: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div className="space-y-4">
      {/* Nome Completo */}
      <div>
        <Label htmlFor="nomeCompleto">Nome Completo</Label>
        <TooltipProviderCustom>
          <TooltipCustom>
            <TooltipTriggerCustom asChild>
              <Input
                id="nomeCompleto"
                {...register("nomeCompleto")}
                placeholder="Seu nome"
                className={`${
                  errors.nomeCompleto ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.nomeCompleto ? "true" : "false"}
              />
            </TooltipTriggerCustom>
            <TooltipContentCustom>
              Insira seu nome completo conforme documento oficial.
            </TooltipContentCustom>
          </TooltipCustom>
        </TooltipProviderCustom>
        {errors.nomeCompleto && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.nomeCompleto.message}
          </div>
        )}
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <TooltipProviderCustom>
          <TooltipCustom>
            <TooltipTriggerCustom asChild>
              <Input
                id="email"
                {...register("email")}
                placeholder="seuemail@exemplo.com"
                className={`${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.email ? "true" : "false"}
              />
            </TooltipTriggerCustom>
            <TooltipContentCustom>
              Insira um endereço de email válido para contato.
            </TooltipContentCustom>
          </TooltipCustom>
        </TooltipProviderCustom>
        {errors.email && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.email.message}
          </div>
        )}
      </div>
    </div>
  );
};

// Etapa 2: Checklist de Segurança e Observações
const StepTwo: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormData>();
  const checklist = watch("checklistSeguranca");

  // Função para alternar o status do item do checklist
  const toggleItem = (index: number) => {
    const newList = [...(checklist || [])];
    newList[index].status = !newList[index].status;
    setValue("checklistSeguranca", newList, { shouldDirty: true });
  };

  // Função para retornar o conteúdo do tooltip com base no item
  const getTooltipContent = (item: string): string => {
    switch (item) {
      case "EPI Adequado":
        return "Verifique se todos os Equipamentos de Proteção Individual estão disponíveis e em boas condições.";
      case "Área Sinalizada":
        return "As áreas de trabalho estão devidamente sinalizadas para garantir a segurança.";
      case "Treinamento Atualizado":
        return "Certifique-se de que todos os funcionários receberam treinamentos atualizados.";
      case "Equipamentos Revisados":
        return "Todos os equipamentos foram revisados recentemente e estão operando corretamente.";
      case "Sistemas de Ventilação Funcionando":
        return "Os sistemas de ventilação estão operando eficientemente para garantir um ambiente saudável.";
      case "Extintores de Incêndio Disponíveis":
        return "Extintores de incêndio estão disponíveis e acessíveis em todas as áreas.";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Checklist de Segurança */}
      <div>
        <Label className="font-semibold text-lg">Checklist de Segurança</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-50 p-4 rounded">
          <TooltipProviderCustom>
            {checklist &&
              checklist.map((item, index) => (
                <TooltipCustom key={index}>
                  <TooltipTriggerCustom asChild>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={item.status}
                        onChange={() => toggleItem(index)}
                      />
                      <Label className="cursor-pointer">{item.item}</Label>
                    </div>
                  </TooltipTriggerCustom>
                  <TooltipContentCustom>
                    {getTooltipContent(item.item)}
                  </TooltipContentCustom>
                </TooltipCustom>
              ))}
          </TooltipProviderCustom>
        </div>
        {errors.checklistSeguranca && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.checklistSeguranca.message}
          </div>
        )}
      </div>

      {/* Observações */}
      <div>
        <Label htmlFor="observacoes">Observações</Label>
        <TooltipProviderCustom>
          <TooltipCustom>
            <TooltipTriggerCustom asChild>
              <Textarea
                id="observacoes"
                placeholder="Observações gerais..."
                {...register("observacoes")}
                className={`${
                  errors.observacoes ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.observacoes ? "true" : "false"}
              />
            </TooltipTriggerCustom>
            <TooltipContentCustom>
              Adicione qualquer observação ou comentário adicional.
            </TooltipContentCustom>
          </TooltipCustom>
        </TooltipProviderCustom>
        {errors.observacoes && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.observacoes.message}
          </div>
        )}
      </div>
    </div>
  );
};

// Etapa 3: Mensagem Final / Considerações e Assinatura
const StepThree: React.FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<FormData>();

  const sigCanvasRef = useRef<SignatureCanvasRef>(null);

  // Função para capturar assinatura
  const saveSignature = () => {
    if (sigCanvasRef.current) {
      const signature = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
      setValue("assinatura", signature, { shouldValidate: true });
    }
  };

  // Função para limpar a assinatura
  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
      setValue("assinatura", "", { shouldValidate: true });
    }
  };

  const assinatura = watch("assinatura");

  return (
    <div className="space-y-4">
      {/* Mensagem Final */}
      <div>
        <Label htmlFor="mensagemFinal" className="font-semibold text-lg">
          Mensagem Final / Considerações
        </Label>
        <TooltipProviderCustom>
          <TooltipCustom>
            <TooltipTriggerCustom asChild>
              <Textarea
                id="mensagemFinal"
                placeholder="Se quiser deixar uma mensagem final..."
                {...register("mensagemFinal")}
                className={`${
                  errors.mensagemFinal ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.mensagemFinal ? "true" : "false"}
              />
            </TooltipTriggerCustom>
            <TooltipContentCustom>
              Adicione qualquer comentário ou consideração final.
            </TooltipContentCustom>
          </TooltipCustom>
        </TooltipProviderCustom>
        {errors.mensagemFinal && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.mensagemFinal.message}
          </div>
        )}
      </div>

      {/* Assinatura */}
      <div>
        <Label htmlFor="assinatura" className="font-semibold text-lg">
          Assinatura
        </Label>
        <TooltipProviderCustom>
          <TooltipCustom>
            <TooltipTriggerCustom asChild>
              <div className="border p-2 rounded-md">
                <SignatureCanvas
                  penColor="black"
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: "sigCanvas",
                  }}
                  ref={sigCanvasRef}
                  onEnd={saveSignature}
                />
              </div>
            </TooltipTriggerCustom>
            <TooltipContentCustom>
              Assine abaixo usando o mouse ou o touch.
            </TooltipContentCustom>
          </TooltipCustom>
        </TooltipProviderCustom>
        <div className="flex space-x-2 mt-2">
          <Button type="button" onClick={clearSignature} variant="outline">
            Limpar Assinatura
          </Button>
          <Button type="button" onClick={saveSignature} variant="default">
            Salvar Assinatura
          </Button>
        </div>
        {errors.assinatura && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.assinatura.message}
          </div>
        )}
        {/* Campo oculto para armazenar a assinatura em base64 */}
        <input
          type="hidden"
          {...register("assinatura")}
          value={assinatura}
        />
      </div>
    </div>
  );
};

// Etapa 4: Revisão dos Dados
const StepFour: React.FC = () => {
  const { getValues } = useFormContext<FormData>();
  const data = getValues();

  // Função para exibir a imagem da assinatura
  const renderSignature = () => {
    if (data.assinatura) {
      return (
        <Image
          src={data.assinatura}
          alt="Assinatura"
          width={256} // Defina a largura desejada
          height={100} // Defina a altura desejada
          className="w-64 h-auto border p-2 object-contain"
        />
      );
    }
    return <p>Nenhuma assinatura fornecida.</p>;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Revisão dos Dados</h2>
      <div className="space-y-2">
        {data.nomeCompleto && (
          <p>
            <strong>Nome Completo:</strong> {data.nomeCompleto}
          </p>
        )}
        {data.email && (
          <p>
            <strong>Email:</strong> {data.email}
          </p>
        )}
        {data.checklistSeguranca && data.checklistSeguranca.length > 0 && (
          <div>
            <strong>Checklist de Segurança:</strong>
            <ul className="list-disc list-inside">
              {data.checklistSeguranca
                .filter((item) => item.status)
                .map((item, index) => (
                  <li key={index}>{item.item}</li>
                ))}
            </ul>
          </div>
        )}
        {data.observacoes && (
          <p>
            <strong>Observações:</strong> {data.observacoes}
          </p>
        )}
        {data.mensagemFinal && (
          <p>
            <strong>Mensagem Final:</strong> {data.mensagemFinal}
          </p>
        )}
        <div>
          <strong>Assinatura:</strong>
          <div className="mt-2">{renderSignature()}</div>
        </div>
      </div>
      <p className="text-gray-600">
        Revise todos os dados acima. Se precisar fazer alguma alteração, clique em
        &quot;Voltar&quot;.
      </p>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 5) Componente Principal (MultiStepForm)
// ----------------------------------------------------------------------------
const MultiStepForm: React.FC = () => {
  // Passo atual
  const [currentStep, setCurrentStep] = useState(1);

  // React Hook Form - usaremos um único form global
  const methods = useForm<FormData>({
    resolver: zodResolver(rootSchema),
    defaultValues: {
      nomeCompleto: "",
      email: "",
      checklistSeguranca: initialChecklist,
      observacoes: "",
      mensagemFinal: "",
      assinatura: "",
    },
    mode: "onBlur", // Valida ao sair do campo. Pode ser "onChange"
  });

  const { watch, setValue, handleSubmit, formState } = methods;

  // ----------------------------------------------------------------------------
  // Auto-Save no Local Storage
  // ----------------------------------------------------------------------------
  const formValues = watch(); // Observa todos os valores do form
  const localStorageKey = "multistepFormData";

  // Carrega do local storage ao montar
  useEffect(() => {
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Setamos cada campo do form:
      Object.keys(parsed).forEach((field: string) => {
        setValue(field as keyof FormData, parsed[field], {
          shouldValidate: false,
        });
      });
    }
  }, [setValue]);

  // Salva no local storage a cada mudança
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(formValues));
  }, [formValues]);

  // ----------------------------------------------------------------------------
  // Avançar / Voltar steps
  // ----------------------------------------------------------------------------
  const goNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const goBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // ----------------------------------------------------------------------------
  // Submeter no final (Step 4)
  // ----------------------------------------------------------------------------
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Envia os dados para a API
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar o formulário.");
      }

      // Sucesso
      console.log("Dados Finais: ", data);

      // Limpa o localStorage
      localStorage.removeItem(localStorageKey);

      // Exibe toast de sucesso
      toast.success("Formulário finalizado e dados enviados.");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao enviar o formulário. Tente novamente.");
    }
  };

  // ----------------------------------------------------------------------------
  // Barra de Progresso (com labels)
  // ----------------------------------------------------------------------------
  const totalSteps = 4;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  // ----------------------------------------------------------------------------
  // Render
  // ----------------------------------------------------------------------------
  return (
    <FormProvider {...methods}>
      <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
        <Toaster position="top-right" />

        <motion.h1
          className="text-2xl md:text-3xl font-extrabold text-[#af1b1b] mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Formulário MultiStep com Validação, AutoSave, Tooltips e Toast
        </motion.h1>

        {/* Barra de Progresso com Labels */}
        <div className="w-full max-w-2xl mb-6">
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
          className="w-full max-w-2xl bg-white p-4 md:p-8 rounded-lg shadow space-y-6"
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
          </AnimatePresence>

          {/* Botões de Navegação */}
          <div className="flex justify-between mt-4">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={goBack}
                className="mr-2"
              >
                Voltar
              </Button>
            )}
            {currentStep < totalSteps && (
              <Button
                type="button"
                variant="default"
                onClick={goNext}
                className="ml-auto"
              >
                Próximo
              </Button>
            )}
            {currentStep === totalSteps && (
              <Button type="submit" variant="destructive" className="ml-auto">
                Finalizar
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default MultiStepForm;
