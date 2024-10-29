"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

// Definição de Interfaces
interface Efetivo {
  nome: string;
  funcao: string;
  quantidade: string;
  horasNormais: string;
  horasExtras: string;
  inicioJornada: string;
  fimJornada: string;
  atividadesRealizadas: string;
}

interface Equipamento {
  nome: string;
  quantidade: string;
  condicao: string;
  dataInspecao: string;
  observacoes: string;
}

interface Ferramenta {
  nome: string;
  quantidade: string;
  condicao: string;
  dataInspecao: string;
  observacoes: string;
}

interface Clima {
  tempo: string;
  temperaturaManha: string;
  temperaturaTarde: string;
  umidadeManha: string;
  umidadeTarde: string;
  vento: string;
  uv: string;
  observacoes: string;
}

interface ChecklistItem {
  item: string;
  status: boolean;
}

interface MaterialUtilizado {
  nome: string;
  quantidade: string;
  unidade: string;
  observacoes: string;
}

interface StatusServico {
  nome: string;
  percentualConcluido: string;
  motivoAtraso: string;
  observacoes: string;
}

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
  localizacaoObra: string;
  efetivo: Efetivo[];
  equipamentos: Equipamento[];
  ferramentas: Ferramenta[];
  clima: Clima;
  checklistSeguranca: ChecklistItem[];
  fotos: string[]; // Array de URLs das imagens em Base64
  incidentes: string;
  observacoesFiscalizacao: string;
  observacoesContratada: string;
  materialUtilizado: MaterialUtilizado[];
  statusServicos: StatusServico[];
  assinaturaResponsavel: string;
  assinaturaGerente: string;
  observacaoAssinatura: string; // Novo campo de observação para assinatura
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
  localizacaoObra: "",
  efetivo: [
    {
      nome: "",
      funcao: "",
      quantidade: "",
      horasNormais: "",
      horasExtras: "",
      inicioJornada: "",
      fimJornada: "",
      atividadesRealizadas: "",
    },
  ],
  equipamentos: [
    {
      nome: "",
      quantidade: "",
      condicao: "",
      dataInspecao: "",
      observacoes: "",
    },
  ],
  ferramentas: [
    {
      nome: "",
      quantidade: "",
      condicao: "",
      dataInspecao: "",
      observacoes: "",
    },
  ],
  clima: {
    tempo: "",
    temperaturaManha: "",
    temperaturaTarde: "",
    umidadeManha: "",
    umidadeTarde: "",
    vento: "",
    uv: "",
    observacoes: "",
  },
  checklistSeguranca: [
    { item: "EPI Adequado", status: false },
    { item: "Áreas Sinalizadas", status: false },
    { item: "Treinamento Atualizado", status: false },
    { item: "Brigada de Incêndio", status: false },
    { item: "Sinalização de Segurança", status: false },
    { item: "Equipamentos Revisados", status: false },
    { item: "Condições Climáticas Favoráveis", status: false },
  ],
  fotos: [],
  incidentes: "",
  observacoesFiscalizacao: "",
  observacoesContratada: "",
  materialUtilizado: [
    {
      nome: "",
      quantidade: "",
      unidade: "",
      observacoes: "",
    },
  ],
  statusServicos: [
    {
      nome: "",
      percentualConcluido: "",
      motivoAtraso: "",
      observacoes: "",
    },
  ],
  assinaturaResponsavel: "",
  assinaturaGerente: "",
  observacaoAssinatura: "", // Inicialização do novo campo
};

