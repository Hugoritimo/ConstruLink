// Exemplo: src/app/form/page.tsx

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
import SignatureCanvas from "react-signature-canvas";
import { FaExclamationCircle } from "react-icons/fa";
import Image from "next/image";

// Importando Button, Input, Label, Textarea como named exports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Removemos qualquer "type SignatureCanvasRef" e vamos só usar 'useRef(null)'

// ------------------------------------------------------
// 1) Schema Zod
// ------------------------------------------------------
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

// Estado inicial do checklist
const initialChecklist = [
  { item: "EPI Adequado", status: false },
  { item: "Área Sinalizada", status: false },
  { item: "Treinamento Atualizado", status: false },
  { item: "Equipamentos Revisados", status: false },
  { item: "Sistemas de Ventilação Funcionando", status: false },
  { item: "Extintores de Incêndio Disponíveis", status: false },
];

// Tipagem do formulário
type FormData = z.infer<typeof rootSchema>;

// ------------------------------------------------------
// 2) Etapas (sem tipagens para SignatureCanvasRef)
// ------------------------------------------------------

// Etapa 1
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
        <Input
          id="nomeCompleto"
          {...register("nomeCompleto")}
          placeholder="Seu nome"
          className={`${
            errors.nomeCompleto ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={errors.nomeCompleto ? "true" : "false"}
        />
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
        <Input
          id="email"
          {...register("email")}
          placeholder="seuemail@exemplo.com"
          className={`${errors.email ? "border-red-500" : "border-gray-300"}`}
          aria-invalid={errors.email ? "true" : "false"}
        />
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

// Etapa 2
const StepTwo: React.FC = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormData>();
  const checklist = watch("checklistSeguranca");

  const toggleItem = (index: number) => {
    const newList = [...(checklist || [])];
    newList[index].status = !newList[index].status;
    setValue("checklistSeguranca", newList, { shouldDirty: true });
  };

  return (
    <div className="space-y-4">
      {/* Checklist de Segurança */}
      <div>
        <Label className="font-semibold text-lg">Checklist de Segurança</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-50 p-4 rounded">
          {checklist &&
            checklist.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                {/* input checkbox simples */}
                <input
                  type="checkbox"
                  checked={item.status}
                  onChange={() => toggleItem(index)}
                />
                <Label className="cursor-pointer">{item.item}</Label>
              </div>
            ))}
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
        <Textarea
          id="observacoes"
          placeholder="Observações gerais..."
          {...register("observacoes")}
          className={`${
            errors.observacoes ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={errors.observacoes ? "true" : "false"}
        />
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

// Etapa 3 (Assinatura) - sem tipagem para o ref
const StepThree: React.FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<FormData>();

  // Note que não definimos tipo: useRef(null)
  const sigCanvasRef = useRef(null);

  // Capturar assinatura
  const saveSignature = () => {
    // Aqui, se quiser chamar métodos, talvez precise de:
    // (sigCanvasRef.current as any).getTrimmedCanvas()?.toDataURL()
    // para não dar erro de TS, ou ignorar TS
    if (sigCanvasRef.current) {
      const signature = (sigCanvasRef.current as any)
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setValue("assinatura", signature, { shouldValidate: true });
    }
  };

  // Limpar assinatura
  const clearSignature = () => {
    if (sigCanvasRef.current) {
      (sigCanvasRef.current as any).clear();
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
        <Textarea
          id="mensagemFinal"
          placeholder="Se quiser deixar uma mensagem final..."
          {...register("mensagemFinal")}
          className={`${
            errors.mensagemFinal ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={errors.mensagemFinal ? "true" : "false"}
        />
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
        <input type="hidden" {...register("assinatura")} value={assinatura} />
      </div>
    </div>
  );
};

// Etapa 4
const StepFour: React.FC = () => {
  const { getValues } = useFormContext<FormData>();
  const data = getValues();

  const renderSignature = () => {
    if (data.assinatura) {
      return (
        <Image
          src={data.assinatura}
          alt="Assinatura"
          width={256}
          height={100}
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
        Revise todos os dados acima. Se precisar fazer alguma alteração, clique
        em &quot;Voltar&quot;.
      </p>
    </div>
  );
};

// ------------------------------------------------------
// 3) Componente Principal (MultiStepForm)
// ------------------------------------------------------
const MultiStepForm: React.FC = () => {
  // Passo atual
  const [currentStep, setCurrentStep] = useState(1);

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
    mode: "onBlur",
  });

  const { watch, setValue, handleSubmit } = methods;

  // Auto-Save no Local Storage
  const formValues = watch();
  const localStorageKey = "multistepFormData";

  useEffect(() => {
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.keys(parsed).forEach((field: string) => {
        setValue(field as keyof FormData, parsed[field], {
          shouldValidate: false,
        });
      });
    }
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(formValues));
  }, [formValues]);

  // Avançar / Voltar steps
  const goNext = () => setCurrentStep((prev) => prev + 1);
  const goBack = () => setCurrentStep((prev) => prev - 1);

  // Submeter no final
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
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

      console.log("Dados Finais: ", data);
      localStorage.removeItem(localStorageKey);
      toast.success("Formulário finalizado e dados enviados.");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao enviar o formulário. Tente novamente.");
    }
  };

  const totalSteps = 4;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
        <Toaster position="top-right" />

        <motion.h1
          className="text-2xl md:text-3xl font-extrabold text-[#af1b1b] mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Formulário MultiStep (sem tipagens de SignatureCanvasRef)
        </motion.h1>

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
};

export default MultiStepForm;
