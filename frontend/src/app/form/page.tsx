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

interface Produtividade {
  atividadesPrevistas: string;
  atividadesExecutadas: string;
  percentualConcluido: string;
  motivoAtraso: string;
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
  produtividade: Produtividade;
  incidentes: string;
  observacoesFiscalizacao: string;
  observacoesContratada: string;
  materialUtilizado: MaterialUtilizado[];
  statusServicos: StatusServico[];
  assinaturaResponsavel: string;
  assinaturaGerente: string;
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
  produtividade: {
    atividadesPrevistas: "",
    atividadesExecutadas: "",
    percentualConcluido: "",
    motivoAtraso: "",
  },
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
};

const RelatorioDiarioObras: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("clima.")) {
      const key = name.split(".")[1] as keyof Clima;
      setFormData({
        ...formData,
        clima: { ...formData.clima, [key]: value },
      });
    } else if (name.startsWith("produtividade.")) {
      const key = name.split(".")[1] as keyof Produtividade;
      setFormData({
        ...formData,
        produtividade: { ...formData.produtividade, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: string,
    section: keyof Pick<
      FormData,
      | "efetivo"
      | "equipamentos"
      | "ferramentas"
      | "materialUtilizado"
      | "statusServicos"
    >
  ) => {
    const newArray = [...formData[section]];
    newArray[index] = {
      ...newArray[index],
      [field]: e.target.value,
    };
    setFormData({ ...formData, [section]: newArray });
  };

  const handleCheckboxChange = (
    index: number,
    section: "checklistSeguranca",
    value: boolean | "indeterminate"
  ) => {
    const isChecked = value === true;
    const newArray = [...formData[section]];
    newArray[index] = {
      ...newArray[index],
      status: isChecked,
    };
    setFormData({ ...formData, [section]: newArray });
  };

  const addArrayItem = (
    section: keyof Pick<
      FormData,
      | "efetivo"
      | "equipamentos"
      | "ferramentas"
      | "materialUtilizado"
      | "statusServicos"
    >
  ) => {
    const newItem = { ...initialFormData[section][0] };
    setFormData({ ...formData, [section]: [...formData[section], newItem] });
  };

  const removeArrayItem = (
    section: keyof Pick<
      FormData,
      | "efetivo"
      | "equipamentos"
      | "ferramentas"
      | "materialUtilizado"
      | "statusServicos"
    >,
    index: number
  ) => {
    const newArray = [...formData[section]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [section]: newArray });
  };

  // Função para lidar com a seleção de arquivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prevState) => ({
            ...prevState,
            fotos: [...prevState.fotos, reader.result as string],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Função para remover uma foto
  const removePhoto = (index: number) => {
    setFormData((prevState) => {
      const newFotos = [...prevState.fotos];
      newFotos.splice(index, 1);
      return { ...prevState, fotos: newFotos };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setIsError(false);

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
          </style>
        </head>
        <body>
          <h1>Relatório Diário de Obras Extenso</h1>
          <h2>Informações Gerais</h2>
          <table>
            <tr>
              <th>Nº RDO</th><td>${formData.rdoNumber}</td>
              <th>Empresa</th><td>${formData.empresa}</td>
              <th>Cliente</th><td>${formData.cliente}</td>
              <th>Usuário</th><td>${formData.usuarioPreencheu}</td>
              <th>Data</th><td>${formData.dataRelatorio}</td>
            </tr>
            <tr>
              <th>Local da Obra</th><td>${formData.localObra}</td>
              <th>Gerente Responsável</th><td>${
                formData.gerenteResponsavel
              }</td>
              <th>Tipo de Obra</th><td>${formData.tipoObra}</td>
              <th>Etapa Atual</th><td>${formData.etapaAtual}</td>
            </tr>
            <tr>
              <th>Localização da Obra</th><td colspan="5">${
                formData.localizacaoObra
              }</td>
            </tr>
          </table>

          <h2>Descrição da Atividade</h2>
          <p>${formData.descricaoAtividade}</p>

          <!-- Efetivo -->
          <h2>Efetivo</h2>
          <table>
            <tr>
              <th>Nome</th><th>Função</th><th>Quantidade</th><th>Horas Normais</th><th>Horas Extras</th><th>Início da Jornada</th><th>Fim da Jornada</th><th>Atividades Realizadas</th>
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
            <tr><th>Nome</th><th>Quantidade</th><th>Condição</th><th>Data de Inspeção</th><th>Observações</th></tr>
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
            <tr><th>Nome</th><th>Quantidade</th><th>Condição</th><th>Data de Inspeção</th><th>Observações</th></tr>
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
            <tr>
              <th>Tempo</th><td>${formData.clima.tempo}</td>
              <th>Temperatura Manhã</th><td>${
                formData.clima.temperaturaManha
              }°C</td>
              <th>Temperatura Tarde</th><td>${
                formData.clima.temperaturaTarde
              }°C</td>
              <th>Vento</th><td>${formData.clima.vento}</td>
              <th>Índice UV</th><td>${formData.clima.uv}</td>
            </tr>
            <tr>
              <th>Umidade Manhã</th><td>${formData.clima.umidadeManha}%</td>
              <th>Umidade Tarde</th><td>${formData.clima.umidadeTarde}%</td>
              <th colspan="4">Observações: ${formData.clima.observacoes}</th>
            </tr>
          </table>

          <!-- Checklist de Segurança -->
          <h2>Checklist de Segurança</h2>
          <table>
            <tr><th>Item</th><th>Status</th></tr>
            ${formData.checklistSeguranca
              .map(
                (item) => `
                <tr><td>${item.item}</td><td>${
                  item.status ? "✔️" : "❌"
                }</td></tr>
              `
              )
              .join("")}
          </table>

          <!-- Produtividade -->
          <h2>Produtividade</h2>
          <table>
            <tr><th>Atividades Previstas</th><td>${
              formData.produtividade.atividadesPrevistas
            }</td></tr>
            <tr><th>Atividades Executadas</th><td>${
              formData.produtividade.atividadesExecutadas
            }</td></tr>
            <tr><th>Percentual Concluído</th><td>${
              formData.produtividade.percentualConcluido
            }%</td></tr>
            <tr><th>Motivo de Atraso</th><td>${
              formData.produtividade.motivoAtraso
            }</td></tr>
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
            <tr><th>Nome</th><th>Quantidade</th><th>Unidade</th><th>Observações</th></tr>
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
            <tr><th>Serviço</th><th>Percentual Concluído</th><th>Motivo de Atraso</th><th>Observações</th></tr>
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
            <div class="signature">Assinatura do Responsável: ${
              formData.assinaturaResponsavel
            }</div>
            <div class="signature">Assinatura do Gerente: ${
              formData.assinaturaGerente
            }</div>
          </div>
        </body>
      </html>
    `;

    try {
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
      link.download = "relatorio_rdo_extenso.pdf";
      link.click();
      setIsSuccess(true);
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
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
        ConstruLink - Relatorio
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg space-y-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ maxHeight: "80vh" }}
      >
        {/* Informações Gerais */}
        <h2 className="text-xl font-bold mt-6 mb-2">Informações Gerais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Número do RDO */}
          <div>
            <Label htmlFor="rdoNumber">Nº RDO</Label>
            <Input
              type="text"
              id="rdoNumber"
              name="rdoNumber"
              value={formData.rdoNumber}
              onChange={handleChange}
              className="mt-1 w-full"
              placeholder="Ex: 001"
              required
            />
          </div>
          {/* Empresa */}
          <div>
            <Label htmlFor="empresa">Empresa</Label>
            <Input
              type="text"
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              className="mt-1 w-full"
              placeholder="Nome da empresa"
              required
            />
          </div>
          {/* Cliente */}
          <div>
            <Label htmlFor="cliente">Cliente</Label>
            <Input
              type="text"
              id="cliente"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              className="mt-1 w-full"
              placeholder="Nome do cliente"
              required
            />
          </div>
          {/* Usuário */}
          <div>
            <Label htmlFor="usuarioPreencheu">Usuário</Label>
            <Input
              type="text"
              id="usuarioPreencheu"
              name="usuarioPreencheu"
              value={formData.usuarioPreencheu}
              onChange={handleChange}
              className="mt-1 w-full"
              placeholder="Nome do usuário"
              required
            />
          </div>
          {/* Data */}
          <div>
            <Label htmlFor="dataRelatorio">Data</Label>
            <Input
              type="date"
              id="dataRelatorio"
              name="dataRelatorio"
              value={formData.dataRelatorio}
              onChange={handleChange}
              className="mt-1 w-full"
              required
            />
          </div>
          {/* Local da Obra */}
          <div>
            <Label htmlFor="localObra">Local da Obra</Label>
            <Input
              type="text"
              id="localObra"
              name="localObra"
              value={formData.localObra}
              onChange={handleChange}
              className="mt-1 w-full"
              placeholder="Ex: Rua X, 123"
              required
            />
          </div>
          {/* Gerente Responsável */}
          <div>
            <Label htmlFor="gerenteResponsavel">Gerente Responsável</Label>
            <Input
              type="text"
              id="gerenteResponsavel"
              name="gerenteResponsavel"
              value={formData.gerenteResponsavel}
              onChange={handleChange}
              className="mt-1 w-full"
              placeholder="Nome do gerente"
              required
            />
          </div>
          {/* Tipo de Obra */}
          <div>
            <Label htmlFor="tipoObra">Tipo de Obra</Label>
            <Input
              type="text"
              id="tipoObra"
              name="tipoObra"
              value={formData.tipoObra}
              onChange={handleChange}
              className="mt-1 w-full"
              placeholder="Ex: Construção civil"
              required
            />
          </div>
          {/* Etapa Atual */}
          <div>
            <Label htmlFor="etapaAtual">Etapa Atual</Label>
            <Input
              type="text"
              id="etapaAtual"
              name="etapaAtual"
              value={formData.etapaAtual}
              onChange={handleChange}
              className="mt-1 w-full"
              placeholder="Ex: Fundação"
              required
            />
          </div>
          {/* Localização da Obra */}
          <div>
            <Label htmlFor="localizacaoObra">Localização da Obra</Label>
            <Input
              type="text"
              id="localizacaoObra"
              name="localizacaoObra"
              value={formData.localizacaoObra}
              onChange={handleChange}
              className="mt-1 w-full"
              placeholder="Coordenadas ou endereço detalhado"
            />
          </div>
        </div>

        {/* Descrição da Atividade */}
        <div>
          <Label htmlFor="descricaoAtividade" className="mt-4">
            Descrição da Atividade
          </Label>
          <Textarea
            id="descricaoAtividade"
            name="descricaoAtividade"
            value={formData.descricaoAtividade}
            onChange={handleChange}
            className="mt-1 w-full"
          />
        </div>

        {/* Efetivo */}
        <h2 className="text-xl font-bold mt-6 mb-2">Efetivo</h2>
        <AnimatePresence>
          {formData.efetivo.map((efetivo, index) => (
            <motion.div
              key={index}
              className="mt-4 border-b pb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome */}
                <div>
                  <Label htmlFor={`nome-efetivo-${index}`}>Nome</Label>
                  <Input
                    type="text"
                    id={`nome-efetivo-${index}`}
                    name="nome"
                    value={efetivo.nome}
                    onChange={(e) =>
                      handleArrayChange(e, index, "nome", "efetivo")
                    }
                    className="mt-1 w-full"
                    required
                  />
                </div>
                {/* Função */}
                <div>
                  <Label htmlFor={`funcao-efetivo-${index}`}>Função</Label>
                  <Input
                    type="text"
                    id={`funcao-efetivo-${index}`}
                    name="funcao"
                    value={efetivo.funcao}
                    onChange={(e) =>
                      handleArrayChange(e, index, "funcao", "efetivo")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Quantidade */}
                <div>
                  <Label htmlFor={`quantidade-efetivo-${index}`}>
                    Quantidade
                  </Label>
                  <Input
                    type="number"
                    id={`quantidade-efetivo-${index}`}
                    name="quantidade"
                    value={efetivo.quantidade}
                    onChange={(e) =>
                      handleArrayChange(e, index, "quantidade", "efetivo")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Horas Normais */}
                <div>
                  <Label htmlFor={`horasNormais-efetivo-${index}`}>
                    Horas Normais
                  </Label>
                  <Input
                    type="number"
                    id={`horasNormais-efetivo-${index}`}
                    name="horasNormais"
                    value={efetivo.horasNormais}
                    onChange={(e) =>
                      handleArrayChange(e, index, "horasNormais", "efetivo")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Horas Extras */}
                <div>
                  <Label htmlFor={`horasExtras-efetivo-${index}`}>
                    Horas Extras
                  </Label>
                  <Input
                    type="number"
                    id={`horasExtras-efetivo-${index}`}
                    name="horasExtras"
                    value={efetivo.horasExtras}
                    onChange={(e) =>
                      handleArrayChange(e, index, "horasExtras", "efetivo")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Início da Jornada */}
                <div>
                  <Label htmlFor={`inicioJornada-efetivo-${index}`}>
                    Início da Jornada
                  </Label>
                  <Input
                    type="time"
                    id={`inicioJornada-efetivo-${index}`}
                    name="inicioJornada"
                    value={efetivo.inicioJornada}
                    onChange={(e) =>
                      handleArrayChange(e, index, "inicioJornada", "efetivo")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Fim da Jornada */}
                <div>
                  <Label htmlFor={`fimJornada-efetivo-${index}`}>
                    Fim da Jornada
                  </Label>
                  <Input
                    type="time"
                    id={`fimJornada-efetivo-${index}`}
                    name="fimJornada"
                    value={efetivo.fimJornada}
                    onChange={(e) =>
                      handleArrayChange(e, index, "fimJornada", "efetivo")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Atividades Realizadas */}
                <div className="sm:col-span-2">
                  <Label htmlFor={`atividadesRealizadas-efetivo-${index}`}>
                    Atividades Realizadas
                  </Label>
                  <Textarea
                    id={`atividadesRealizadas-efetivo-${index}`}
                    name="atividadesRealizadas"
                    value={efetivo.atividadesRealizadas}
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        index,
                        "atividadesRealizadas",
                        "efetivo"
                      )
                    }
                    className="mt-1 w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  onClick={() => removeArrayItem("efetivo", index)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Remover
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="flex justify-end mt-2">
          <Button
            type="button"
            onClick={() => addArrayItem("efetivo")}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Adicionar Efetivo
          </Button>
        </div>

        {/* Equipamentos */}
        <h2 className="text-xl font-bold mt-6 mb-2">Equipamentos</h2>
        <AnimatePresence>
          {formData.equipamentos.map((equipamento, index) => (
            <motion.div
              key={index}
              className="mt-4 border-b pb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome */}
                <div>
                  <Label htmlFor={`nome-equipamento-${index}`}>Nome</Label>
                  <Input
                    type="text"
                    id={`nome-equipamento-${index}`}
                    name="nome"
                    value={equipamento.nome}
                    onChange={(e) =>
                      handleArrayChange(e, index, "nome", "equipamentos")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Quantidade */}
                <div>
                  <Label htmlFor={`quantidade-equipamento-${index}`}>
                    Quantidade
                  </Label>
                  <Input
                    type="number"
                    id={`quantidade-equipamento-${index}`}
                    name="quantidade"
                    value={equipamento.quantidade}
                    onChange={(e) =>
                      handleArrayChange(e, index, "quantidade", "equipamentos")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Condição */}
                <div>
                  <Label htmlFor={`condicao-equipamento-${index}`}>
                    Condição
                  </Label>
                  <Input
                    type="text"
                    id={`condicao-equipamento-${index}`}
                    name="condicao"
                    value={equipamento.condicao}
                    onChange={(e) =>
                      handleArrayChange(e, index, "condicao", "equipamentos")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Data de Inspeção */}
                <div>
                  <Label htmlFor={`dataInspecao-equipamento-${index}`}>
                    Data de Inspeção
                  </Label>
                  <Input
                    type="date"
                    id={`dataInspecao-equipamento-${index}`}
                    name="dataInspecao"
                    value={equipamento.dataInspecao}
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        index,
                        "dataInspecao",
                        "equipamentos"
                      )
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Observações */}
                <div className="sm:col-span-2">
                  <Label htmlFor={`observacoes-equipamento-${index}`}>
                    Observações
                  </Label>
                  <Textarea
                    id={`observacoes-equipamento-${index}`}
                    name="observacoes"
                    value={equipamento.observacoes}
                    onChange={(e) =>
                      handleArrayChange(e, index, "observacoes", "equipamentos")
                    }
                    className="mt-1 w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  onClick={() => removeArrayItem("equipamentos", index)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Remover
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="flex justify-end mt-2">
          <Button
            type="button"
            onClick={() => addArrayItem("equipamentos")}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Adicionar Equipamento
          </Button>
        </div>

        {/* Ferramentas */}
        <h2 className="text-xl font-bold mt-6 mb-2">Ferramentas</h2>
        <AnimatePresence>
          {formData.ferramentas.map((ferramenta, index) => (
            <motion.div
              key={index}
              className="mt-4 border-b pb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome */}
                <div>
                  <Label htmlFor={`nome-ferramenta-${index}`}>Nome</Label>
                  <Input
                    type="text"
                    id={`nome-ferramenta-${index}`}
                    name="nome"
                    value={ferramenta.nome}
                    onChange={(e) =>
                      handleArrayChange(e, index, "nome", "ferramentas")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Quantidade */}
                <div>
                  <Label htmlFor={`quantidade-ferramenta-${index}`}>
                    Quantidade
                  </Label>
                  <Input
                    type="number"
                    id={`quantidade-ferramenta-${index}`}
                    name="quantidade"
                    value={ferramenta.quantidade}
                    onChange={(e) =>
                      handleArrayChange(e, index, "quantidade", "ferramentas")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Condição */}
                <div>
                  <Label htmlFor={`condicao-ferramenta-${index}`}>
                    Condição
                  </Label>
                  <Input
                    type="text"
                    id={`condicao-ferramenta-${index}`}
                    name="condicao"
                    value={ferramenta.condicao}
                    onChange={(e) =>
                      handleArrayChange(e, index, "condicao", "ferramentas")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Data de Inspeção */}
                <div>
                  <Label htmlFor={`dataInspecao-ferramenta-${index}`}>
                    Data de Inspeção
                  </Label>
                  <Input
                    type="date"
                    id={`dataInspecao-ferramenta-${index}`}
                    name="dataInspecao"
                    value={ferramenta.dataInspecao}
                    onChange={(e) =>
                      handleArrayChange(e, index, "dataInspecao", "ferramentas")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Observações */}
                <div className="sm:col-span-2">
                  <Label htmlFor={`observacoes-ferramenta-${index}`}>
                    Observações
                  </Label>
                  <Textarea
                    id={`observacoes-ferramenta-${index}`}
                    name="observacoes"
                    value={ferramenta.observacoes}
                    onChange={(e) =>
                      handleArrayChange(e, index, "observacoes", "ferramentas")
                    }
                    className="mt-1 w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  onClick={() => removeArrayItem("ferramentas", index)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Remover
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="flex justify-end mt-2">
          <Button
            type="button"
            onClick={() => addArrayItem("ferramentas")}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Adicionar Ferramenta
          </Button>
        </div>

        {/* Clima */}
        <h2 className="text-xl font-bold mt-6 mb-2">Clima</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tempo */}
          <div>
            <Label htmlFor="clima.tempo">Tempo</Label>
            <Input
              type="text"
              id="clima.tempo"
              name="clima.tempo"
              value={formData.clima.tempo}
              onChange={handleChange}
              className="mt-1 w-full"
            />
          </div>
          {/* Temperatura Manhã */}
          <div>
            <Label htmlFor="clima.temperaturaManha">
              Temperatura Manhã (°C)
            </Label>
            <Input
              type="number"
              id="clima.temperaturaManha"
              name="clima.temperaturaManha"
              value={formData.clima.temperaturaManha}
              onChange={handleChange}
              className="mt-1 w-full"
            />
          </div>
          {/* Temperatura Tarde */}
          <div>
            <Label htmlFor="clima.temperaturaTarde">
              Temperatura Tarde (°C)
            </Label>
            <Input
              type="number"
              id="clima.temperaturaTarde"
              name="clima.temperaturaTarde"
              value={formData.clima.temperaturaTarde}
              onChange={handleChange}
              className="mt-1 w-full"
            />
          </div>
          {/* Umidade Manhã */}
          <div>
            <Label htmlFor="clima.umidadeManha">Umidade Manhã (%)</Label>
            <Input
              type="number"
              id="clima.umidadeManha"
              name="clima.umidadeManha"
              value={formData.clima.umidadeManha}
              onChange={handleChange}
              className="mt-1 w-full"
            />
          </div>
          {/* Umidade Tarde */}
          <div>
            <Label htmlFor="clima.umidadeTarde">Umidade Tarde (%)</Label>
            <Input
              type="number"
              id="clima.umidadeTarde"
              name="clima.umidadeTarde"
              value={formData.clima.umidadeTarde}
              onChange={handleChange}
              className="mt-1 w-full"
            />
          </div>
          {/* Vento */}
          <div>
            <Label htmlFor="clima.vento">Vento</Label>
            <Input
              type="text"
              id="clima.vento"
              name="clima.vento"
              value={formData.clima.vento}
              onChange={handleChange}
              className="mt-1 w-full"
            />
          </div>
          {/* Índice UV */}
          <div>
            <Label htmlFor="clima.uv">Índice UV</Label>
            <Input
              type="number"
              id="clima.uv"
              name="clima.uv"
              value={formData.clima.uv}
              onChange={handleChange}
              className="mt-1 w-full"
            />
          </div>
          {/* Observações */}
          <div className="sm:col-span-2">
            <Label htmlFor="clima.observacoes">Observações</Label>
            <Textarea
              id="clima.observacoes"
              name="clima.observacoes"
              value={formData.clima.observacoes}
              onChange={handleChange}
              className="mt-1 w-full"
            />
          </div>
        </div>

        {/* Checklist de Segurança */}
        <h2 className="text-xl font-bold mt-6 mb-2">Checklist de Segurança</h2>
        {formData.checklistSeguranca.map((item, index) => (
          <div key={index} className="flex items-center mt-2">
            <Checkbox
              id={`item-checklist-${index}`}
              checked={item.status}
              onCheckedChange={(value) =>
                handleCheckboxChange(index, "checklistSeguranca", value)
              }
            />
            <Label htmlFor={`item-checklist-${index}`} className="ml-2">
              {item.item}
            </Label>
          </div>
        ))}

        {/* Produtividade */}
        <h2 className="text-xl font-bold mt-6 mb-2">Produtividade</h2>
        {/* Atividades Previstas */}
        <div>
          <Label htmlFor="produtividade.atividadesPrevistas">
            Atividades Previstas
          </Label>
          <Textarea
            id="produtividade.atividadesPrevistas"
            name="produtividade.atividadesPrevistas"
            value={formData.produtividade.atividadesPrevistas}
            onChange={handleChange}
            className="mt-1 w-full"
          />
        </div>
        {/* Atividades Executadas */}
        <div>
          <Label htmlFor="produtividade.atividadesExecutadas" className="mt-2">
            Atividades Executadas
          </Label>
          <Textarea
            id="produtividade.atividadesExecutadas"
            name="produtividade.atividadesExecutadas"
            value={formData.produtividade.atividadesExecutadas}
            onChange={handleChange}
            className="mt-1 w-full"
          />
        </div>
        {/* Percentual Concluído */}
        <div>
          <Label htmlFor="produtividade.percentualConcluido" className="mt-2">
            Percentual Concluído (%)
          </Label>
          <Input
            type="number"
            id="produtividade.percentualConcluido"
            name="produtividade.percentualConcluido"
            value={formData.produtividade.percentualConcluido}
            onChange={handleChange}
            className="mt-1 w-full"
          />
        </div>
        {/* Motivo de Atraso */}
        <div>
          <Label htmlFor="produtividade.motivoAtraso" className="mt-2">
            Motivo de Atraso
          </Label>
          <Textarea
            id="produtividade.motivoAtraso"
            name="produtividade.motivoAtraso"
            value={formData.produtividade.motivoAtraso}
            onChange={handleChange}
            className="mt-1 w-full"
          />
        </div>

        {/* Incidentes */}
        <h2 className="text-xl font-bold mt-6 mb-2">Incidentes</h2>
        <Textarea
          id="incidentes"
          name="incidentes"
          value={formData.incidentes}
          onChange={handleChange}
          className="mt-1 w-full"
        />

        {/* Observações da Fiscalização */}
        <h2 className="text-xl font-bold mt-6 mb-2">
          Observações da Fiscalização
        </h2>
        <Textarea
          id="observacoesFiscalizacao"
          name="observacoesFiscalizacao"
          value={formData.observacoesFiscalizacao}
          onChange={handleChange}
          className="mt-1 w-full"
        />

        {/* Observações da Contratada */}
        <h2 className="text-xl font-bold mt-6 mb-2">
          Observações da Contratada
        </h2>
        <Textarea
          id="observacoesContratada"
          name="observacoesContratada"
          value={formData.observacoesContratada}
          onChange={handleChange}
          className="mt-1 w-full"
        />

        {/* Material Utilizado */}
        <h2 className="text-xl font-bold mt-6 mb-2">Material Utilizado</h2>
        <AnimatePresence>
          {formData.materialUtilizado.map((material, index) => (
            <motion.div
              key={index}
              className="mt-4 border-b pb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome */}
                <div>
                  <Label htmlFor={`nome-material-${index}`}>Nome</Label>
                  <Input
                    type="text"
                    id={`nome-material-${index}`}
                    name="nome"
                    value={material.nome}
                    onChange={(e) =>
                      handleArrayChange(e, index, "nome", "materialUtilizado")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Quantidade */}
                <div>
                  <Label htmlFor={`quantidade-material-${index}`}>
                    Quantidade
                  </Label>
                  <Input
                    type="number"
                    id={`quantidade-material-${index}`}
                    name="quantidade"
                    value={material.quantidade}
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        index,
                        "quantidade",
                        "materialUtilizado"
                      )
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Unidade */}
                <div>
                  <Label htmlFor={`unidade-material-${index}`}>Unidade</Label>
                  <Input
                    type="text"
                    id={`unidade-material-${index}`}
                    name="unidade"
                    value={material.unidade}
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        index,
                        "unidade",
                        "materialUtilizado"
                      )
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Observações */}
                <div className="sm:col-span-2">
                  <Label htmlFor={`observacoes-material-${index}`}>
                    Observações
                  </Label>
                  <Textarea
                    id={`observacoes-material-${index}`}
                    name="observacoes"
                    value={material.observacoes}
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        index,
                        "observacoes",
                        "materialUtilizado"
                      )
                    }
                    className="mt-1 w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  onClick={() => removeArrayItem("materialUtilizado", index)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Remover
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="flex justify-end mt-2">
          <Button
            type="button"
            onClick={() => addArrayItem("materialUtilizado")}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Adicionar Material
          </Button>
        </div>

        {/* Status dos Serviços */}
        <h2 className="text-xl font-bold mt-6 mb-2">Status dos Serviços</h2>
        <AnimatePresence>
          {formData.statusServicos.map((servico, index) => (
            <motion.div
              key={index}
              className="mt-4 border-b pb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Serviço */}
                <div>
                  <Label htmlFor={`nome-servico-${index}`}>Serviço</Label>
                  <Input
                    type="text"
                    id={`nome-servico-${index}`}
                    name="nome"
                    value={servico.nome}
                    onChange={(e) =>
                      handleArrayChange(e, index, "nome", "statusServicos")
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Percentual Concluído */}
                <div>
                  <Label htmlFor={`percentualConcluido-servico-${index}`}>
                    Percentual Concluído (%)
                  </Label>
                  <Input
                    type="number"
                    id={`percentualConcluido-servico-${index}`}
                    name="percentualConcluido"
                    value={servico.percentualConcluido}
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        index,
                        "percentualConcluido",
                        "statusServicos"
                      )
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Motivo de Atraso */}
                <div className="sm:col-span-2">
                  <Label htmlFor={`motivoAtraso-servico-${index}`}>
                    Motivo de Atraso
                  </Label>
                  <Textarea
                    id={`motivoAtraso-servico-${index}`}
                    name="motivoAtraso"
                    value={servico.motivoAtraso}
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        index,
                        "motivoAtraso",
                        "statusServicos"
                      )
                    }
                    className="mt-1 w-full"
                  />
                </div>
                {/* Observações */}
                <div className="sm:col-span-2">
                  <Label htmlFor={`observacoes-servico-${index}`}>
                    Observações
                  </Label>
                  <Textarea
                    id={`observacoes-servico-${index}`}
                    name="observacoes"
                    value={servico.observacoes}
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        index,
                        "observacoes",
                        "statusServicos"
                      )
                    }
                    className="mt-1 w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  onClick={() => removeArrayItem("statusServicos", index)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Remover
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="flex justify-end mt-2">
          <Button
            type="button"
            onClick={() => addArrayItem("statusServicos")}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Adicionar Serviço
          </Button>
        </div>

        {/* Fotos */}
        <h2 className="text-xl font-bold mt-6 mb-2">Fotos</h2>
        <div>
          <Label htmlFor="fotos">Adicionar Fotos</Label>
          <Input
            type="file"
            id="fotos"
            name="fotos"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="mt-1 w-full"
          />
        </div>
        {/* Pré-visualização das Fotos */}
        <div className="flex flex-wrap mt-4">
          {formData.fotos.map((foto, index) => (
            <div key={index} className="w-1/4 p-2 relative">
              <img
                src={foto}
                alt={`Foto ${index + 1}`}
                className="w-full h-auto"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Assinaturas */}
        <h2 className="text-xl font-bold mt-6 mb-2">Assinaturas</h2>
        {/* Assinatura do Responsável */}
        <div>
          <Label htmlFor="assinaturaResponsavel">
            Assinatura do Responsável
          </Label>
          <Input
            type="text"
            id="assinaturaResponsavel"
            name="assinaturaResponsavel"
            value={formData.assinaturaResponsavel}
            onChange={handleChange}
            className="mt-1 w-full"
            placeholder="Nome do responsável"
          />
        </div>
        {/* Assinatura do Gerente */}
        <div>
          <Label htmlFor="assinaturaGerente">Assinatura do Gerente</Label>
          <Input
            type="text"
            id="assinaturaGerente"
            name="assinaturaGerente"
            value={formData.assinaturaGerente}
            onChange={handleChange}
            className="mt-1 w-full"
            placeholder="Nome do gerente"
          />
        </div>

        {/* Botão de Envio */}
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="bg-[#af1b1b] text-white px-6 py-3 rounded-md hover:bg-[#951818] transition-colors duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Gerando PDF..." : "Gerar PDF"}
          </Button>
        </div>

        {isSuccess && (
          <motion.p
            className="text-green-500 mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            PDF gerado com sucesso!
          </motion.p>
        )}
        {isError && (
          <motion.p
            className="text-red-500 mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Erro ao gerar o PDF.
          </motion.p>
        )}
      </motion.form>
    </div>
  );
};

export default RelatorioDiarioObras;