const RelatorioDiarioObras: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Funções de manipulação (permanece igual)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #af1b1b; text-align: center; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .signatures { margin-top: 40px; display: flex; justify-content: space-between; }
            .signature { width: 30%; text-align: center; border-top: 1px solid black; padding-top: 5px; }
            .photo { margin: 10px 0; }
            input { border: none; border-bottom: 1px solid #000; width: 100%; }
          </style>
        </head>
        <body>
          <h1>Relatório Diário de Obras Extenso</h1>
          <h2>Informações Gerais</h2>
          <table>
            <tr><th>Nº RDO</th><td>${formData.rdoNumber}</td></tr>
            <tr><th>Empresa</th><td>${formData.empresa}</td></tr>
            <tr><th>Cliente</th><td>${formData.cliente}</td></tr>
            <tr><th>Usuário</th><td>${formData.usuarioPreencheu}</td></tr>
            <tr><th>Data</th><td>${formData.dataRelatorio}</td></tr>
            <tr><th>Local da Obra</th><td>${formData.localObra}</td></tr>
            <tr><th>Gerente Responsável</th><td>${
              formData.gerenteResponsavel
            }</td></tr>
            <tr><th>Tipo de Obra</th><td>${formData.tipoObra}</td></tr>
            <tr><th>Etapa Atual</th><td>${formData.etapaAtual}</td></tr>
            <tr><th>Localização da Obra</th><td>${
              formData.localizacaoObra
            }</td></tr>
          </table>

          <h2>Descrição da Atividade</h2>
          <p>${formData.descricaoAtividade}</p>

          <!-- Efetivo -->
          <h2>Efetivo</h2>
          <table>
            <tr>
              <th>Nome</th>
              <th>Função</th>
              <th>Quantidade</th>
              <th>Horas Normais</th>
              <th>Horas Extras</th>
              <th>Início da Jornada</th>
              <th>Fim da Jornada</th>
              <th>Atividades Realizadas</th>
            </tr>
            ${formData.efetivo
              .map(
                (ef) => `
                <tr>
                  <td>${ef.nome}</td>
                  <td>${ef.funcao}</td>
                  <td>${ef.quantidade}</td>
                  <td>${ef.horasNormais}</td>
                  <td>${ef.horasExtras}</td>
                  <td>${ef.inicioJornada}</td>
                  <td>${ef.fimJornada}</td>
                  <td>${ef.atividadesRealizadas}</td>
                </tr>
              `
              )
              .join("")}
          </table>

          <!-- Equipamentos -->
          <h2>Equipamentos</h2>
          <table>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Condição</th>
              <th>Data de Inspeção</th>
              <th>Observações</th>
            </tr>
            ${formData.equipamentos
              .map(
                (eq) => `
                <tr>
                  <td>${eq.nome}</td>
                  <td>${eq.quantidade}</td>
                  <td>${eq.condicao}</td>
                  <td>${eq.dataInspecao}</td>
                  <td>${eq.observacoes}</td>
                </tr>
              `
              )
              .join("")}
          </table>

          <!-- Ferramentas -->
          <h2>Ferramentas</h2>
          <table>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Condição</th>
              <th>Data de Inspeção</th>
              <th>Observações</th>
            </tr>
            ${formData.ferramentas
              .map(
                (tool) => `
                <tr>
                  <td>${tool.nome}</td>
                  <td>${tool.quantidade}</td>
                  <td>${tool.condicao}</td>
                  <td>${tool.dataInspecao}</td>
                  <td>${tool.observacoes}</td>
                </tr>
              `
              )
              .join("")}
          </table>

          <!-- Clima -->
          <h2>Clima</h2>
          <table>
            <tr><th>Tempo</th><td>${formData.clima.tempo}</td></tr>
            <tr><th>Temperatura Manhã</th><td>${
              formData.clima.temperaturaManha
            }°C</td></tr>
            <tr><th>Temperatura Tarde</th><td>${
              formData.clima.temperaturaTarde
            }°C</td></tr>
            <tr><th>Umidade Manhã</th><td>${
              formData.clima.umidadeManha
            }%</td></tr>
            <tr><th>Umidade Tarde</th><td>${
              formData.clima.umidadeTarde
            }%</td></tr>
            <tr><th>Vento</th><td>${formData.clima.vento}</td></tr>
            <tr><th>Índice UV</th><td>${formData.clima.uv}</td></tr>
            <tr><th>Observações</th><td>${formData.clima.observacoes}</td></tr>
          </table>

          <!-- Checklist de Segurança -->
          <h2>Checklist de Segurança</h2>
          <table>
            <tr><th>Item</th><th>Status</th></tr>
            ${formData.checklistSeguranca
              .map(
                (item) => `
                <tr>
                  <td>${item.item}</td>
                  <td>${item.status ? "✔️" : "❌"}</td>
                </tr>
              `
              )
              .join("")}
          </table>

          <!-- Incidentes -->
          <h2>Incidentes</h2>
          <p>${formData.incidentes}</p>

          <!-- Observações da Fiscalização -->
          <h2>Observações da Fiscalização</h2>
          <p>${formData.observacoesFiscalizacao}</p>

          <!-- Observações da Contratada -->
          <h2>Observações da Contratada</h2>
          <p>${formData.observacoesContratada}</p>

          <!-- Material Utilizado -->
          <h2>Material Utilizado</h2>
          <table>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Unidade</th>
              <th>Observações</th>
            </tr>
            ${formData.materialUtilizado
              .map(
                (material) => `
                <tr>
                  <td>${material.nome}</td>
                  <td>${material.quantidade}</td>
                  <td>${material.unidade}</td>
                  <td>${material.observacoes}</td>
                </tr>
              `
              )
              .join("")}
          </table>

          <!-- Status dos Serviços -->
          <h2>Status dos Serviços</h2>
          <table>
            <tr>
              <th>Serviço</th>
              <th>Percentual Concluído</th>
              <th>Motivo de Atraso</th>
              <th>Observações</th>
            </tr>
            ${formData.statusServicos
              .map(
                (servico) => `
                <tr>
                  <td>${servico.nome}</td>
                  <td>${servico.percentualConcluido}%</td>
                  <td>${servico.motivoAtraso}</td>
                  <td>${servico.observacoes}</td>
                </tr>
              `
              )
              .join("")}
          </table>

          <!-- Fotos -->
          <h2>Fotos</h2>
          ${formData.fotos
            .map(
              (foto) => `
              <div class="photo">
                <img src="${foto}" alt="Foto" style="max-width: 100%; height: auto;" />
              </div>
            `
            )
            .join("")}

          <!-- Assinaturas -->
          <div class="signatures">
            <div class="signature">
              Assinatura do Responsável: ${formData.assinaturaResponsavel}
              <p>Observação: ${formData.observacaoAssinatura}</p>
            </div>
            <div class="signature">Assinatura do Gerente: ${
              formData.assinaturaGerente
            }</div>
          </div>

          <!-- Campos Editáveis -->
          <h2>Observações Adicionais</h2>
          <p><input type="text" placeholder="Digite aqui..."></p>
        </body>
      </html>
    `;

    try {
      // Enviando a requisição para a rota de API do Next.js
      const response = await axios.post(
        "/api/generate-pdf",
        { htmlContent },
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "construlink.pdf";
      link.click();

      // Chamada para salvar os dados em um Excel no SharePoint
      await axios.post("/api/save-to-sharepoint", { formData });

      setIsSuccess(true);
    } catch (error) {
      console.error("Erro ao gerar o PDF ou salvar no SharePoint:", error);

      let message = "Erro ao processar a solicitação.";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          message += ` Status: ${error.response.status}. Data: ${JSON.stringify(
            error.response.data
          )}`;
          console.error("Data da resposta:", error.response.data);
          console.error("Status da resposta:", error.response.status);
          console.error("Cabeçalhos da resposta:", error.response.headers);
        } else if (error.request) {
          message += " Nenhuma resposta recebida do servidor.";
          console.error("Nenhuma resposta recebida:", error.request);
        } else {
          message += ` Erro na configuração da requisição: ${error.message}`;
          console.error("Erro na configuração da requisição:", error.message);
        }
      } else {
        message += ` Erro inesperado: ${error.message}`;
        console.error("Erro inesperado:", error.message);
      }

      setErrorMessage(message);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <motion.h1
        className="text-4xl font-extrabold text-[#af1b1b] mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ConstruLink - Relatório
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg space-y-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ maxHeight: "80vh" }}
      >
        {/* Campo de Observação para Assinatura */}
        <h2 className="text-xl font-bold mt-6 mb-2">
          Observação da Assinatura
        </h2>
        <Textarea
          id="observacaoAssinatura"
          name="observacaoAssinatura"
          value={formData.observacaoAssinatura}
          onChange={handleChange}
          className="mt-1 w-full"
        />

        {/* Botão de Envio */}
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="bg-[#af1b1b] text-white px-6 py-3 rounded-md hover:bg-[#951818] transition-colors duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processando..." : "Gerar PDF e Salvar"}
          </Button>
        </div>

        {isSuccess && (
          <motion.p
            className="text-green-500 mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            PDF gerado e dados salvos com sucesso!
          </motion.p>
        )}
        {isError && errorMessage && (
          <motion.p
            className="text-red-500 mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errorMessage}
          </motion.p>
        )}
      </motion.form>
    </div>
  );
};

export default RelatorioDiarioObras;
