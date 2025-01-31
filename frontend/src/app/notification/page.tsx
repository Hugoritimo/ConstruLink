"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash, Check } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]); // Estado para armazenar as notificações.

  // Função para carregar as notificações do backend.
  const loadNotifications = async () => {
    try {
      const response = await axios.get("/api/notifications"); // Solicita notificações ao backend.
      setNotifications(response.data); // Armazena as notificações recebidas no estado.
    } catch (error) {
      console.error("Erro ao carregar notificações", error); // Exibe erro se a requisição falhar.
    }
  };

  // Carrega as notificações ao montar o componente.
  useEffect(() => {
    loadNotifications(); // Chama a função para carregar notificações.
  }, []); // Dependência vazia indica que a função será chamada apenas uma vez.

  // Função para marcar uma notificação como lida.
  const markAsRead = async (id: string) => {
    try {
      await axios.patch(`/api/notifications/${id}/read`); // Atualiza o status de leitura no backend.
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, read: true } : n)) // Atualiza o estado localmente.
      );
    } catch (error) {
      console.error("Erro ao marcar como lida", error); // Exibe erro se a requisição falhar.
    }
  };

  // Função para excluir uma notificação.
  const deleteNotification = async (id: string) => {
    try {
      await axios.delete(`/api/notifications/${id}`); // Exclui a notificação no backend.
      setNotifications(notifications.filter((n) => n.id !== id)); // Remove a notificação do estado local.
    } catch (error) {
      console.error("Erro ao excluir notificação", error); // Exibe erro se a requisição falhar.
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f9f9f9] p-6">
      {/* Cabeçalho da página com título e botão para limpar todas as notificações */}
      <header className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-[#af1b1b]">Notificações</h1>
        <Button
          variant="ghost"
          onClick={() => setNotifications([])} // Limpa todas as notificações localmente.
          className="text-[#af1b1b] hover:bg-[#fce4e4] p-2 rounded-md"
        >
          Limpar Todas
        </Button>
      </header>

      {/* Listagem de notificações ou mensagem quando não houver notificações */}
      <div className="w-full max-w-2xl space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card
              key={notification.id} // Chave única para cada notificação.
              className="flex justify-between items-center bg-white border border-[#af1b1b] rounded-lg p-4 shadow-sm"
            >
              {/* Exibição do título e descrição da notificação */}
              <div>
                <CardHeader>
                  <CardTitle className="flex items-center text-[#333333]">
                    {notification.title}
                    {/* Exibe badge de "Nova" se a notificação não foi lida */}
                    {!notification.read && (
                      <Badge className="ml-2 bg-[#af1b1b] text-white">
                        Nova
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-[#666666]">
                  <p>{notification.description}</p>
                </CardContent>
              </div>

              {/* Botões para marcar como lida ou excluir a notificação */}
              <div className="flex space-x-2">
                {/* Botão para marcar como lida, aparece somente se a notificação ainda não foi lida */}
                {!notification.read && (
                  <Button
                    variant="ghost"
                    onClick={() => markAsRead(notification.id)} // Chama a função para marcar como lida.
                    className="text-[#af1b1b] hover:bg-[#fce4e4]"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Marcar como lida
                  </Button>
                )}
                {/* Botão para excluir a notificação */}
                <Button
                  variant="ghost"
                  onClick={() => deleteNotification(notification.id)} // Chama a função para excluir.
                  className="text-[#af1b1b] hover:bg-[#fce4e4]"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Excluir
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-[#666666]">
            Você não tem novas notificações.
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
