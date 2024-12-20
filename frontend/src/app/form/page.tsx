"use client";
import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

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

interface Subcontrato {
  nome: string;
  servico: string;
  horasTrabalhadas: string;
  observacoes: string;
}

interface AprovacaoPermissao {
  tipo: string;
  status: string;
  dataObtencao: string;
  observacoes: string;
}

interface CustoOrcamento {
  item: string;
  custoPlanejado: string;
  custoReal: string;
  variacao: string;
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
  fotos: string[];
  incidentes: string;
  observacoesFiscalizacao: string;
  observacoesContratada: string;
  materialUtilizado: MaterialUtilizado[];
  statusServicos: StatusServico[];
  assinaturaResponsavel: string;
  assinaturaGerente: string;
  observacaoAssinatura: string;
  observacoesSeguranca: string;
  atrasos: string;
  inspecoesQualidade: string;
  subcontratos: Subcontrato[];
  consideracoesAmbientais: string;
  aprovacoesPermissoes: AprovacaoPermissao[];
  custoOrcamento: CustoOrcamento[];
  resumoDiario: string;
  problemasEncontrados: string;
  acoesRequeridas: string;
  comunicacoes: string;
  observacoesGerente: string;
}

// Definindo ArrayKeys
type ArrayKeys = {
  [K in keyof FormData]: FormData[K] extends Array<infer U>
    ? U extends object
      ? K
      : never
    : never;
}[keyof FormData];

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
  observacaoAssinatura: "",
  observacoesSeguranca: "",
  atrasos: "",
  inspecoesQualidade: "",
  subcontratos: [
    {
      nome: "",
      servico: "",
      horasTrabalhadas: "",
      observacoes: "",
    },
  ],
  consideracoesAmbientais: "",
  aprovacoesPermissoes: [
    {
      tipo: "",
      status: "",
      dataObtencao: "",
      observacoes: "",
    },
  ],
  custoOrcamento: [
    {
      item: "",
      custoPlanejado: "",
      custoReal: "",
      variacao: "",
      observacoes: "",
    },
  ],
  resumoDiario: "",
  problemasEncontrados: "",
  acoesRequeridas: "",
  comunicacoes: "",
  observacoesGerente: "",
};

