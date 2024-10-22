"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

// Definindo o tipo do objeto RDO
interface Rdo {
  id: number; // ou string, dependendo da sua API
  username: string;
  date: string;
}

const UsersRdos = () => {
  const [rdos, setRdos] = useState<Rdo[]>([]); // Tipando o estado

  useEffect(() => {
    // Faz uma requisição para buscar os RDOS preenchidos
    const fetchRdos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/rdos"); // Rota que retorna os RDOS preenchidos
        setRdos(response.data);
      } catch (error) {
        console.error("Erro ao buscar RDOS", error);
      }
    };

    fetchRdos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f9f9f9] p-6">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-[#af1b1b]">
          RDOS Preenchidos
        </h1>
      </header>

      {/* Lista de RDOS */}
      <main className="w-full max-w-5xl bg-white p-6 shadow-lg rounded-lg">
        {rdos.length === 0 ? (
          <p>Nenhum RDO preenchido até o momento.</p>
        ) : (
          <ul>
            {rdos.map((rdo) => (
              <li key={rdo.id} className="p-4 border-b border-gray-200">
                <p>
                  <strong>RDO ID:</strong> {rdo.id}
                </p>
                <p>
                  <strong>Preenchido por:</strong> {rdo.username}
                </p>
                <p>
                  <strong>Data:</strong> {rdo.date}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default UsersRdos;
