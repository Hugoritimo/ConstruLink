"use client";
import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button"; // Botão reutilizável

// Registro dos componentes do chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Graficos = () => {
  const router = useRouter();

  // Dados para o gráfico de linha
  const lineData = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    datasets: [
      {
        label: "Produção",
        data: [150, 200, 170, 220, 250, 300],
        borderColor: "#af1b1b",
        backgroundColor: "rgba(175, 27, 27, 0.5)",
        fill: true,
      },
    ],
  };

  // Dados para o gráfico de barras
  const barData = {
    labels: ["Equipe A", "Equipe B", "Equipe C", "Equipe D"],
    datasets: [
      {
        label: "Horas Trabalhadas",
        data: [100, 120, 150, 180],
        backgroundColor: ["#af1b1b", "#f56c6c", "#f8b195", "#f67280"],
      },
    ],
  };

  // Dados para o gráfico de pizza
  const pieData = {
    labels: ["Concluído", "Em Progresso", "Pendente"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ["#27ae60", "#f39c12", "#e74c3c"],
      },
    ],
  };

  // Opções comuns dos gráficos
  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Opções específicas para o gráfico de pizza
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false, // Para ajustar a altura e largura do gráfico de pizza
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f9f9f9] p-4 md:p-6">
      {/* Cabeçalho da página */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#af1b1b]">
          Dashboard de Produção
        </h1>
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="text-[#af1b1b] hover:bg-[#fce4e4] p-2 rounded-md"
        >
          Voltar
        </Button>
      </header>

      {/* Gráfico de Linha */}
      <section className="w-full max-w-full mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
          Produção Mensal
        </h2>
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
          <Line data={lineData} options={commonOptions} />
        </div>
      </section>

      {/* Gráfico de Barras */}
      <section className="w-full max-w-full mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
          Horas Trabalhadas por Equipe
        </h2>
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
          <Bar data={barData} options={commonOptions} />
        </div>
      </section>

      {/* Gráfico de Pizza */}
      <section className="w-full max-w-md mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
          Status dos Projetos
        </h2>
        <div
          className="bg-white p-4 md:p-8 rounded-lg shadow-lg"
          style={{ height: "350px" }}
        >
          {" "}
          {/* Altura ajustada para o gráfico */}
          <Pie data={pieData} options={pieOptions} />
        </div>
      </section>
    </div>
  );
};

export default Graficos;