const RelatorioDiarioObras: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (
    index: number,
    arrayName: "checklistSeguranca"
  ) => {
    setFormData((prevState) => {
      const updatedArray = [...prevState[arrayName]];
      updatedArray[index] = {
        ...updatedArray[index],
        status: !updatedArray[index].status,
      };
      return {
        ...prevState,
        [arrayName]: updatedArray,
      };
    });
  };

  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index: number,
    fieldName: string,
    arrayName: ArrayKeys
  ) => {
    const { value } = e.target;
    setFormData((prevState) => {
      const updatedArray = [...(prevState[arrayName] as any[])];
      updatedArray[index] = {
        ...updatedArray[index],
        [fieldName]: value,
      };
      return {
        ...prevState,
        [arrayName]: updatedArray,
      };
    });
  };

  const addArrayItem = (
    arrayName: ArrayKeys,
    newItem: FormData[typeof arrayName][number]
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [arrayName]: [...(prevState[arrayName] as any[]), newItem],
    }));
  };

  const removeArrayItem = (arrayName: ArrayKeys, index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      [arrayName]: (prevState[arrayName] as any[]).filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const filePromises = files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result) {
              resolve(reader.result as string);
            } else {
              reject("Erro ao ler o arquivo");
            }
          };
          reader.readAsDataURL(file);
        });
      });

      const base64Files = await Promise.all(filePromises);
      setFormData((prevState) => ({
        ...prevState,
        fotos: [...prevState.fotos, ...base64Files],
      }));
    }
  };

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

          <!-- Observações de Segurança -->
          <h2>Observações de Segurança</h2>
          <p>${formData.observacoesSeguranca}</p>

          <!-- Atrasos e Interrupções -->
          <h2>Atrasos e Interrupções</h2>
          <p>${formData.atrasos}</p>

          <!-- Inspeções de Qualidade -->
          <h2>Inspeções de Qualidade</h2>
          <p>${formData.inspecoesQualidade}</p>

          <!-- Subcontratos -->
          <h2>Subcontratos</h2>
          <table>
            <tr>
              <th>Nome</th>
              <th>Serviço</th>
              <th>Horas Trabalhadas</th>
              <th>Observações</th>
            </tr>
            ${formData.subcontratos
              .map(
                (sub) => `
                  <tr>
                    <td>${sub.nome}</td>
                    <td>${sub.servico}</td>
                    <td>${sub.horasTrabalhadas}</td>
                    <td>${sub.observacoes}</td>
                  </tr>
                `
              )
              .join("")}
          </table>

          <!-- Considerações Ambientais -->
          <h2>Considerações Ambientais</h2>
          <p>${formData.consideracoesAmbientais}</p>

          <!-- Aprovações e Permissões -->
          <h2>Aprovações e Permissões</h2>
          <table>
            <tr>
              <th>Tipo</th>
              <th>Status</th>
              <th>Data de Obtenção</th>
              <th>Observações</th>
            </tr>
            ${formData.aprovacoesPermissoes
              .map(
                (ap) => `
                  <tr>
                    <td>${ap.tipo}</td>
                    <td>${ap.status}</td>
                    <td>${ap.dataObtencao}</td>
                    <td>${ap.observacoes}</td>
                  </tr>
                `
              )
              .join("")}
          </table>

          <!-- Custo e Orçamento -->
          <h2>Custo e Orçamento</h2>
          <table>
            <tr>
              <th>Item</th>
              <th>Custo Planejado</th>
              <th>Custo Real</th>
              <th>Variação</th>
              <th>Observações</th>
            </tr>
            ${formData.custoOrcamento
              .map(
                (custo) => `
                  <tr>
                    <td>${custo.item}</td>
                    <td>${custo.custoPlanejado}</td>
                    <td>${custo.custoReal}</td>
                    <td>${custo.variacao}</td>
                    <td>${custo.observacoes}</td>
                  </tr>
                `
              )
              .join("")}
          </table>

          <!-- Resumo Diário -->
          <h2>Resumo Diário</h2>
          <p>${formData.resumoDiario}</p>

          <!-- Problemas Encontrados -->
          <h2>Problemas Encontrados</h2>
          <p>${formData.problemasEncontrados}</p>

          <!-- Ações Requeridas -->
          <h2>Ações Requeridas</h2>
          <p>${formData.acoesRequeridas}</p>

          <!-- Comunicações -->
          <h2>Comunicações</h2>
          <p>${formData.comunicacoes}</p>

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
            <div class="signature">
              Assinatura do Gerente: ${formData.assinaturaGerente}
              <p>Observação: ${formData.observacoesGerente}</p>
            </div>
          </div>

          <!-- Campos Editáveis -->
          <h2>Observações Adicionais</h2>
          <p><input type="text" placeholder="Digite aqui..."></p>
        </body>
      </html>
    `;

    try {
      const response = await axios.post(
        "http://localhost:3001/pdf/generate",
        { htmlContent },
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `relatorio.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsSuccess(true);
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.message || "Erro ao gerar PDF");
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
        style={{ maxHeight: "80vh" }}
      >
        <h2 className="text-xl font-bold">Informações Gerais</h2>
        <Label htmlFor="rdoNumber">Nº RDO</Label>
        <Input
          id="rdoNumber"
          name="rdoNumber"
          value={formData.rdoNumber}
          onChange={handleChange}
          required
        />

        <Label htmlFor="empresa">Empresa</Label>
        <Input
          id="empresa"
          name="empresa"
          value={formData.empresa}
          onChange={handleChange}
          required
        />

        <Label htmlFor="cliente">Cliente</Label>
        <Input
          id="cliente"
          name="cliente"
          value={formData.cliente}
          onChange={handleChange}
          required
        />

        <Label htmlFor="usuarioPreencheu">Usuário</Label>
        <Input
          id="usuarioPreencheu"
          name="usuarioPreencheu"
          value={formData.usuarioPreencheu}
          onChange={handleChange}
          required
        />

        <Label htmlFor="dataRelatorio">Data</Label>
        <Input
          id="dataRelatorio"
          name="dataRelatorio"
          type="date"
          value={formData.dataRelatorio}
          onChange={handleChange}
          required
        />

        <Label htmlFor="localObra">Local da Obra</Label>
        <Input
          id="localObra"
          name="localObra"
          value={formData.localObra}
          onChange={handleChange}
          required
        />

        <Label htmlFor="gerenteResponsavel">Gerente Responsável</Label>
        <Input
          id="gerenteResponsavel"
          name="gerenteResponsavel"
          value={formData.gerenteResponsavel}
          onChange={handleChange}
          required
        />

        <Label htmlFor="tipoObra">Tipo de Obra</Label>
        <Input
          id="tipoObra"
          name="tipoObra"
          value={formData.tipoObra}
          onChange={handleChange}
          required
        />

        <Label htmlFor="etapaAtual">Etapa Atual</Label>
        <Input
          id="etapaAtual"
          name="etapaAtual"
          value={formData.etapaAtual}
          onChange={handleChange}
          required
        />

        <Label htmlFor="localizacaoObra">Localização da Obra</Label>
        <Input
          id="localizacaoObra"
          name="localizacaoObra"
          value={formData.localizacaoObra}
          onChange={handleChange}
          required
        />

        <h2 className="text-xl font-bold">Descrição da Atividade</h2>
        <Textarea
          id="descricaoAtividade"
          name="descricaoAtividade"
          value={formData.descricaoAtividade}
          onChange={handleChange}
          required
        />

        <h2 className="text-xl font-bold">Efetivo</h2>
        {formData.efetivo.map((efetivo, index) => (
          <div key={index} className="border p-4 mb-4">
            <Label>Nome</Label>
            <Input
              value={efetivo.nome}
              onChange={(e) => handleArrayChange(e, index, "nome", "efetivo")}
              required
            />

            <Label>Função</Label>
            <Input
              value={efetivo.funcao}
              onChange={(e) => handleArrayChange(e, index, "funcao", "efetivo")}
              required
            />

            <Label>Quantidade</Label>
            <Input
              type="number"
              value={efetivo.quantidade}
              onChange={(e) =>
                handleArrayChange(e, index, "quantidade", "efetivo")
              }
              required
            />

            <Label>Horas Normais</Label>
            <Input
              type="number"
              value={efetivo.horasNormais}
              onChange={(e) =>
                handleArrayChange(e, index, "horasNormais", "efetivo")
              }
              required
            />

            <Label>Horas Extras</Label>
            <Input
              type="number"
              value={efetivo.horasExtras}
              onChange={(e) =>
                handleArrayChange(e, index, "horasExtras", "efetivo")
              }
            />

            <Label>Início da Jornada</Label>
            <Input
              type="time"
              value={efetivo.inicioJornada}
              onChange={(e) =>
                handleArrayChange(e, index, "inicioJornada", "efetivo")
              }
              required
            />

            <Label>Fim da Jornada</Label>
            <Input
              type="time"
              value={efetivo.fimJornada}
              onChange={(e) =>
                handleArrayChange(e, index, "fimJornada", "efetivo")
              }
              required
            />

            <Label>Atividades Realizadas</Label>
            <Textarea
              value={efetivo.atividadesRealizadas}
              onChange={(e) =>
                handleArrayChange(e, index, "atividadesRealizadas", "efetivo")
              }
              required
            />

            <Button
              type="button"
              onClick={() => removeArrayItem("efetivo", index)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Remover
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            addArrayItem("efetivo", {
              nome: "",
              funcao: "",
              quantidade: "",
              horasNormais: "",
              horasExtras: "",
              inicioJornada: "",
              fimJornada: "",
              atividadesRealizadas: "",
            })
          }
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Adicionar Efetivo
        </Button>

        {/* Equipamentos */}
        <h2 className="text-xl font-bold">Equipamentos</h2>
        {formData.equipamentos.map((eq, index) => (
          <div key={index} className="border p-4 mb-4">
            <Label>Nome</Label>
            <Input
              value={eq.nome}
              onChange={(e) =>
                handleArrayChange(e, index, "nome", "equipamentos")
              }
            />
            <Label>Quantidade</Label>
            <Input
              value={eq.quantidade}
              onChange={(e) =>
                handleArrayChange(e, index, "quantidade", "equipamentos")
              }
            />
            <Label>Condição</Label>
            <Input
              value={eq.condicao}
              onChange={(e) =>
                handleArrayChange(e, index, "condicao", "equipamentos")
              }
            />
            <Label>Data de Inspeção</Label>
            <Input
              value={eq.dataInspecao}
              onChange={(e) =>
                handleArrayChange(e, index, "dataInspecao", "equipamentos")
              }
            />
            <Label>Observações</Label>
            <Textarea
              value={eq.observacoes}
              onChange={(e) =>
                handleArrayChange(e, index, "observacoes", "equipamentos")
              }
            />
            <Button
              type="button"
              onClick={() => removeArrayItem("equipamentos", index)}
              className="mt-2 bg-red-500 text-white"
            >
              Remover
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            addArrayItem("equipamentos", {
              nome: "",
              quantidade: "",
              condicao: "",
              dataInspecao: "",
              observacoes: "",
            })
          }
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Adicionar Equipamento
        </Button>

        {/* Ferramentas */}
        <h2 className="text-xl font-bold">Ferramentas</h2>
        {formData.ferramentas.map((tool, index) => (
          <div key={index} className="border p-4 mb-4">
            <Label>Nome</Label>
            <Input
              value={tool.nome}
              onChange={(e) =>
                handleArrayChange(e, index, "nome", "ferramentas")
              }
            />
            <Label>Quantidade</Label>
            <Input
              value={tool.quantidade}
              onChange={(e) =>
                handleArrayChange(e, index, "quantidade", "ferramentas")
              }
            />
            <Label>Condição</Label>
            <Input
              value={tool.condicao}
              onChange={(e) =>
                handleArrayChange(e, index, "condicao", "ferramentas")
              }
            />
            <Label>Data de Inspeção</Label>
            <Input
              value={tool.dataInspecao}
              onChange={(e) =>
                handleArrayChange(e, index, "dataInspecao", "ferramentas")
              }
            />
            <Label>Observações</Label>
            <Textarea
              value={tool.observacoes}
              onChange={(e) =>
                handleArrayChange(e, index, "observacoes", "ferramentas")
              }
            />
            <Button
              type="button"
              onClick={() => removeArrayItem("ferramentas", index)}
              className="mt-2 bg-red-500 text-white"
            >
              Remover
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            addArrayItem("ferramentas", {
              nome: "",
              quantidade: "",
              condicao: "",
              dataInspecao: "",
              observacoes: "",
            })
          }
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Adicionar Ferramenta
        </Button>

        {/* Clima */}
        <h2 className="text-xl font-bold">Clima</h2>
        <Label>Tempo</Label>
        <Input
          name="tempo"
          value={formData.clima.tempo}
          onChange={(e) =>
            setFormData({
              ...formData,
              clima: { ...formData.clima, tempo: e.target.value },
            })
          }
        />
        <Label>Temperatura Manhã</Label>
        <Input
          name="temperaturaManha"
          value={formData.clima.temperaturaManha}
          onChange={(e) =>
            setFormData({
              ...formData,
              clima: { ...formData.clima, temperaturaManha: e.target.value },
            })
          }
        />
        <Label>Temperatura Tarde</Label>
        <Input
          name="temperaturaTarde"
          value={formData.clima.temperaturaTarde}
          onChange={(e) =>
            setFormData({
              ...formData,
              clima: { ...formData.clima, temperaturaTarde: e.target.value },
            })
          }
        />
        <Label>Umidade Manhã</Label>
        <Input
          name="umidadeManha"
          value={formData.clima.umidadeManha}
          onChange={(e) =>
            setFormData({
              ...formData,
              clima: { ...formData.clima, umidadeManha: e.target.value },
            })
          }
        />
        <Label>Umidade Tarde</Label>
        <Input
          name="umidadeTarde"
          value={formData.clima.umidadeTarde}
          onChange={(e) =>
            setFormData({
              ...formData,
              clima: { ...formData.clima, umidadeTarde: e.target.value },
            })
          }
        />
        <Label>Vento</Label>
        <Input
          name="vento"
          value={formData.clima.vento}
          onChange={(e) =>
            setFormData({
              ...formData,
              clima: { ...formData.clima, vento: e.target.value },
            })
          }
        />
        <Label>Índice UV</Label>
        <Input
          name="uv"
          value={formData.clima.uv}
          onChange={(e) =>
            setFormData({
              ...formData,
              clima: { ...formData.clima, uv: e.target.value },
            })
          }
        />
        <Label>Observações (Clima)</Label>
        <Textarea
          name="observacoes"
          value={formData.clima.observacoes}
          onChange={(e) =>
            setFormData({
              ...formData,
              clima: { ...formData.clima, observacoes: e.target.value },
            })
          }
        />

        {/* Checklist de Segurança */}
        <h2 className="text-xl font-bold">Checklist de Segurança</h2>
        {formData.checklistSeguranca.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={item.status}
              onChange={() => handleCheckboxChange(index, "checklistSeguranca")}
            />
            <span>{item.item}</span>
          </div>
        ))}

        {/* Observações de Segurança */}
        <h2 className="text-xl font-bold">Observações de Segurança</h2>
        <Textarea
          name="observacoesSeguranca"
          value={formData.observacoesSeguranca}
          onChange={handleChange}
        />

        {/* Atrasos e Interrupções */}
        <h2 className="text-xl font-bold">Atrasos e Interrupções</h2>
        <Textarea
          name="atrasos"
          value={formData.atrasos}
          onChange={handleChange}
        />

        {/* Inspeções de Qualidade */}
        <h2 className="text-xl font-bold">Inspeções de Qualidade</h2>
        <Textarea
          name="inspecoesQualidade"
          value={formData.inspecoesQualidade}
          onChange={handleChange}
        />

        {/* Subcontratos */}
        <h2 className="text-xl font-bold">Subcontratos</h2>
        {formData.subcontratos.map((sub, index) => (
          <div key={index} className="border p-4 mb-4">
            <Label>Nome</Label>
            <Input
              value={sub.nome}
              onChange={(e) =>
                handleArrayChange(e, index, "nome", "subcontratos")
              }
            />
            <Label>Serviço</Label>
            <Input
              value={sub.servico}
              onChange={(e) =>
                handleArrayChange(e, index, "servico", "subcontratos")
              }
            />
            <Label>Horas Trabalhadas</Label>
            <Input
              value={sub.horasTrabalhadas}
              onChange={(e) =>
                handleArrayChange(e, index, "horasTrabalhadas", "subcontratos")
              }
            />
            <Label>Observações</Label>
            <Textarea
              value={sub.observacoes}
              onChange={(e) =>
                handleArrayChange(e, index, "observacoes", "subcontratos")
              }
            />
            <Button
              type="button"
              onClick={() => removeArrayItem("subcontratos", index)}
            >
              Remover
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            addArrayItem("subcontratos", {
              nome: "",
              servico: "",
              horasTrabalhadas: "",
              observacoes: "",
            })
          }
          className="bg-green-500 text-white"
        >
          Adicionar Subcontrato
        </Button>

        {/* Considerações Ambientais */}
        <h2 className="text-xl font-bold">Considerações Ambientais</h2>
        <Textarea
          name="consideracoesAmbientais"
          value={formData.consideracoesAmbientais}
          onChange={handleChange}
        />

        {/* Aprovações e Permissões */}
        <h2 className="text-xl font-bold">Aprovações e Permissões</h2>
        {formData.aprovacoesPermissoes.map((ap, index) => (
          <div key={index} className="border p-4 mb-4">
            <Label>Tipo</Label>
            <Input
              value={ap.tipo}
              onChange={(e) =>
                handleArrayChange(e, index, "tipo", "aprovacoesPermissoes")
              }
            />
            <Label>Status</Label>
            <Input
              value={ap.status}
              onChange={(e) =>
                handleArrayChange(e, index, "status", "aprovacoesPermissoes")
              }
            />
            <Label>Data de Obtenção</Label>
            <Input
              value={ap.dataObtencao}
              onChange={(e) =>
                handleArrayChange(
                  e,
                  index,
                  "dataObtencao",
                  "aprovacoesPermissoes"
                )
              }
            />
            <Label>Observações</Label>
            <Textarea
              value={ap.observacoes}
              onChange={(e) =>
                handleArrayChange(
                  e,
                  index,
                  "observacoes",
                  "aprovacoesPermissoes"
                )
              }
            />
            <Button
              type="button"
              onClick={() => removeArrayItem("aprovacoesPermissoes", index)}
            >
              Remover
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            addArrayItem("aprovacoesPermissoes", {
              tipo: "",
              status: "",
              dataObtencao: "",
              observacoes: "",
            })
          }
          className="bg-green-500 text-white"
        >
          Adicionar Aprovação/Permissão
        </Button>

        {/* Custo e Orçamento */}
        <h2 className="text-xl font-bold">Custo e Orçamento</h2>
        {formData.custoOrcamento.map((custo, index) => (
          <div key={index} className="border p-4 mb-4">
            <Label>Item</Label>
            <Input
              value={custo.item}
              onChange={(e) =>
                handleArrayChange(e, index, "item", "custoOrcamento")
              }
            />
            <Label>Custo Planejado</Label>
            <Input
              value={custo.custoPlanejado}
              onChange={(e) =>
                handleArrayChange(e, index, "custoPlanejado", "custoOrcamento")
              }
            />
            <Label>Custo Real</Label>
            <Input
              value={custo.custoReal}
              onChange={(e) =>
                handleArrayChange(e, index, "custoReal", "custoOrcamento")
              }
            />
            <Label>Variação</Label>
            <Input
              value={custo.variacao}
              onChange={(e) =>
                handleArrayChange(e, index, "variacao", "custoOrcamento")
              }
            />
            <Label>Observações</Label>
            <Textarea
              value={custo.observacoes}
              onChange={(e) =>
                handleArrayChange(e, index, "observacoes", "custoOrcamento")
              }
            />
            <Button
              type="button"
              onClick={() => removeArrayItem("custoOrcamento", index)}
            >
              Remover
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            addArrayItem("custoOrcamento", {
              item: "",
              custoPlanejado: "",
              custoReal: "",
              variacao: "",
              observacoes: "",
            })
          }
          className="bg-green-500 text-white"
        >
          Adicionar Custo/Orçamento
        </Button>

        {/* Resumo Diário */}
        <h2 className="text-xl font-bold">Resumo Diário</h2>
        <Textarea
          name="resumoDiario"
          value={formData.resumoDiario}
          onChange={handleChange}
        />

        {/* Problemas Encontrados */}
        <h2 className="text-xl font-bold">Problemas Encontrados</h2>
        <Textarea
          name="problemasEncontrados"
          value={formData.problemasEncontrados}
          onChange={handleChange}
        />

        {/* Ações Requeridas */}
        <h2 className="text-xl font-bold">Ações Requeridas</h2>
        <Textarea
          name="acoesRequeridas"
          value={formData.acoesRequeridas}
          onChange={handleChange}
        />

        {/* Comunicações */}
        <h2 className="text-xl font-bold">Comunicações</h2>
        <Textarea
          name="comunicacoes"
          value={formData.comunicacoes}
          onChange={handleChange}
        />

        {/* Incidentes */}
        <h2 className="text-xl font-bold">Incidentes</h2>
        <Textarea
          name="incidentes"
          value={formData.incidentes}
          onChange={handleChange}
        />

        {/* Observações da Fiscalização */}
        <h2 className="text-xl font-bold">Observações da Fiscalização</h2>
        <Textarea
          name="observacoesFiscalizacao"
          value={formData.observacoesFiscalizacao}
          onChange={handleChange}
        />

        {/* Observações da Contratada */}
        <h2 className="text-xl font-bold">Observações da Contratada</h2>
        <Textarea
          name="observacoesContratada"
          value={formData.observacoesContratada}
          onChange={handleChange}
        />

        {/* Material Utilizado */}
        <h2 className="text-xl font-bold">Material Utilizado</h2>
        {formData.materialUtilizado.map((mat, index) => (
          <div key={index} className="border p-4 mb-4">
            <Label>Nome</Label>
            <Input
              value={mat.nome}
              onChange={(e) =>
                handleArrayChange(e, index, "nome", "materialUtilizado")
              }
            />
            <Label>Quantidade</Label>
            <Input
              value={mat.quantidade}
              onChange={(e) =>
                handleArrayChange(e, index, "quantidade", "materialUtilizado")
              }
            />
            <Label>Unidade</Label>
            <Input
              value={mat.unidade}
              onChange={(e) =>
                handleArrayChange(e, index, "unidade", "materialUtilizado")
              }
            />
            <Label>Observações</Label>
            <Textarea
              value={mat.observacoes}
              onChange={(e) =>
                handleArrayChange(e, index, "observacoes", "materialUtilizado")
              }
            />
            <Button
              type="button"
              onClick={() => removeArrayItem("materialUtilizado", index)}
            >
              Remover
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            addArrayItem("materialUtilizado", {
              nome: "",
              quantidade: "",
              unidade: "",
              observacoes: "",
            })
          }
          className="bg-green-500 text-white"
        >
          Adicionar Material
        </Button>

        {/* Status dos Serviços */}
        <h2 className="text-xl font-bold">Status dos Serviços</h2>
        {formData.statusServicos.map((serv, index) => (
          <div key={index} className="border p-4 mb-4">
            <Label>Serviço</Label>
            <Input
              value={serv.nome}
              onChange={(e) =>
                handleArrayChange(e, index, "nome", "statusServicos")
              }
            />
            <Label>Percentual Concluído</Label>
            <Input
              value={serv.percentualConcluido}
              onChange={(e) =>
                handleArrayChange(
                  e,
                  index,
                  "percentualConcluido",
                  "statusServicos"
                )
              }
            />
            <Label>Motivo de Atraso</Label>
            <Input
              value={serv.motivoAtraso}
              onChange={(e) =>
                handleArrayChange(e, index, "motivoAtraso", "statusServicos")
              }
            />
            <Label>Observações</Label>
            <Textarea
              value={serv.observacoes}
              onChange={(e) =>
                handleArrayChange(e, index, "observacoes", "statusServicos")
              }
            />
            <Button
              type="button"
              onClick={() => removeArrayItem("statusServicos", index)}
            >
              Remover
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            addArrayItem("statusServicos", {
              nome: "",
              percentualConcluido: "",
              motivoAtraso: "",
              observacoes: "",
            })
          }
          className="bg-green-500 text-white"
        >
          Adicionar Status de Serviço
        </Button>

        {/* Fotos */}
        <h2 className="text-xl font-bold">Fotos</h2>
        <Input type="file" multiple onChange={handleFileChange} />
        {formData.fotos.length > 0 && (
          <p>{formData.fotos.length} foto(s) selecionada(s).</p>
        )}

        {/* Assinaturas */}
        <h2 className="text-xl font-bold">Assinaturas</h2>
        <Label>Assinatura do Responsável</Label>
        <Input
          name="assinaturaResponsavel"
          value={formData.assinaturaResponsavel}
          onChange={handleChange}
        />
        <Label>Observação da Assinatura</Label>
        <Textarea
          name="observacaoAssinatura"
          value={formData.observacaoAssinatura}
          onChange={handleChange}
        />

        <Label>Assinatura do Gerente</Label>
        <Input
          name="assinaturaGerente"
          value={formData.assinaturaGerente}
          onChange={handleChange}
        />
        <Label>Observações do Gerente</Label>
        <Textarea
          name="observacoesGerente"
          value={formData.observacoesGerente}
          onChange={handleChange}
        />

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
            PDF gerado e download iniciado com sucesso!
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
